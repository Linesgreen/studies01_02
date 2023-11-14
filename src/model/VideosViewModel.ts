import {AvailableResolutions} from "../types/videos/output";

export type VideoViewModel = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: typeof  AvailableResolutions;
}