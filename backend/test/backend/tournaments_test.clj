(ns backend.tournaments-test
  (:require [backend.tournaments :refer :all]
            [clojure.spec.alpha :as sp]
            [clojure.test :refer :all]
            [resources.data.matches-data :as data]))

(deftest test-tournament-valid?
  (testing "tournament body validations"
    (is (false? (tournament-valid? {})))
    (is (false? (tournament-valid? (dissoc data/single-tournament :title))))
    (is (false? (tournament-valid? (assoc data/single-tournament :date "baddate"))))
    (is (true? (tournament-valid? data/single-tournament))
        (sp/explain-str :tournament/tournament data/single-tournament))))

;(deftest create-single-tournament
;  (testing "create a single tournament with no matches"
;    ))