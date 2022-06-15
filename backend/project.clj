(defproject backend "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [cheshire "5.11.0"]
                 [compojure "1.6.3"]
                 [com.layerware/hugsql-core "0.5.3"]
                 [com.layerware/hugsql-adapter-next-jdbc "0.5.3"]
                 [com.taoensso/timbre "5.2.1"]
                 [environ "1.2.0"]
                 [metosin/ring-http-response "0.9.3"]
                 [migratus "1.3.6"]
                 [org.postgresql/postgresql "42.3.4"]
                 [org.slf4j/slf4j-log4j12 "2.0.0-alpha7"]
                 [ring/ring-core "1.9.5"]
                 [ring-cors "0.1.13"]
                 [ring/ring-defaults "0.3.3"]
                 [ring/ring-jetty-adapter "1.6.1"]
                 [ring/ring-json "0.5.1"]]
  :uberjar-name "backend-standalone.jar"
  :jvm-opts ["-Dclojure.tools.logging.factory=clojure.tools.logging.impl/log4j-factory"]
  :main backend.handler
  :plugins [[lein-ring "0.12.6"]
            [migratus-lein "0.7.3"]
            [lein-environ "1.2.0"]]
  :ring {:handler backend.handler/app}
  :profiles {:dev [:project/dev :profiles/dev]
             :test [:project/test :profiles/test]
             :profiles/dev {}
             :profiles/test {}
             :project/dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                           [ring/ring-mock "0.4.0"]]}
             :project/test {:dependencies [[javax.servlet/servlet-api "2.5"]
                                           [ring/ring-mock "0.4.0"]]}
             })
