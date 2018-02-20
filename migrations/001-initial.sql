--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Video (
  id   TEXT PRIMARY KEY,
  category TEXT,
  title TEXT,
  fulltitle TEXT,
  detail TEXT,
  start INTEGER,
  end INTEGER,
  seconds INTEGER,
  description TEXT,
  subtitle TEXT,
  episode INTEGER,
  recorded TEXT
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Video;
