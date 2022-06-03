(ns backend.matches
  (:require [backend.database :as db]
            [hugsql.core :as hugsql]
            [next.jdbc :as jdbc]
            [hugsql.adapter.next-jdbc :as cj-adapter]
            ))

(hugsql/def-db-fns "backend/matches.sql"
                   {:adapter (cj-adapter/hugsql-adapter-next-jdbc)})

(hugsql/def-sqlvec-fns "backend/matches.sql")

(defn create-match [match]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (jdbc/execute! conn (db-create-match!-sqlvec match))))