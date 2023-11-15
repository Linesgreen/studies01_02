import {db} from "../db/db";
import {PostBlogReqBody} from "../types/blog/input";
import {BlogType} from "../types/blog/output";

export class BlogRepository {
    static getAllBlogs() {
        return db.blogs
    }

    static getBlogById (id : string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return blog
    }

    static addBlog (params : PostBlogReqBody) {
        let newBlog : BlogType = {
            id: (new Date()).toString(),
            name: params.name,
            description: params.description,
            websiteUrl: params.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog.id;
    }
}