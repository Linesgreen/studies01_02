import express, {Request, Response} from "express";
import {videoRouter} from "./routes/videos-router";
import {db} from "./db/db";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post.route";

export const app  = express()
const port = 3005;

export const RouterPaths = {
    videos: '/videos',
    blogs: '/blogs',
    posts: '/posts',
    __test__: '/testing/all-data'
}

app.use(express.json())

app.use(RouterPaths.videos, videoRouter)
app.use(RouterPaths.blogs, blogRoute)
app.use(RouterPaths.posts, postRoute)

app.get('/', (req : Request, res : Response) => {
    res.send('Заглушка')
})
app.delete(RouterPaths.__test__, (req : Request, res : Response) => {
    db.videos.length = 0;
    db.blogs.length = 0;
    db.posts.length=0;
    res.sendStatus(204);
})
app.listen(port, () => {
    console.log(`server started at port number ${port}`)
})