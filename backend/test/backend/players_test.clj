(ns backend.players-test
  (:require [backend.handler :refer :all]
            [backend.players :refer :all]
            [backend.matches :refer :all]
            [backend.matches_test :refer [mock-post-matches]]
            [cheshire.core :as ch]
            [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [resources.data.matches-data :as data]
            [taoensso.timbre :as log]))

(deftest test-filter-column-name
  (testing "filter-column-name"
    (let [data [{:x "a"} {:x "b"}]
          fcn #'backend.players/filter-column-name
          result (fcn data)]
      (is (= result ["a" "b"])))))

;;;;;;;;;;;;;;;;;;;;;;;
; CONTRACT TESTS
;;;;;;;;;;;;;;;;;;;;;;;

(deftest return-all-players
  (testing "200 - GET /api/players"
    (with-redefs [select-all-players (fn [] data/player-names)]
      (let [response (app (-> (mock/request :get "/api/players")))]
        (is (= response {:status 200
                         :body (ch/generate-string data/player-names)
                         :headers {"Content-Type" "application/json"}}))))))

;;;;;;;;;;;;;;;;;;;;;;;
; INTEGRATION TESTS
;;;;;;;;;;;;;;;;;;;;;;;

(deftest insert-and-retrieve-players
  (testing "insert unique players into both slots and see them in the return list"
    (let [player1-name (data/rand-str 20)
          player2-name (data/rand-str 20)
          match (-> data/single-match (assoc :player1 player1-name)
                                      (assoc :player2 player2-name))
          _ (mock-post-matches [match match])
          get-response (app (-> (mock/request :get "/api/players")))
          player-list (-> get-response (:body) (ch/parse-string true))
          player-freqs (frequencies player-list)]
      (is (= (get player-freqs player1-name) 1))
      (is (= (get player-freqs player2-name) 1)))))