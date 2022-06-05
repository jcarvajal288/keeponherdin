-- :name db-insert-match! :! :<!
-- :doc inserts a new match record
INSERT INTO matches
(player1, character1, player2, character2, did_p1_win, start_time)
VALUES (:player1, :character1, :player2, :character2, :did_p1_win, :start_time)
RETURNING id;

-- :name db-insert-matches! :! :n
-- :doc inserts a tuple of new matches
INSERT INTO matches
(player1, character1, player2, character2, did_p1_win, start_time)
VALUES :tuple*:matches
RETURNING id;

-- :name db-select-all-matches :? :*
-- :doc Get all matches
SELECT * FROM matches;

-- :name db-get-match :? :1
-- :doc retrieves a match record given the id
SELECT * FROM matches
WHERE id = :id;

-- :name db-delete-match! :! :n
-- :doc deletes a user record given the id
DELETE FROM matches
WHERE id = :id