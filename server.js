const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { upload } = require("./s3");
const config = require("./config.json");
const db = require("./db");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.get("/images", (req, res) => {
    db.getImages().then((result) => {
        res.json(result.rows);
    });
});

app.get("/images/more", (req, res) => {
    console.log(req.query.lastId);

    db.getMoreImages(req.query.lastId).then((result) => {
        res.json(result.rows);
    });
});

app.get("/images/:image", (req, res) => {
    db.imageInfo(req.params.image)
        .then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((e) => {
            console.log(e);

            res.sendStatus(500);
        });
});

app.get("/showlatestimage", (req, res) => {
    console.log("latestid");
    db.getLatestImg().then((result) => {
        console.log("latestid");
        res.json(result.rows);
    });
});

// app.post("/upload", uploader.single("image"), upload, (req, res) => { #WITH AWS
app.post("/upload", uploader.single("image"), (req, res) => {
    console.log("we've made it inside the POST /upload route handler");
    console.log("which means: the image is already uploaded to s3");

    let title = req.body.title;
    let description = req.body.description;
    let username = req.body.username;
    // let url = config.s3Url + req.file.filename; #WITH AWS
    let url = "http://127.0.0.1:8080/" + req.file.filename;
    console.log(url)

    db.uploadImage(title, description, username, url)
        .then((result) => {
            // console.log(result);
            res.json(result.rows);
        })
        .catch((e) => {
            console.log(e);

            res.sendStatus(500);
        });
});

app.get("/comments/:imageId", (req, res) => {
    db.getAllComments(req.params.imageId)
        .then((result) => {
            // console.log(result.rows);
            res.json(result.rows);
        })
        .catch((e) => {
            console.log(e);

            res.sendStatus(500);
        });
});

app.post("/comment", (req, res) => {
    let comment = req.body.comment;
    let username = req.body.username;
    let imageId = req.body.imageId;

    db.addComment(comment, username, imageId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((e) => {
            console.log(e);

            res.sendStatus(500);
        });
});

app.listen(3000, () =>
    console.log("imageboard listening on localhost:3000...")
);
