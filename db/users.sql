-- Users table for account creation / auth.
-- Run:  psql expressreact2db -f db/users.sql

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- case-insensitive uniqueness so "Alex" and "alex" can't both register
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx    ON users (lower(email));
CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_idx ON users (lower(username));
