import {db} from "../db/db";
import {PostType} from "../types/posts/output";
import {PostCreateModel, PostParams, PostUpdateModel} from "../types/posts/input";
import {BlogRepository} from "./blog-repository";
import {BlogType} from "../types/blog/output";

export class PostRepository {
    static getAllPosts() : PostType[] {
        return db.posts
    }

    static getPostById (id : string) : PostType | null {
        const post = db.posts.find(p => p.id === id)
         return post || null
    }

    static addPost (params : PostCreateModel) : string {
        const blog : BlogType | null  = BlogRepository.getBlogById(params.blogId)

        // попытка успокоить TS
        if(!blog) {
            return "ERROR"
        }
        /////////////////////////


        const newPost : PostType = {
            id: `PostID_${(new Date()).toISOString()}`,
            title: params.title,
            shortDescription: params.shortDescription,
            content: params.content,
            blogId: params.blogId,
            blogName: blog.name
        }

        db.posts.push(newPost)
        return newPost.id
    }

    static updatePost(params: PostUpdateModel, id :string) : boolean {
        const postIndex : number = db.posts.findIndex(p => p.id === id)
        const post : PostType | null = this.getPostById(id)
        if (!post) {
            return false
        }
        const updatePost : PostType = {
            ...post,
            title: params.title,
            shortDescription: params.shortDescription,
            content: params.content,
            blogId: params.blogId
        }
        db.posts.splice(postIndex, 1, updatePost)
        return true
    }

    static deletePostById(id: string) : boolean {
        const postIndex : number = db.posts.findIndex(p => p.id === id)
        if (postIndex === -1 ) {
            return false
        }
        db.posts.splice(postIndex,1)
        return true
    }

}