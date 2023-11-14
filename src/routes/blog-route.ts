import {Router, Response, Request} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithParams} from "../types/common";
import {BlogParams} from "../types/blog/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation} from "../validators/blogsValidator";

export const blogRoute = Router ({})

blogRoute.get('/', (req:Request, res:Response ) => {
    const blogs = BlogRepository.getAllBlogs()
    res.send(blogs)
})
blogRoute.get('/:id', authMiddleware, blogPostValidation() ,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id  = req.params.id
    const blog = BlogRepository.getBlogById(id)
    blog? res.send(blog) : res.sendStatus(404)
})

blogRoute.post('/', authMiddleware,blogPostValidation() ,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id  = req.params.id
    const blog = BlogRepository.getBlogById(id)
    blog? res.send(blog) : res.sendStatus(404)
})

