import {VideoType} from "../types/videos/output";
import {BlogType} from "../types/blogs/output";
import {PostType} from "../types/posts/output";


type DBtype = {
    videos: VideoType[]
    blogs : BlogType[]
    posts : PostType[]
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
            id: '01',
            name: "FirstBlogName",
            description: "FirstDescription",
            websiteUrl: "FirstURL"
        }
    ],
    posts: [

            {
                id: "01",
                title: "firstTitle",
                shortDescription: "firstDescription",
                content: "firstContent",
                blogId: "firstBlogID",
                blogName: "FirstBlogName"
            }

    ]
}