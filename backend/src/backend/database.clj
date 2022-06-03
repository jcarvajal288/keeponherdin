(ns backend.database)

(def user "keeponherdin_dev")
(def password "keeponherdin_dev")
(def subprotocol "jdbc:postgresql")
(def subname "//localhost:5432/keeponherdin_dev")

(def db-spec
  {:dbtype "postgresql"
   :classname "org.postgresql.Driver"
   :subprotocol "postgresql"
   :dbname "keeponherdin_dev"
   :user user
   :password password
   :port 5432
   :subname subname
   :hostname "localhost"})
