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
);

INSERT INTO images (url, username, title, description) VALUES 
    ('http://127.0.0.1:8080/foto1.jpg', 'Anna', 'Sunny sunday', 'great time enjoing the spring'),
    ('http://127.0.0.1:8080/foto2.jpg', 'Harry', 'German caribean', 'Cristal clear water by Zugspitze'),
    ('http://127.0.0.1:8080/foto3.jpg', 'Hendrick', 'My favorite picture!', 'This animal is amazing'),
    ('http://127.0.0.1:8080/foto4.jpg', 'Paul', 'Bodensee', 'This place is so special!'),
    ('http://127.0.0.1:8080/foto5.jpg', 'Marcus', 'Medieval castle', 'worth a visit'),
    ('http://127.0.0.1:8080/foto6.jpg', 'Barbara', 'My daily walk to work', 'Lucky to live in such a beautiful place'),
    ('http://127.0.0.1:8080/foto7.jpg', 'Thomas', 'Blautopf - near Ulm', 'I can not put in words the color of this water!'),
    ('http://127.0.0.1:8080/foto8.jpg', 'Carol', 'Bye Bye Sun!', 'Surprised by this beautiful sunset on the road'),
    ('http://127.0.0.1:8080/foto9.jpg', 'Tim', 'German Alps', 'Hiking with a view'),
    ('http://127.0.0.1:8080/foto10.jpg', 'Rafael', 'Winter at Schwarzwald', 'perfect weekend for winter sports!'),
    ('http://127.0.0.1:8080/foto11.jpg', 'Jessica', 'Waterfall in the Black forest', 'nature is so beautiful!!!'),
    ('http://127.0.0.1:8080/foto12.jpg', 'Will', 'In the wineyards', 'Beautiful to take a walk here'),
    ('http://127.0.0.1:8080/foto13.jpg', 'Daniel', 'Elb River', 'Sooo nice!'),
    ('http://127.0.0.1:8080/foto14.jpg', 'Sascha', 'Wonderful place', 'Some days off in the nature'),
    ('http://127.0.0.1:8080/foto15.jpg', 'Sabine', 'My new lil friend!', 'So cute!!');