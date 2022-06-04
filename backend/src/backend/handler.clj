(ns backend.handler
  (:require [backend.matches :refer :all]
            [cheshire.core :refer :all]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :as json]
            [ring.util.http-response :refer :all]))

(defn handle-create-match [result]
  (let [id (:matches/id (first result))]
    (if (number? id)
      (content-type
        (created (str "matches/" id) (generate-string {:id id}))
                 "application/json")
      (content-type (internal-server-error result) "application/json"))))

(defroutes app-routes

  (GET "/api/matches" [] "TODO: return all matches")

  (GET "/api/matches/:id" [] "TODO: return single match")

  (POST "/api/matches" request
    (handle-create-match (create-match (:body request))))

  (PUT "/api/matches/:id" [] "TODO: update a match")

  (DELETE "/api/matches/:id" [] "TODO: delete a match")

  (route/not-found "Not Found"))

(def app
  (-> app-routes
  (wrap-defaults api-defaults)
  (json/wrap-json-body {:keywords? true})
  (json/wrap-json-response)))
