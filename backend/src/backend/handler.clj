(ns backend.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults secure-api-defaults]]
            [ring.middleware.json :as json]))

(defroutes app-routes
  (GET "/api/matches" [] "TODO: return all matches")
  (GET "/api/matches/:id" [] "TODO: return single match")
  (POST "/api/matches" [] "TODO: create a match")
  (PUT "/api/matches/:id" [] "TODO: update a match")
  (DELETE "/api/matches/:id" [] "TODO: delete a match")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
  (wrap-defaults api-defaults)
  (json/wrap-json-params)
  (json/wrap-json-response)))
