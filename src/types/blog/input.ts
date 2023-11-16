export type BlogParams = {
    id : string
}

export type PostBlogReqBody = {
    name: string,
    description: string,
    websiteUrl:string
}

export type BlogCreateModel ={
    name: string,
    description: string,
    websiteUrl:string
}

export type BlogUdateModel = {
    name: string,
    description: string,
    websiteUrl:string
}
