import {Request} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<P,B> = Request<P,{},B,{}>
export type ErrorType = {
    errorsMessages : ErrorMessagesType[]
}
export type ErrorMessagesType = {
    message: string
    field: string
}


export type PostReqBody = {
    title : string,
    author : string,
    availableResolutions: string[]
}
