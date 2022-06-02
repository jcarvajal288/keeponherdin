-- :name create-match! :! :<!
-- :doc creates a new match record
INSERT INTO matches
(player1, character1, player2, character2, did_p1_win, start_time)
VALUES (:player1, :character1, :player2, :character2, :did_p1_win, :start_time)
RETURNING id;

-- :name get-match :? :1
-- :doc retrieves a match record given the id
SELECT * FROM matches
WHERE id = :id;

-- :name delete-match! :! :n
-- :doc deletes a user record given the id
DELETE FROM matches
WHERE id = :id