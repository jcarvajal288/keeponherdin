(ns backend.matches-test
  (:require [clojure.test :refer :all]
            [backend.matches :refer :all]
            [cheshire.core :as ch]
            [backend.handler :refer :all]))

(deftest handle-create-match-success
  (testing "201 - returns an integer id"
    (is (= (handle-create-match
             [#:matches{:id 26}]) {:status 201
                                   :body (ch/generate-string {:id 26})
                                   :headers {"Content-Type" "application/json"
                                             "Location" "matches/26"}}))))
(deftest handle-create-match-failure
  (testing "500 - returns an error message"
    (is (= (handle-create-match "error") {:status 500
                                          :body "error"
                                          :headers {"Content-Type" "application/json"}}))))

; Mock function example
; [ring.mock.request :as mock]
; =====================
;(def mock-match {:player1 "Vixy"
;                 :character1 "Velvet"
;                 :player2 "Oscar"
;                 :character2 "Pom"
;                 :did_p1_win true
;                 :start_time "00:45:32"})
;
;(deftest create-match-endpoint-response
;  (testing "200 - POST /api/matches success"
;    (with-redefs [create-match (fn [x] [#:matches{:id 33}])]
;      (let [response (app (-> (mock/request :post "/api/matches")
;                              (mock/json-body mock-match)))]
;        (is (= response "blah"))))))
