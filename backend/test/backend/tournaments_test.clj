(ns backend.tournaments-test
  (:require [backend.tournaments :refer :all]
            [backend.handler :refer :all]
            [backend.util :as util]
            [cheshire.core :as ch]
            [clojure.spec.alpha :as sp]
            [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [resources.data.matches-data :as data]
            [taoensso.timbre :as log]))

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

(defn get-tournaments []
  (app (-> (mock/request :get "/api/tournaments"))))

(defn post-tournament [tournament]
  (app (-> (mock/request :post "/api/tournaments")
           (mock/json-body tournament))))

(deftest reject-malformed-tournaments
  (testing "reject tournaments that don't fit the spec"
    (let [response (post-tournament data/malformed-tournament)
          response-empty (post-tournament {})]
      (is (= response {:status 400
                       :body "Tournament body is empty or malformed."
                       :headers {"Content-Type" "application/json"}}))
      (is (= response-empty {:status 400
                             :body "Tournament body is empty or malformed."
                             :headers {"Content-Type" "application/json"}})))))

(deftest get-tournament
  (testing "getting a tournament by id"
    (with-redefs [select-tournament-by-id (fn [_] data/single-tournament)]
      (let [response (app (-> (mock/request :get "/api/tournaments/1")))]
        (is (= response {:status 200
                         :body (ch/generate-string data/single-tournament)
                         :headers {"Content-Type" "application/json"}}))))))



;;;;;;;;;;;;;;;;;;;;;;;;;;;
; INTEGRATION TESTS
;;;;;;;;;;;;;;;;;;;;;;;;;;;

(deftest insert-and-retrieve-one-tournament
  (testing "insert and fetch a random tournament"
    (let [expected-tournament (data/random-tournament)
          post-response (post-tournament expected-tournament)
          post-result-id (-> post-response (:body) (ch/parse-string true) (:id))
          returned-response (app (-> (mock/request :get (format "/api/tournaments/%d" post-result-id))))
          returned-tournament (-> returned-response (:body) (ch/parse-string true))]
          (log/info returned-tournament)
      (is (number? post-result-id))
      (is (= (:headers post-response) {"Content-Type" "application/json"
                                       "Location" (format "http://localhost/api/tournaments/%d" post-result-id)}))
      (is (= (:status returned-response) 200))
      (is (= (:title returned-tournament) (:title expected-tournament)))
      (is (= (util/strip-date (:date returned-tournament)) (:date expected-tournament)))
      (is (= (:game_version returned-tournament) (:game_version expected-tournament)))
      (is (= (:tournament_organizer returned-tournament) (:tournament_organizer expected-tournament))))))


