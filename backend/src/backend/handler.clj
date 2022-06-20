(ns backend.handler
  (:require [backend.matches :refer :all]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [cheshire.core :as ch]
            [environ.core :refer [env]]
            [ring.adapter.jetty :refer :all]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :as json]
            [ring.util.http-response :refer :all]
            [taoensso.timbre :as log]
            [cheshire.core :as ch]))

(defroutes app-routes

;;; Match routes ;;;
  (GET "/api/matches" []
    (content-type (ok (select-all-matches)) "application/json"))

  (GET "/api/matches/:id" [] "TODO: return single match")

  (POST "/api/matches" request
    (try
      (-> (:body request)
          (validate-insert-matches-body)
          (labelled-vector-transform)
          (insert-matches!)
          (handle-insert-matches))
    (catch IllegalArgumentException ex
      (content-type (bad-request (.getMessage ex)) "application/json"))
    (catch Exception ex
      (content-type (internal-server-error (.getMessage ex)) "application/json"))))

  (PUT "/api/matches/:id" [] "TODO: update a match")

  (DELETE "/api/matches/:id" [] "TODO: delete a match")

;;; Tournament routes ;;;
  (GET "/api/tournaments/:id" []
    {:status 200
     :body (ch/generate-string {:title "Rodeo Regional #40"
                                :date "2022-05-23"
                                :gameVersion "3.0"
                                :tournamentOrganizer "Javamorris"})
     :headers {"Content-Type" "application/json"}})

  (POST "/api/tournaments" request
    (if (backend.tournaments/tournament-valid? (:body request))
        ({:status 201
          :body   (ch/generate-string {:id 1})
          :headers {"Content-Type" "application/json"
                    "Location" "http://localhost/api/tournaments/1"}})
        (content-type (bad-request "Tournament body is empty or malformed.") "application/json")))

  (route/not-found "Not Found"))

(def app
  (-> app-routes
  (wrap-defaults api-defaults)
  (json/wrap-json-body {:keywords? true})
  (json/wrap-json-response)
  (wrap-cors :access-control-allow-origin [#".*"]
             :access-control-allow-methods [:get :put :post :delete])))

(defn -main []
  (run-jetty app {:port (or (env :ring-port) 8000)}))
