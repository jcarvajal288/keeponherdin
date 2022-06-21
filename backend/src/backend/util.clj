(ns backend.util
  (:require [clojure.string :as str]))

(defn in? [item coll]
  (some #(= item %) coll))

(defn strip-date [date]
  "Removes the time segment from an ISO date string"
  (subs date 0 (str/index-of date "T")))

