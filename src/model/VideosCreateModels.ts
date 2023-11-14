import {AvailableResolutions} from "../types/videos/output";


export type VideoCreateModel = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions;
}

