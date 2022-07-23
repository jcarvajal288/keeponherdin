-- :name db-select-all-players :? :*
-- :doc Get all players from the matches table
SELECT DISTINCT name FROM matches
    CROSS JOIN LATERAL (values(player1), (player2)) AS t(name);
