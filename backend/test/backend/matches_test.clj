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
    (is (false? (matches-valid? data/malformed-match-list)))))

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

(deftest test-validate-insert-matches-body
  (testing " test validating the request before passing it to the rest of the request handler"
    (is (thrown? IllegalArgumentException (validate-insert-matches-body {})))
    (is (thrown? IllegalArgumentException (validate-insert-matches-body data/malformed-match-list)))
    (is (= (validate-insert-matches-body data/single-match) [data/single-match]))
    (is (= (validate-insert-matches-body data/two-matches) data/two-matches))))

(deftest handle-insert-matches-success
  (testing "201 - returns integer ids"
    (is (= (handle-insert-matches [#:matches{:id 26} #:matches{:id 48}])
           {:status 201
            :body (ch/generate-string {:ids [26 48]})
            :headers {"Content-Type" "application/json"
                      "Location" "matches/26"}}))))

(deftest handle-insert-matches-failure
  (testing "500 - returns an error message"
    (is (= (handle-insert-matches "error")
           {:status 500
            :body "error"
            :headers {"Content-Type" "application/json"}}))))

;;;;;;;;;;;;;;;;;;;;;;;
; CONTRACT TESTS
;;;;;;;;;;;;;;;;;;;;;;;

(deftest accept-single-match
  (testing "201 - POST /api/matches single match"
    (with-redefs [insert-matches! (fn [_] [#:matches{:id 26}])]
      (let [response (app (-> (mock/request :post "/api/matches")
                              (mock/json-body data/single-match)))]
        (is (= response {:status 201
                         :body (ch/generate-string {:ids [26]})
                         :headers {"Content-Type" "application/json"
                                   "Location" "http://localhost/api/matches/26"}}))))))

(deftest accept-multiple-matches
  (testing "201 - POST /api/matches single match"
    (with-redefs [insert-matches! (fn [_] [#:matches{:id 36} #:matches{:id 48}])]
      (let [response (app (-> (mock/request :post "/api/matches")
                              (mock/json-body data/two-matches)))]
        (is (= response {:status 201
                         :body (ch/generate-string {:ids [36 48]})
                         :headers {"Content-Type" "application/json"
                                   "Location" "http://localhost/api/matches/36"}}))))))

(deftest reject-malformed-match-body
  (testing "400 - POST /api/matches empty body"
    (with-redefs [insert-matches! (fn [_] [#:matches{:id "Test shouldn't have gotten this far"}])]
      (let [blank-response (app (-> (mock/request :post "/api/matches")
                              (mock/json-body {})))
            malformed-response (app (-> (mock/request :post "/api/matches")
                                        (mock/json-body data/malformed-match-list)))]
        (is (= blank-response {:status 400
                               :body "Empty match body or malformed matches received."
                               :headers {"Content-Type" "application/json"}}))
        (is (= malformed-response {:status 400
                                   :body "Empty match body or malformed matches received."
                                   :headers {"Content-Type" "application/json"}}))))))

(deftest select-zero-matches
  (testing "200 - GET /api/matches no matches"
    (with-redefs [select-all-matches (fn [] [])]
      (let [response (app (-> (mock/request :get "/api/matches")))]
        (is (= response {:status 200
                         :body (ch/generate-string [])
                         :headers {"Content-Type" "application/json"}}))))))

(deftest select-one-matches
  (testing "200 - GET /api/matches one matches"
    (with-redefs [select-all-matches (fn [] data/single-match)]
      (let [response (app (-> (mock/request :get "/api/matches")))]
        (is (= response {:status 200
                         :body (ch/generate-string data/single-match)
                         :headers {"Content-Type" "application/json"}}))))))

(deftest select-two-matches
  (testing "200 - GET /api/matches one matches"
    (with-redefs [select-all-matches (fn [] data/two-matches)]
      (let [response (app (-> (mock/request :get "/api/matches")))]
        (is (= response {:status 200
                         :body (ch/generate-string data/two-matches)
                         :headers {"Content-Type" "application/json"}}))))))
