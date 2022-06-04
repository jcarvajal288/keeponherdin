(ns backend.matches-test
  (:require [clojure.test :refer :all]
            [backend.handler :refer :all]
            [backend.matches :refer :all]
            [cheshire.core :as ch]
            [ring.mock.request :as mock]
            [clojure.spec.alpha :as sp]))

(def mock-match {:player1 "Vixy"
                 :character1 "Velvet"
                 :player2 "Oscar"
                 :character2 "Pom"
                 :did_p1_win false
                 :start_time "00:45:32"})

(deftest test-match-body-valid?
  (testing "match body validations"
    (is (false? (match-body-valid? {})))
    (is (false? (match-body-valid? (dissoc mock-match :player1))))
    (is (false? (match-body-valid? (assoc mock-match :start_time "badtimestamp"))))
    (is (true? (match-body-valid? mock-match))
        (sp/explain-str :match/match mock-match))))

(deftest handle-insert-match-success
  (testing "201 - returns an integer id"
    (is (= (handle-insert-match
             [#:matches{:id 26}]) {:status 201
                                   :body (ch/generate-string {:id 26})
                                   :headers {"Content-Type" "application/json"
                                             "Location" "matches/26"}}))))

(deftest handle-insert-match-failure
  (testing "500 - returns an error message"
    (is (= (handle-insert-match "error") {:status 500
                                          :body "error"
                                          :headers {"Content-Type" "application/json"}}))))

(deftest reject-empty-match-body
  (testing "200 - POST /api/matches success"
    (with-redefs [insert-match! (fn [#_x] [#:matches{:id "Test shouldn't have gotten this far"}])]
      (let [response (app (-> (mock/request :post "/api/matches")
                              (mock/json-body {})))]
        (is (= response {:status 400
                         :body "Malformed match received."
                         :headers {"Content-Type" "application/json"}}))))))
