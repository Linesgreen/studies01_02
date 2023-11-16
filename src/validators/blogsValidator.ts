import {body} from "express-validator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-Validation";
import {BlogRepository} from "../repositories/blog-repository";

export const nameValidation = body('nam')
                                        .isString()
                                        .trim()
                                        .isLength({min: 1, max: 15})
                                        .withMessage('Incorrect name')



export const descriptionValidation = body('description')
    .isString()
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage('Incorrect description')

export const websiteUrlValidation = body('websiteUrl')
    .isString()
    .trim()
    .isLength({min: 1, max: 100})
    .matches('https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage('Incorrect websiteUrl')



export const blogIdValidation = body('blogId').isString().trim().custom((value) => {
    const blog = BlogRepository.getBlogById(value)
    if (!blog) {
        throw new Error('Incorrect blogId!')
    }
    return true
}).withMessage('Incorrect blogId!')

export const blogPostValidation = () => [nameValidation, descriptionValidation,websiteUrlValidation, inputModelValidation];
export const blogPutValidation = () => [nameValidation, descriptionValidation,websiteUrlValidation, inputModelValidation];