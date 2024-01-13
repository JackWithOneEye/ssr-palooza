#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  DROP TABLE IF EXISTS frameworks;
  CREATE TABLE frameworks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    isPoop BOOLEAN
  );

  INSERT INTO frameworks(name, description, isPoop)
  VALUES
    ('AngolaJS', 'legacy code', true),
    ('Cockout.js', 'MVVM', false),
    ('Eww.js', 'ewwwwwwwwwwww', false),
    ('R***t', 'Vi***al D*M', true),
    ('SolidPoopJS', 'signals', false),
    ('Swolte', 'Rich Harris... what a mensch', false);
EOSQL