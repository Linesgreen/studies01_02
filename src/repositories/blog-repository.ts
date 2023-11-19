import {db} from "../db/db";
import {BlogUpdateModel, PostBlogReqBody} from "../types/blog/input";
import {BlogType} from "../types/blog/output";

export class BlogRepository {
    static getAllBlogs() : BlogType[] {
        return db.blogs
    }

    static getBlogById (id : string) : BlogType | null  {
        const blog : BlogType | undefined = db.blogs.find(b => b.id === id)
        return blog || null
    }

    static addBlog (params : PostBlogReqBody) : string {
        const newBlog : BlogType = {
            id: (new Date()).toISOString(),
            name: params.name,
            description: params.description,
            websiteUrl: params.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog.id;
    }


    // успех true, не успех false
    static updateBlog(params : BlogUpdateModel, id : string) : boolean {
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

    static deleteBlogById(id : string) : boolean {
        const blogIndex : number = db.blogs.findIndex(b => b.id === id)
        if (blogIndex === -1) {
            return false
        }
        db.blogs.splice(blogIndex,1)
        return true
    }
}