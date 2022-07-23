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
  ([tournament]
    {:player1 (rand-nth player-names)
     :character1 (rand-nth characters)
     :player2 (rand-nth player-names)
     :character2 (rand-nth characters)
     :did_p1_win (even? (rand-int 2))
     :start_time (random-start-time)
     :tournament_id tournament}))


(defn random-matches
  ([num-matches] (random-matches num-matches 1))
  ([num-matches num_tournaments]
    (for [_ (range num-matches)] (random-match num_tournaments))))

(def tournament-names ["Mad Cow Melee"
                       "The Fauna"
                       "Glue Cup"
                       "Hoof to Floof"
                       "Rodeo Regional"
                       "Mexican Mash Series"
                       "Iron Cattle Tournament"
                       "Grand Stampede"
                       "Crayon Cup"])

(def single-tournament {:title "Rodeo Regional #40"
                        :date "2022-05-23"
                        :game_version "3.0"
                        :tournament_organizer "Javamorris"
                        :vod_link "https://www.twitch.tv/videos/1134464994"
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
     :tournament_organizer (rand-nth player-names)
     :vod_link "https://www.twitch.tv/videos/1134464994"
     }))

(def matches-by-tournament
  [{:player1 "Sven"
    :character1 "Pom"
    :player2 "Sven"
    :character2 "Paprika"
    :did_p1_win true
    :start_time "0h42m32s"
    :tournament_id 1}
   {:player1 "FiveByFive"
    :character1 "Tianhuo"
    :player2 "Sven"
    :character2 "Arizona"
    :did_p1_win false
    :start_time "1h08m05s"
    :tournament_id 1}
   {:player1 "Icebound"
    :character1 "Velvet"
    :player2 "MrAsiago"
    :character2 "Pom"
    :did_p1_win true
    :start_time "2h14m31s"
    :tournament_id 1}
   {:player1 "Sven"
    :character1 "Paprika"
    :player2 "Vixy"
    :character2 "Tianhuo"
    :did_p1_win false
    :start_time "2h31m18s"
    :tournament_id 1}
   {:player1 "Zale"
    :character1 "Shanty"
    :player2 "Uri"
    :character2 "Paprika"
    :did_p1_win true
    :start_time "4h30m43s"
    :tournament_id 2}
   {:player1 "Poco"
    :character1 "Arizona"
    :player2 "Dem"
    :character2 "Pom"
    :did_p1_win true
    :start_time "0h26m20s"
    :tournament_id 3}
   {:player1 "Solarnia"
    :character1 "Pom"
    :player2 "MrAsiago"
    :character2 "Shanty"
    :did_p1_win false
    :start_time "1h20m44s"
    :tournament_id 3}
   {:player1 "Bubbleboots"
    :character1 "Pom"
    :player2 "Digital_Dog"
    :character2 "Oleander"
    :did_p1_win true
    :start_time "1h36m40s"
    :tournament_id 3}
   {:player1 "Digital_Dog"
    :character1 "Shanty"
    :player2 "FiveByFive"
    :character2 "Pom"
    :did_p1_win false
    :start_time "0h47m01s"
    :tournament_id 4}
   {:player1 "Vixy"
    :character1 "Tianhuo"
    :player2 "Arcanel"
    :character2 "Shanty"
    :did_p1_win false
    :start_time "0h51m28s"
    :tournament_id 4}
   ])

(defn rand-str [len]
  (apply str (take len (repeatedly #(char (+ (rand 26) 65))))))