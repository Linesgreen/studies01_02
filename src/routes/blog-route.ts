import {Router, Response, Request} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BlogCreateModel, BlogParams, BlogUdateModel, PostBlogReqBody} from "../types/blog/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation, blogPutValidation} from "../validators/blogsValidator";
import {BlogType} from "../types/blog/output";

export const blogRoute = Router ({})

blogRoute.get('/', (req:Request, res:Response ) => {
    const blogs : BlogType[] = BlogRepository.getAllBlogs()
    res.send(blogs)
})
blogRoute.get('/:id', authMiddleware,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id : string  = req.params.id
    const blog : BlogType | null = BlogRepository.getBlogById(id)
    blog? res.send(blog) : res.sendStatus(404)
})

blogRoute.post('/', blogPostValidation(),(req:RequestWithBody<BlogCreateModel>, res:Response ) => {
    let {name, description, websiteUrl} : PostBlogReqBody = req.body;
    const newBlogId : string = BlogRepository.addBlog({name, description, websiteUrl})
    res.status(201).send(BlogRepository.getBlogById(newBlogId))

})

blogRoute.put('/:id',authMiddleware,blogPutValidation(),(req: RequestWithBodyAndParams<BlogParams, BlogUdateModel>, res:Response )=> {
    const id : string = req.params.id;
    const {name, description, websiteUrl} : BlogUdateModel = req.body;
    const updateResult = BlogRepository.updateBlog({name, description, websiteUrl}, id)
   return  updateResult ? res.sendStatus(204) : res.sendStatus(404)

})

blogRoute.delete('/:id', authMiddleware,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id  = req.params.id
    const deleteResult = BlogRepository.deleteBlogById(id)
    return deleteResult ? res.sendStatus(204) : res.sendStatus(404)
})