(ns backend.tournaments
  (:require [clojure.spec.alpha :as sp]
            [clojure.string :as str]
            [hugsql.core :as hugsql]
            [hugsql.adapter.next-jdbc :as next-adapter]
            [next.jdbc :as jdbc]
            [backend.database :as db]
            [ring.util.http-response :refer :all]
            [taoensso.timbre :as log]
            [cheshire.core :as ch]))

(hugsql/def-db-fns "sql/tournaments.sql"
                   {:adapter (next-adapter/hugsql-adapter-next-jdbc
                               {:builder-fn next.jdbc.result-set/as-unqualified-maps})})
(hugsql/def-sqlvec-fns "sql/tournaments.sql")

(def date-regex #"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
(sp/def :tournament/date-type #(re-matches date-regex %))
(sp/def :tournament/title string?)
(sp/def :tournament/date :tournament/date-type)
(sp/def :tournament/game_version string?)
(sp/def :tournament/tournament_organizer string?)
(sp/def :tournament/vod_link string?)
(sp/def :tournament/tournament (sp/keys :req-un [:tournament/title
                                                 :tournament/date
                                                 :tournament/game_version
                                                 :tournament/tournament_organizer
                                                 :tournament/vod_link]))

(defn tournament-valid? [tournament]
  (sp/valid? :tournament/tournament tournament))

(defn insert-tournament! [tournament]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (jdbc/execute! conn (db-insert-tournament!-sqlvec tournament))))

(defn validate-body [body]
  (if (tournament-valid? body)
    body
    (throw (IllegalArgumentException. "Tournament body is empty or malformed."))))

(defn handle-insert-result [result]
  (let [id (:tournaments/id (first result))]
    (content-type
      (created
        (str "tournaments/" id)
        (ch/generate-string {:id id}))
      "application/json")))

(defn select-all-tournaments []
  (let [conn (jdbc/get-datasource db/db-spec)]
    (db-select-all-tournaments conn)))

(defn select-tournament-by-id [id]
  (let [conn (jdbc/get-datasource db/db-spec)]
    (db-select-tournament conn {:id (Integer/parseInt id)})))

(defn get-all-tournaments []
  (let [result-set (select-all-tournaments)]
    (as-> result-set rs
          (content-type (ok rs) "application/json"))))

(defn get-tournament-by-id [request]
  (let [result (select-tournament-by-id (:id (:params request)))]
    (content-type (ok result) "application/json")))

(defn post-tournament [request]
  (let [body (:body request)]
    (try
      (-> body
          (validate-body)
          (insert-tournament!)
          (handle-insert-result))
      (catch IllegalArgumentException ex
        (content-type (bad-request (.getMessage ex)) "application/json"))
      (catch Exception ex
        (log/info (.getMessage ex))))))
