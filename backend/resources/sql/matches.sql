-- :name db-insert-match! :! :<!
-- :doc inserts a new match record
INSERT INTO matches
(player1, character1, player2, character2, did_p1_win, start_time, tournament_id)
VALUES (:player1, :character1, :player2, :character2, :did_p1_win, :start_time, :tournament_id)
RETURNING id;

-- :name db-insert-matches! :! :n
-- :doc inserts a tuple of new matches
INSERT INTO matches
(player1, character1, player2, character2, did_p1_win, start_time, tournament_id)
VALUES :tuple*:matches
RETURNING id;

-- :name db-select-all-matches :? :*
-- :doc Get all matches
SELECT * FROM matches;

-- :name db-delete-match! :! :n
-- :doc deletes a user record given the id
DELETE FROM matches
WHERE id = :id;

-- :name db-select-all-matches-by-tournament :? :*
-- :doc returns matches grouped by tournament id and sorted by tournament date and match start time
SELECT m.* FROM matches m
JOIN tournaments t ON m.tournament_id = t.id
ORDER BY t.date DESC, m.start_time LIMIT 50;
