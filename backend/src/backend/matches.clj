(ns backend.matches
  (:require [backend.database :as db]
            [clojure.spec.alpha :as sp]
            [cheshire.core :as ch]
            [hugsql.core :as hugsql]
            [next.jdbc :as jdbc]
            [ring.util.http-response :refer :all]))

(hugsql/def-sqlvec-fns "sql/matches.sql")

(def start-time-regex #"^(\d+:)?[0-5][0-9]:[0-5][0-9]$")
(sp/def :match/start-time-type #(re-matches start-time-regex %))
(sp/def :match/player1 string?)
(sp/def :match/character1 string?)
(sp/def :match/player2 string?)
(sp/def :match/character2 string?)
(sp/def :match/did_p1_win boolean?)
(sp/def :match/start_time :match/start-time-type)
(sp/def :match/match (sp/keys :req-un [:match/player1
                                       :match/character1
                                       :match/player2
                                       :match/character2
                                       :match/did_p1_win
                                       :match/start_time]))

(defn match-body-valid? [body]
  (sp/valid? :match/match body))

(defn create-match! [match]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (jdbc/execute! conn (db-create-match!-sqlvec match))))

(defn handle-create-match [result]
  (let [id (:matches/id (first result))]
    (if (number? id)
      (content-type (created (str "matches/" id) (ch/generate-string {:id id})) "application/json")
      (content-type (internal-server-error result) "application/json"))))

