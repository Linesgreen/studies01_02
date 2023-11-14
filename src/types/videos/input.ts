import {AvailableResolutions} from "./output";


export type CreateVideoDto = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions;
}