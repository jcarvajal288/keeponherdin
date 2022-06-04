(ns resources.data.matches-data)

(def single-match {:player1  "Vixy"
                   :character1 "Velvet"
                   :player2    "Oscar"
                   :character2 "Pom"
                   :did_p1_win false
                   :start_time "00:45:32"})

(def two-matches [single-match
                  {:player1  "Grunkle"
                   :character1 "Tianhuo"
                   :player2    "Javamorris"
                   :character2 "Arizona"
                   :did_p1_win true
                   :start_time "01:23:35"}])

(def malformed-match-list (conj two-matches (dissoc single-match :player1)))
