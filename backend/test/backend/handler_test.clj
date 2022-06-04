(ns backend.handler-test
  (:require [clojure.test :refer :all]
            [cheshire.core :refer [generate-string]]
            [backend.handler :refer :all]))

(deftest handle-create-match-success
  (testing "201 - returns an integer id"
    (is (= (handle-create-match
             [#:matches{:id 26}]) {:status 201
                                   :body (generate-string {:id 26})
                                   :headers {"Content-Type" "application/json"
                                             "Location" "matches/26"}}))))
;(deftest handle-create-match-failure
;  (testing "500 - returns an error message"
;    (is (= (handle-create-match "error") {:status 500
;                                    :body nil
;                                    :status 201}))))
