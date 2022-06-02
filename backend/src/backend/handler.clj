(ns backend.handler
  (:require [backend.matches :refer :all]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults secure-api-defaults]]
            [ring.middleware.json :as json]
            [ring.util.http-response :refer :all]))

(defroutes app-routes
  (GET "/api/matches" [] "TODO: return all matches")
  (GET "/api/matches/:id" [] "TODO: return single match")
  (POST "/api/matches" [match]
    (ok (create-match match)))
  (PUT "/api/matches/:id" [] "TODO: update a match")
  (DELETE "/api/matches/:id" [] "TODO: delete a match")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
  (wrap-defaults api-defaults)
  (json/wrap-json-params)
  (json/wrap-json-response)))
