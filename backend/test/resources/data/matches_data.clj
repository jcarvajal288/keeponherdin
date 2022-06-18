(ns resources.data.matches-data)

(def single-match {:player1  "Vixy"
                   :character1 "Velvet"
                   :player2    "Oscar"
                   :character2 "Pom"
                   :did_p1_win false
                   :start_time "00h45m32s"})

(def two-matches [single-match
                  {:player1  "Grunkle"
                   :character1 "Tianhuo"
                   :player2    "Javamorris"
                   :character2 "Arizona"
                   :did_p1_win true
                   :start_time "01h23m35s"}])

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

(defn random-match []
  {:player1 (rand-nth player-names)
   :character1 (rand-nth characters)
   :player2 (rand-nth player-names)
   :character2 (rand-nth characters)
   :did_p1_win (even? (rand-int 2))
   :start_time (random-start-time)})

(defn random-matches [num-matches]
  (for [_ (range num-matches)] (random-match)))
