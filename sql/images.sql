-- whenever you make any update to this file,
-- you need to RUN the file again with `psql -d imageboard -f sql/images.sql || heroku pg:psql -f tables/signatures.sql` 

DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    image_id INTEGER NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
