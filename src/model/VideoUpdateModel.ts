import {AvailableResolutions} from "../types/videos/output";


export type VideoUpdateModelId = {
    /**
     *  Video title
     */
    id:string;
}

export type VideoUpdateModelBody = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
    "canBeDownloaded": boolean
    "minAgeRestriction": number | null
    "publicationDate": string
}