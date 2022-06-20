(ns backend.util)

(defn in? [item coll]
  (some #(= item %) coll))

