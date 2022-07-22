(ns backend.players
  (:require [hugsql.core :as hugsql]
            [hugsql.adapter.next-jdbc :as next-adapter]))

(hugsql/def-db-fns "sql/matches.sql"
                   {:adapter (next-adapter/hugsql-adapter-next-jdbc
                               {:builder-fn next.jdbc.result-set/as-unqualified-maps})})
(hugsql/def-sqlvec-fns "sql/matches.sql")

(defn get-all-players [] [])
