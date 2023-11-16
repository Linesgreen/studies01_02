import {body} from "express-validator";
import {blogIdValidation} from "./blogsValidator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-Validation";

export const titleValidation = body('title')
                                            .isString()
                                            .trim()
                                            .isLength({min: 1, max: 30})
                                            .withMessage('Incorrect title')

export const shortDescriptionValidation = body('title')
    .isString()
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Incorrect shortDescription')

export const contentValidation = body('title')
    .isString()
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Incorrect content')

export const postPostValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputModelValidation]

export const postPutValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputModelValidation]