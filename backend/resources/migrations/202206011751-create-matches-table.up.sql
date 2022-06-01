CREATE TABLE matches (
     id SERIAL PRIMARY KEY,
     player1 VARCHAR(32) NOT NULL,
     character1 VARCHAR(32) NOT NULL,
     player2 VARCHAR(32) NOT NULL,
     character2 VARCHAR(32) NOT NULL,
     did_p1_win bool NOT NULL,
     start_time VARCHAR(16) NOT NULL
);
