(ns backend.tournaments
  (:require [clojure.spec.alpha :as sp]))

(def date-regex #"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
(sp/def :tournament/date-type #(re-matches date-regex %))
(sp/def :tournament/title string?)
(sp/def :tournament/date :tournament/date-type)
(sp/def :tournament/gameVersion string?)
(sp/def :tournament/tournamentOrganizer string?)
(sp/def :tournament/tournament (sp/keys :req-un [:tournament/title
                                                 :tournament/date
                                                 :tournament/gameVersion
                                                 :tournament/tournamentOrganizer]))

(defn tournament-valid? [tournament]
  (sp/valid? :tournament/tournament tournament))