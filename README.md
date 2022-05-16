# imageboard :camera_flash:

An image board to upload images of the nature from Germany.Viewers can leave comments on the photos.
Stack used: Vue.js, Node.js, AWS, PostgreSQL

![](public/images/gif-1.gif)

![](public/images/part2.gif)

# How to Start

create database

```
psql -U postgres -d imageboard -f sql\images.sql
```

go to ..imageboard\uploads

```
http-server ./
```

go to ..imageboard

```
node server.js
```
