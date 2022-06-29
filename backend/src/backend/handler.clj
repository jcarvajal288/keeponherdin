(ns backend.handler
  (:require [backend.matches :as ma]
            [backend.tournaments :as tn]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [environ.core :refer [env]]
            [ring.adapter.jetty :refer :all]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :as json]
            [ring.util.http-response :refer :all]
            [taoensso.timbre :as log]))

(defroutes app-routes

  (GET "/api/matches" {params :query-params} (ma/route-get-api-matches params))
  (POST "/api/matches" request (ma/post-match request))

  (GET "/api/tournaments" [] (tn/get-all-tournaments))
  (GET "/api/tournaments/:id" request (tn/get-tournament-by-id request))
  (POST "/api/tournaments" request (tn/post-tournament request))

  (route/not-found "Not Found"))

(def app
  (-> app-routes
  (wrap-defaults api-defaults)
  (json/wrap-json-body {:keywords? true})
  (json/wrap-json-response)
  (wrap-cors :access-control-allow-origin [#".*"]
             :access-control-allow-headers [#".*"]
             :access-control-allow-methods [:get :put :post :delete])))

(defn -main []
  (run-jetty app {:port (or (env :ring-port) 8000)}))
