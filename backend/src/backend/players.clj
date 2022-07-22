(ns backend.players
  (:require [hugsql.core :as hugsql]
            [hugsql.adapter.next-jdbc :as next-adapter]
            [ring.util.http-response :refer :all]
            ))

(hugsql/def-db-fns "sql/matches.sql"
                   {:adapter (next-adapter/hugsql-adapter-next-jdbc
                               {:builder-fn next.jdbc.result-set/as-unqualified-maps})})
(hugsql/def-sqlvec-fns "sql/matches.sql")

(defn select-all-players []
  [])

(defn get-all-players []
  (content-type (ok (select-all-players)) "application/json"))
