(ns backend.database
  (:require [korma.db :as korma]))

(def user "keeponherdin_dev")
(def password "keeponherdin_dev")
(def subprotocol "jdbc:postgresql")
(def subname "//localhost:5432/keeponherdin_dev")

(def db-connection-info
  {:classname "org.postgresql.Driver"
   :subprotocol subprotocol
   :user user
   :password password
   :subname subname})

(korma/defdb db db-connection-info)
