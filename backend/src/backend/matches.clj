(ns backend.matches
  (:require [backend.database :as db]
            [hugsql.core :as hugsql]
            [jdbc.core :as jdbc]
            [hugsql.adapter.clojure-jdbc :as cj-adapter]
            ))

(hugsql/def-db-fns "backend/matches.sql"
                   {:adapter (cj-adapter/hugsql-adapter-clojure-jdbc)})

(defn create-match [match]
  (let [conn (jdbc/connection db/db-spec)]
    (jdbc/atomic conn db-create-match! conn match)))
