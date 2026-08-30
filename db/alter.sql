
-- ALTER TABLE dreams
-- ADD COLUMN title TEXT NOT NULL DEFAULT('UNTITLED');


ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;   -- Google users have no password
ALTER TABLE users ALTER COLUMN username      DROP NOT NULL;   -- may not have one at signup
ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;           -- stable id for returning logins