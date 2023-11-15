import {db} from "../db/db";
import {BlogUdateModel, PostBlogReqBody} from "../types/blog/input";
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

    static updateBlog(params : BlogUdateModel, id : string) {
        const blogIndex : number = db.blogs.findIndex(b => b.id === id)
        const blog: BlogType | null  = this.getBlogById(id)
        if (!blog) {
            return false
        }
        const updatedBlog : BlogType = {
            ...blog,
            name: params.name,
            description: params.description,
            websiteUrl: params.websiteUrl
        }
        db.blogs.splice(blogIndex,1,updatedBlog)
        return true
    }
}