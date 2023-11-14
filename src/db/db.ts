import {VideoType} from "../types/videos/output";
import {BlogType} from "../types/blog/output";

type DBtype = {
    videos: VideoType[]
    blogs : BlogType[]
}


export const db: DBtype = {
    videos:  [{
            id: 0,
            title: "string",
            author: "string",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2023-11-07T11:55:39.104Z",
            publicationDate: "2023-11-07T11:55:39.104Z",
            availableResolutions: [
                "P144"
            ]
    }],
    blogs : [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string"
        }
    ]
}