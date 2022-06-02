(defproject backend "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [korma "0.5.0-RC1"]
                 [migratus "1.3.6"]
                 [org.clojure/java.jdbc "0.7.12"]
                 [org.postgresql/postgresql "42.3.4"]
                 [org.slf4j/slf4j-log4j12 "2.0.0-alpha7"]
                 [ring/ring-defaults "0.3.2"]
                 [ring/ring-json "0.5.1"]]
  :plugins [[lein-ring "0.12.5"]
            [migratus-lein "0.7.3"]]
  :ring {:handler backend.handler/app}
  :migratus {:store :database
             :migration-dir "migrations/"
             :db {:connection-uri "jdbc:postgresql://localhost:5432/keeponherdin_dev?user=keeponherdin_dev&password=keeponherdin_dev"}}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}})
