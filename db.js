const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.getImages = () => {
    return db.query("SELECT * FROM images ORDER BY id DESC LIMIT 6");
};

module.exports.getMoreImages = (lastId) => {
    return db.query(
        "SELECT *, (SELECT id FROM images ORDER BY id ASC LIMIT 1) AS lowestid from images WHERE id < $1 ORDER by id DESC LIMIT 6",
        [lastId]
    );
};

module.exports.imageInfo = (id) => {
    return db.query(
        "SELECT url, username, title, description, created_at FROM images WHERE id = $1",
        [id]
    );
};

module.exports.uploadImage = (title, description, username, url) => {
    return db.query(
        "INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, username, url]
    );
};

module.exports.getAllComments = (image_id) => {
    return db.query("SELECT * FROM comments WHERE image_id = $1", [image_id]);
};

module.exports.addComment = (comment, username, image_id) => {
    return db.query(
        "INSERT INTO comments (comment, username, image_id) VALUES ($1, $2, $3) RETURNING *",
        [comment, username, image_id]
    );
};

module.exports.getCommentsByImageId = (id) => {
    return db.query(
        "SELECT * FROM comments WHERE image_id = $1 ORDER BY id DESC",
        [id]
    );
};

module.exports.getLatestImg = () => {
    return db.query("SELECT id FROM images ORDER BY id DESC LIMIT 1");
};
