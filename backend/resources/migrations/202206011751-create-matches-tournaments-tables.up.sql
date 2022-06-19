CREATE TABLE IF NOT EXISTS tournaments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    date TIMESTAMP NOT NULL,
    game_version VARCHAR(10) NOT NULL,
    tournament_organizer VARCHAR(50) NOT NULL
);
--;;
CREATE TABLE IF NOT EXISTS matches (
     id SERIAL PRIMARY KEY,
     player1 VARCHAR(32) NOT NULL,
     character1 VARCHAR(32) NOT NULL,
     player2 VARCHAR(32) NOT NULL,
     character2 VARCHAR(32) NOT NULL,
     did_p1_win bool NOT NULL,
     start_time VARCHAR(16) NOT NULL,
     tournament_id INTEGER REFERENCES tournaments (id)

);
