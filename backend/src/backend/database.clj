(ns backend.database
  (:require [environ.core :refer [env]]
            [taoensso.timbre :as log]))

(def dbtype (env :database-type))
(def classname (env :database-classname))
(def subprotocol (env :database-subprotocol))
(def dbname (env :database-name))
(def user (env :database-user))
(def password (env :database-password))
(def port (env :database-port))
(def hostname (env :database-hostname))
(def subname (format "//%s:%s/%s" hostname port dbname))

(def db-spec
  {:dbtype dbtype
   :classname classname
   :subprotocol subprotocol
   :dbname dbname
   :user user
   :password password
   :port port
   :subname subname
   :host hostname})

(defn log-sqlvec [sqlvec]
  (log/info (->> sqlvec
                 (map #(clojure.string/replace (or % "") #"\n" ""))
                 (clojure.string/join " ; "))))

(defn log-command-fn [this db sqlvec options]
  (log-sqlvec sqlvec)
  (condp contains? (:command options)
    #{:!} (hugsql.adapter/execute this db sqlvec options)
    #{:? :<!} (hugsql.adapter/query this db sqlvec options)))

(defmethod hugsql.core/hugsql-command-fn :! [sym] `log-command-fn)
(defmethod hugsql.core/hugsql-command-fn :<! [sym] `log-command-fn)
(defmethod hugsql.core/hugsql-command-fn :? [sym] `log-command-fn)
