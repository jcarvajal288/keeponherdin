(ns resources.data.matches-data
  (:require [backend.util :refer :all]))

(def single-match {:player1  "Vixy"
                   :character1 "Velvet"
                   :player2    "Oscar"
                   :character2 "Pom"
                   :did_p1_win false
                   :start_time "00h45m32s"
                   :tournament_id 1})

(def two-matches [single-match
                  {:player1  "Grunkle"
                   :character1 "Tianhuo"
                   :player2    "Javamorris"
                   :character2 "Arizona"
                   :did_p1_win true
                   :start_time "01h23m35s"
                   :tournament_id 1}])

(def malformed-match-list (conj two-matches (dissoc single-match :player1)))

(def player-names ["Zale"
                   "Bubbleboots"
                   "Uri"
                   "Digital_Dog"
                   "BLACKATLAS"
                   "Icebound"
                   "Derpinator"
                   "FiveByFive"
                   "MPK"
                   "Javamorris"
                   "Arcanel"
                   "MrAsiago"
                   "Rotorix"
                   "Solarnia"
                   "Dem"
                   "Poco"
                   "Sven"
                   "Vixy"
                   "Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
                   ])

(def characters ["Velvet"
                 "Oleander"
                 "Tianhuo"
                 "Arizona"
                 "Pom"
                 "Paprika"
                 "Shanty"])

(defn random-start-time []
  (str (rand-int 5) "h" (rand-int 5) (rand-int 9) "m" (rand-int 5) (rand-int 9) "s"))

(defn random-match
  ([] (random-match 1))
  ([num_tournaments]
    {:player1 (rand-nth player-names)
     :character1 (rand-nth characters)
     :player2 (rand-nth player-names)
     :character2 (rand-nth characters)
     :did_p1_win (even? (rand-int 2))
     :start_time (random-start-time)
     :tournament_id (+ 1 (rand-int (- num_tournaments 1)))}))


(defn random-matches
  ([num-matches] (random-matches num-matches 1))
  ([num-matches num_tournaments]
    (for [_ (range num-matches)] (random-match num_tournaments))))

(def tournament-names ["Mad Cow Melee"
                       "The Fauna"
                       "Glue Cup"
                       "Rodeo Regional"
                       "Mexican Mash Series"
                       "Iron Cattle Tournament"
                       "Grand Stampede"
                       "Crayon Cup"])

(def single-tournament {:title "Rodeo Regional #40"
                        :date "2022-05-23"
                        :game_version "3.0"
                        :tournament_organizer "Javamorris"
                        })

(def malformed-tournament (dissoc single-tournament :game_version))

(defn random-tournament []
  (let [year (+ 2017 (rand-int 6))
        month (+ 1 (rand-int 12))
        day (cond
              (= month 2) (+ 1 (rand-int 28))
              (in? month [1 3 5 7 8 10 12]) (+ 1 (rand-int 31))
              :else (+ 1 (rand-int 30)))]
    {:title (rand-nth tournament-names)
     :date (format "%d-%02d-%02d", year, month, day)
     :game_version (rand-nth ["2.11" "2.14" "3.0"])
     :tournament_organizer (rand-nth player-names)}))
