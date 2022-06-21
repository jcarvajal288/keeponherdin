-- :name db-insert-tournament! :! :<
-- :doc inserts a new tournament
INSERT INTO tournaments
(title, date, game_version, tournament_organizer)
VALUES (:title, to_timestamp(:date, 'YYYY-MM-DD'), :game_version, :tournament_organizer)
RETURNING id;

--VALUES (:title, to_timestamp(:date, 'YYYY-MM-DD'), :game_version, :tournament_organizer)
