(ns backend.matches
  (:require [backend.database :as db]
            [hugsql.core :as hugsql]
            [next.jdbc :as jdbc]
            ))

(hugsql/def-sqlvec-fns "sql/matches.sql")

(defn create-match [match]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (jdbc/execute! conn (db-create-match!-sqlvec match))))