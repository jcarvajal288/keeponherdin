(ns backend.matches
  (:require [backend.database :as db]
            [cheshire.core :as ch]
            [hugsql.core :as hugsql]
            [next.jdbc :as jdbc]
            [ring.util.http-response :refer :all]))

(hugsql/def-sqlvec-fns "sql/matches.sql")

(defn create-match [match]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (jdbc/execute! conn (db-create-match!-sqlvec match))))

(defn handle-create-match [result]
  (let [id (:matches/id (first result))]
    (if (number? id)
      (content-type (created (str "matches/" id) (ch/generate-string {:id id})) "application/json")
      (content-type (internal-server-error result) "application/json"))))

