(ns backend.util
  (:require [clojure.string :as str]))

(defn in? [item coll]
  (some #(= item %) coll))

(defn strip-date [date]
  "Removes the time segment from an ISO date string"
  (let [t-index (str/index-of date "T")]
    (if (= t-index nil)
      date
      (subs date 0 t-index))))

