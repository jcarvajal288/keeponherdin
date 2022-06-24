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
  {:title "Rodeo Regional #40"
   :date "2022-05-23"
   :game_version "3.0"
   :tournament_organizer "Javamorris"
   :vod_link "https://www.twitch.tv/videos/1134464994"
   })
