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
(hugsql/def-sqlvec-fns "sql/matches.sql")

(def start-time-regex #"^(\d+h)?[0-5][0-9]m[0-5][0-9]s$")
(sp/def :match/start-time-type #(re-matches start-time-regex %))
(sp/def :match/player1 string?)
(sp/def :match/character1 string?)
(sp/def :match/player2 string?)
(sp/def :match/character2 string?)
(sp/def :match/did_p1_win boolean?)
(sp/def :match/start_time :match/start-time-type)
(sp/def :match/tournament_id number?)
(sp/def :match/match (sp/keys :req-un [:match/player1
                                       :match/character1
                                       :match/player2
                                       :match/character2
                                       :match/did_p1_win
                                       :match/start_time
                                       :match/tournament_id]))

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
    (jdbc/execute! conn (db-insert-matches!-sqlvec matches))))

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
    (db-select-all-matches conn)))

(defn test-endpoint []
  (let [single-match {:player1  "Vixy"
                      :character1 "Velvet"
                      :player2    "Oscar"
                      :character2 "Pom"
                      :did_p1_win false
                      :start_time "00h45m32s"
                      :tournament_id 1}]
    (content-type (ok single-match) "application/json")))

(defn select-all-matches-by-tournament [] (test-endpoint))
  ;(let [conn (jdbc/get-datasource db/db-spec)]
  ;  (db-select-all-matches-by-tournament conn)))

(defn get-all-matches []
  (content-type (ok (select-all-matches)) "application/json"))

(defn- transform-to-2d-vector [matches-by-tournament]
  "groups a 1D vector of matches sorted by tournament id into a 2D vector
   where each internal vector contains all matches with the same tournament id"
  (let [tournament-ids (distinct (map #(:tournament_id %) matches-by-tournament))]
    (letfn [(get-matches-for-id [id]
              (filter #(= (:tournament_id %) id) matches-by-tournament))]
      (map get-matches-for-id tournament-ids))))

(defn get-all-matches-by-tournament []
  (let [matches-by-tournament (select-all-matches-by-tournament)
        grouped-matches (transform-to-2d-vector matches-by-tournament)]
    (log/info grouped-matches)
    (content-type (ok grouped-matches) "application/json")))

(defn post-match [request]
  (try
    (-> (:body request)
        (validate-insert-matches-body)
        (labelled-vector-transform)
        (insert-matches!)
        (handle-insert-matches))
    (catch IllegalArgumentException ex
      (content-type (bad-request (.getMessage ex)) "application/json"))
    (catch Exception ex
      (content-type (internal-server-error (.getMessage ex)) "application/json"))))

(defn route-get-api-matches [params]
  (log/info "in matches endpoint")
  (cond
    (= params {})
      (get-all-matches)
    (= params {"sort" "tournament"})
      (get-all-matches-by-tournament)))

