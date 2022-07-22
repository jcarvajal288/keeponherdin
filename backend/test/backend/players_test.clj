(ns backend.players-test
  (:require [backend.handler :refer :all]
            [backend.players :refer :all]
            [cheshire.core :as ch]
            [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [resources.data.matches-data :as data]))

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

