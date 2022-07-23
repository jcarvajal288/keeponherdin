(ns backend.players
  (:require [hugsql.core :as hugsql]
            [hugsql.adapter.next-jdbc :as next-adapter]
            [ring.util.http-response :refer :all]
            [next.jdbc :as jdbc]
            [backend.database :as db]
            [taoensso.timbre :as log]))

(hugsql/def-db-fns "sql/players.sql"
                   {:adapter (next-adapter/hugsql-adapter-next-jdbc
                               {:builder-fn next.jdbc.result-set/as-unqualified-maps})})
(hugsql/def-sqlvec-fns "sql/players.sql")

(defn- filter-column-name [player-list]
  (map #(:name %) player-list))

(defn select-all-players []
  (let [conn (jdbc/get-datasource db/db-spec)]
    (db-select-all-players conn)))

(defn get-all-players []
  (let [result (filter-column-name (select-all-players))]
  (content-type (ok result) "application/json")))
