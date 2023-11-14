import express from "express";
import {videoRouter} from "./routes/videos-router";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post.route";

export const app = express();

app.use(express.json());

app.use('/videos', videoRouter)
app.use('/blogs', blogRoute)
app.use('/posts', postRoute)