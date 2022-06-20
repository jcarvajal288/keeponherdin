(ns backend.tournaments-test
  (:require [backend.tournaments :refer :all]
            [backend.handler :refer :all]
            [cheshire.core :as ch]
            [clojure.spec.alpha :as sp]
            [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [resources.data.matches-data :as data]))

(deftest test-tournament-valid?
  (testing "tournament body validations"
    (is (false? (tournament-valid? {})))
    (is (false? (tournament-valid? (dissoc data/single-tournament :title))))
    (is (false? (tournament-valid? (assoc data/single-tournament :date "baddate"))))
    (is (true? (tournament-valid? data/single-tournament))
        (sp/explain-str :tournament/tournament data/single-tournament))))

;;;;;;;;;;;;;;;;;;;;;;;
; CONTRACT TESTS
;;;;;;;;;;;;;;;;;;;;;;;

(deftest create-single-tournament
  (testing "create a single tournament with no matches"
    (let [response (app (-> (mock/request :post "/api/tournaments")
                            (mock/json-body data/single-tournament)))]
      (is (= response {:status 201
                       :body (ch/generate-string {:id 1})
                       :headers {"Content-Type" "application/json"
                                 "Location" "http://localhost/api/tournaments/1"}})))))

(deftest reject-malformed-tournaments
  (testing "reject tournaments that don't fit the spec"
    (let [response (app (-> (mock/request :post "/api/tournaments")
                            (mock/json-body data/malformed-tournament)))
          response-empty (app (-> (mock/request :post "/api/tournaments")
                                  (mock/json-body {})))]
      (is (= response {:status 400
                       :body "Tournament body is empty or malformed."
                       :headers {"Content-Type" "application/json"}}))
      (is (= response-empty {:status 400
                             :body "Tournament body is empty or malformed."
                             :headers {"Content-Type" "application/json"}})))))

(deftest fetch-single-tournament
  (testing "fetch a single tournament"
    (let [response (app (-> (mock/request :get "/api/tournaments/1")))]
      (is (= response {:status 200
                       :body (ch/generate-string data/single-tournament)
                       :headers {"Content-Type" "application/json"}})))))
