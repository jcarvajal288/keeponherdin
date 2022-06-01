
(ns backend.migrations
  (:require [migratus.core :as migratus]))

(def config {:store :database
             :migration-dir "migrations"
             :db {:connection-uri "jdbc:postgresql://localhost:5432/keeponherdin_dev?user=keeponherdin_dev&password=keeponherdin_dev"}})

;initialize the database using the 'init.sql' script
(migratus/init config)

;apply pending migrations
(migratus/migrate config)

;rollback the migration with the latest timestamp
(migratus/rollback config)

;bring up migrations matching the ids
;(migratus/up config 20111206154000)

;bring down migrations matching the ids
;(migratus/down config 20111206154000)