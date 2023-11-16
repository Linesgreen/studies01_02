export type BlogParams = {
    id : string
}

export type PostBlogReqBody = {
    nam: string,
    description: string,
    websiteUrl:string
}

export type BlogCreateModel ={
    nam: string,
    description: string,
    websiteUrl:string
}

export type BlogUdateModel = {
    name: string,
    description: string,
    websiteUrl:string
}
