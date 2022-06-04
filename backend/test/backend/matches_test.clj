(ns backend.matches-test
  (:require [clojure.test :refer :all]
            [backend.handler :refer :all]
            [backend.matches :refer :all]
            [cheshire.core :as ch]
            [resources.data.matches-data :as data]
            [ring.mock.request :as mock]
            [clojure.spec.alpha :as sp]))

(deftest test-match-valid?
  (testing "match body validations"
    (is (false? (match-valid? {})))
    (is (false? (match-valid? (dissoc data/single-match :player1))))
    (is (false? (match-valid? (assoc data/single-match :start_time "badtimestamp"))))
    (is (true? (match-valid? data/single-match))
        (sp/explain-str :match/match data/single-match))))

(deftest test-matches-valid?
  (testing "validations on match vectors"
    (is (false? (matches-valid? [{}])))
    (is (true? (matches-valid? [data/single-match])))
    (is (true? (matches-valid? data/two-matches)))
    (is (false? (matches-valid? (conj data/two-matches (dissoc data/single-match :player1)))))))

(deftest test-labelled-vector-transform
  (testing "test match map transform into a labelled vector"
    (is (= (labelled-vector-transform [{}])
           {:matches ['()]}))
    (is (= (labelled-vector-transform [data/single-match])
           {:matches
            ['("Vixy" "Velvet" "Oscar" "Pom" false "00:45:32")]}))
    (is (= (labelled-vector-transform data/two-matches)
           {:matches
            ['("Vixy" "Velvet" "Oscar" "Pom" false "00:45:32")
             '("Grunkle" "Tianhuo" "Javamorris" "Arizona" true "01:23:35")]}))))

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
                         :body "Malformed matches received."
                         :headers {"Content-Type" "application/json"}}))))))
