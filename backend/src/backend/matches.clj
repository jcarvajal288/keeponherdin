(ns backend.matches
  (:require [backend.database :as db]
            [clojure.spec.alpha :as sp]
            [cheshire.core :as ch]
            [hugsql.core :as hugsql]
            [hugsql.adapter.next-jdbc :as next-adapter]
            [next.jdbc :as jdbc]
            [ring.util.http-response :refer :all]
            [taoensso.timbre :as log]))

(hugsql/def-db-fns "sql/matches.sql"
                       {:adapter (next-adapter/hugsql-adapter-next-jdbc
                                   {:builder-fn next.jdbc.result-set/as-unqualified-maps})})

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

(defn match-valid? [match]
  (sp/valid? :match/match match))

(defn matches-valid? [matches]
  (every? match-valid? matches))

(defn labelled-vector-transform
  "Turns a vector of match maps into the form
  {:matches[(player1_value character1_value...) (player1_value character2_value...)]}
  in order to pass into db-insert-matches! which requires that form."
  [matches]
  {:matches (vec (map #(map val %) matches))})

(defn validate-insert-matches-body [body]
  (let [matches (if (sequential? body) body [body])]
    (if (matches-valid? matches)
      matches
      (throw (IllegalArgumentException. "Empty match body or malformed matches received.")))))

(defn insert-matches! [matches]
  (let [conn (jdbc/get-datasource db/db-spec)]
    ;(jdbc/execute! conn (db-insert-matches! matches))))
    (db-insert-matches! conn matches)))

(defn handle-insert-matches [result]
  (let [ids (map :matches/id result)]
    (if (every? number? ids)
      (content-type
        (created
          (str "matches/" (first ids))
          (ch/generate-string {:ids ids}))
        "application/json")
      (content-type
        (internal-server-error result)
        "application/json"))))

(defn select-all-matches []
  (let [conn (jdbc/get-datasource db/db-spec)]
    (log/debug (str "conn: " conn))
    (db-select-all-matches conn)))

