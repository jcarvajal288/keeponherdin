(ns backend.handler
  (:require [backend.matches :as ma]
            [backend.tournaments :as tn]
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
    (content-type (ok (ma/select-all-matches)) "application/json"))

  (GET "/api/matches/:id" []
    (content-type (ok (ma/select-matches-by-tournament)) "application/json"))

  (POST "/api/matches" request
    (try
      (-> (:body request)
          (ma/validate-insert-matches-body)
          (ma/labelled-vector-transform)
          (ma/insert-matches!)
          (ma/handle-insert-matches))
    (catch IllegalArgumentException ex
      (content-type (bad-request (.getMessage ex)) "application/json"))
    (catch Exception ex
      (content-type (internal-server-error (.getMessage ex)) "application/json"))))

  (PUT "/api/matches/:id" [] "TODO: update a match")

  (DELETE "/api/matches/:id" [] "TODO: delete a match")

;;; Tournament routes ;;;
  (GET "/api/tournaments" []
    (let [result-set (tn/select-all-tournaments)]
      (as-> result-set rs
            (content-type (ok rs) "application/json"))))

  (POST "/api/tournaments" request
    (let [body (:body request)]
      (try
         (-> body
             (tn/validate-body)
             (tn/insert-tournament!)
             (tn/handle-insert-result))
         (catch IllegalArgumentException ex
           (content-type (bad-request (.getMessage ex)) "application/json"))
         (catch Exception ex
           (log/info (.getMessage ex))))))

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
