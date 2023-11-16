export type PostParams = {
    id : string
}

export type PostCreateModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}

export type PostUpdateModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}