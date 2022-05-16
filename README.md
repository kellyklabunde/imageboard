# imageboard :camera_flash:

An image board to upload images of the nature from Germany.Viewers can leave comments on the photos.
Stack used: Vue.js, Node.js, AWS, PostgreSQL

![](public/images/gif-1.gif)

![](public/images/part2.gif)

# How to Start

1. Create database

go to ..imageboard and execute:

```
psql -U postgres -d imageboard -f sql\images.sql
```

2. Run local folder as HTTP server

go to ..imageboard\uploads and execute:

```
http-server ./
```
3. Start the application

go to ..imageboard and execute:

```
node server.js
```
