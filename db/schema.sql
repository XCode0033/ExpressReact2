-- ExpressReact2 schema + seed data
-- Re-run any time to rebuild from scratch:  psql expressreact2db -f db/schema.sql

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS dreams;

CREATE TABLE movies (
  id       SERIAL PRIMARY KEY,
  title    TEXT NOT NULL,
  director TEXT,
  year     INTEGER
);

CREATE TABLE games (
  id    SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT
);

CREATE TABLE dreams (
  id          SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT('UNTITLED') -- ALTERED IN, WILL AUTO SET IF RESET OF ENTIRE DATABASE.
  description TEXT NOT NULL,
  mood        TEXT,
  dreamt_on   DATE DEFAULT CURRENT_DATE
);

INSERT INTO movies (title, director, year) VALUES
  ('Arrival',        'Denis Villeneuve', 2016),
  ('Spirited Away',  'Hayao Miyazaki',   2001),
  ('Parasite',       'Bong Joon-ho',     2019),
  ('The Thing',      'John Carpenter',   1982);

INSERT INTO games (title, genre) VALUES
  ('Hades',       'roguelike'),
  ('Celeste',     'platformer'),
  ('Outer Wilds', 'exploration'),
  ('Tetris',      'puzzle');

INSERT INTO dreams (description, mood, dreamt_on) VALUES
  ('Flying over a city made of glass',        'peaceful', '2026-08-20'),
  ('Late for an exam I never studied for',    'anxious',  '2026-08-23'),
  ('Talking to a cat that spoke in riddles',  'curious',  '2026-08-25');
