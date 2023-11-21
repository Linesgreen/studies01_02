import {Router, Response, Request} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BlogCreateModel, BlogParams, BlogUpdateModel, PostBlogReqBody} from "../types/blogs/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation, blogPutValidation} from "../middlewares/blog/blogsValidator";
import {BlogType} from "../types/blogs/output";


export const blogRoute = Router ({})

blogRoute.get('/', (req:Request, res:Response<BlogType[]>) => {
    const blogs : BlogType[] = BlogRepository.getAllBlogs()
    res.send(blogs)
})
blogRoute.get('/:id',(req:RequestWithParams<BlogParams>, res:Response<BlogType> ) => {
    const id : string  = req.params.id
    const blog : BlogType | null = BlogRepository.getBlogById(id)
    blog? res.send(blog) : res.sendStatus(404)
})


blogRoute.post('/', authMiddleware,blogPostValidation(),(req:RequestWithBody<BlogCreateModel>, res:Response<BlogType | null> ) => {
    let {name, description, websiteUrl} : PostBlogReqBody = req.body;
    const newBlogId : string = BlogRepository.addBlog({name, description, websiteUrl})
    res.status(201).send(BlogRepository.getBlogById(newBlogId))

})

blogRoute.put('/:id',authMiddleware,blogPutValidation(),(req: RequestWithBodyAndParams<BlogParams, BlogUpdateModel>, res:Response )=> {
    const id : string = req.params.id;
    const {name, description, websiteUrl} : BlogUpdateModel = req.body;
    const updateResult = BlogRepository.updateBlog({name, description, websiteUrl}, id)
    updateResult ? res.sendStatus(204) : res.sendStatus(404)

})

blogRoute.delete('/:id', authMiddleware,(req:RequestWithParams<BlogParams>, res:Response ) => {
    const id : string  = req.params.id
    const deleteResult : boolean = BlogRepository.deleteBlogById(id)
    deleteResult ? res.sendStatus(204) : res.sendStatus(404)
})