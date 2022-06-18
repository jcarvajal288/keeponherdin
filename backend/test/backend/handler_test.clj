(ns backend.handler_test
  (:require [clojure.test :refer :all]
            [backend.handler :refer :all]
            [resources.data.matches-data :as data]
            [ring.mock.request :as mock]
            [cheshire.core :as ch]
            [taoensso.timbre :as log]))

(defn in? [item coll]
  (some #(= item %) coll))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; DATABASE TESTS
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(deftest insert-and-retrieve-one
  (testing "insert and retrieve a single match"
    (let [expected-match (data/random-match)
          response (app (-> (mock/request :post "/api/matches")
                            (mock/json-body expected-match)))
          post-result-ids (-> response (:body) (ch/parse-string true) (:ids))
          get-response (app (-> (mock/request :get "/api/matches")))
          all-matches (-> get-response (:body) (ch/parse-string true))
          result-match (first (filter #(= (first post-result-ids) (:id %)) all-matches))
          ]
      (is (= (:status response) 201))
      (is (= (count post-result-ids) 1))
      (is (number? (first post-result-ids)))
      (is (= (dissoc result-match :id) expected-match)))))

(deftest insert-and-retrieve-few
  (testing "insert and retrieve a few matches"
    (let [expected-matches (data/random-matches 3)
          response (app (-> (mock/request :post "/api/matches")
                            (mock/json-body expected-matches)))
          post-result-ids (-> response (:body) (ch/parse-string true) (:ids))
          get-response (app (-> (mock/request :get "/api/matches")))
          all-matches (-> get-response (:body) (ch/parse-string true))
          result-matches (filter #(in? (:id %) post-result-ids) all-matches)
          ]
      (is (= (:status response) 201))
      (is (= (count post-result-ids) 3))
      (is (number? (first post-result-ids)))
      (is (= (map #(dissoc % :id) result-matches) expected-matches)))))
