(ns backend.database)

(def user "keeponherdin_dev")
(def password "keeponherdin_dev")
(def subprotocol "jdbc:postgresql")
(def subname "//localhost:5432/keeponherdin_dev")

(def db-spec
  {:classname "org.postgresql.Driver"
   :subprotocol subprotocol
   :user user
   :password password
   :subname subname})
