import {Router, Response, Request} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BlogCreateModel, BlogParams, BlogUdateModel, PostBlogReqBody} from "../types/blog/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation, blogPutValidation} from "../validators/blogsValidator";
import {BlogType} from "../types/blog/output";
import {db} from "../db/db";

export const blogRoute = Router ({})

blogRoute.get('/', (req:Request, res:Response ) => {
    const blogs = BlogRepository.getAllBlogs()
    res.send(blogs)
})
blogRoute.get('/:id', authMiddleware,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id  = req.params.id
    const blog = BlogRepository.getBlogById(id)
    blog? res.send(blog) : res.sendStatus(404)
})

blogRoute.post('/', authMiddleware,blogPostValidation(),(req:RequestWithBody<BlogCreateModel>, res:Response ) => {
    let {name, description, websiteUrl} : PostBlogReqBody = req.body;

    const newBlog : BlogType = {
        id: (new Date()).toString(),
        name: name,
        description: description,
        websiteUrl: websiteUrl
    }

    db.blogs.push(newBlog)
    res.status(201).send(newBlog)

})

blogRoute.put('/:id',authMiddleware,blogPutValidation(),(req: RequestWithBodyAndParams<BlogParams, BlogUdateModel>, res )=> {
    const id : string = req.params.id;
    let {name, description, websiteUrl} : BlogUdateModel = req.body;

    const blogIndex : number = db.blogs.findIndex(b => b.id === id)
    const blog : BlogType = db.blogs[blogIndex]

    const updateItems : BlogType  = {
        ...blog,
        name,
        description,
        websiteUrl
    }

    db.blogs.splice(blogIndex,1,updateItems)
    res.sendStatus(204)

})