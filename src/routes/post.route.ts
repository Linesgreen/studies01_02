import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post-repository";
import { PostType} from "../types/posts/output";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {PostCreateModel, PostParams, PostUpdateModel,} from "../types/posts/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postPostValidation, postPutValidation} from "../middlewares/post/postsValidator";


export const postRoute = Router ({});


postRoute.get('/', (req : Request, res : Response<PostType[]>) => {
    const posts : PostType[] = PostRepository.getAllPosts()
    res.send(posts)
})

postRoute.get('/:id', (req : RequestWithParams<PostParams>, res: Response<PostType>)=> {
    const id:string = req.params.id;
    const post : PostType | null = PostRepository.getPostById(id)
    post? res.send(post) : res.sendStatus(404)
})

/////////////////////////////////////
postRoute.post('/', authMiddleware,postPostValidation(), (req : RequestWithBody<PostCreateModel>, res : Response<PostType | null>) => {
    let {title,shortDescription,content,blogId} : PostCreateModel = req.body
    const newPostId : string  = PostRepository.addPost({title,shortDescription,content,blogId})
    res.status(201).send(PostRepository.getPostById(newPostId))
})

postRoute.put('/:id',authMiddleware,postPutValidation(), (req : RequestWithBodyAndParams<PostParams, PostUpdateModel>, res:Response) => {
    const id : string = req.params.id;
    const {title,shortDescription,content,blogId} : PostUpdateModel = req.body
    const updateResult = PostRepository.updatePost({title,shortDescription,content,blogId}, id)
    updateResult? res.sendStatus(204) : res.sendStatus(404)

})

postRoute.delete('/:id',authMiddleware,(req :RequestWithParams<PostParams>, res:Response) => {
    const id:string = req.params.id;
    const deleteResult : boolean = PostRepository.deletePostById(id)
    return deleteResult? res.sendStatus(204) : res.sendStatus(404)
})