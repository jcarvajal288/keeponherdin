(ns backend.database
  (:require [environ.core :refer [env]]))

(def dbtype (env :database-type))
(def classname (env :database-classname))
(def subprotocol (env :database-subprotocol))
(def dbname (env :database-name))
(def user (env :database-user))
(def password (env :database-password))
(def port (env :database-port))
(def subname (env :database-subname))
(def hostname (env :database-hostname))

(def db-spec
  {:dbtype dbtype
   :classname classname
   :subprotocol subprotocol
   :dbname dbname
   :user user
   :password password
   :port port
   :subname subname
   :hostname hostname})

