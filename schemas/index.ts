import * as z from "zod";

export const CommentSchema = z.object({
    id: z.string().optional(),
    reviewId: z.string().min(1, {
        message: "Review ID is required",
    }),
    comment: z.string().min(1, {
        message: "Comment is required",
    }),
});

export const CommentDeleteSchema = z.object({
    id: z.string().min(1, {
        message: "Comment ID is required",
    }),
});

export const WatchListSchema = z.object({
    id: z.string().optional(),
    showId: z.string().min(1, {
        message: "Show ID is required",
    }),
});

export const WatchListDeleteSchema = z.object({
    id: z.string().min(1, {
        message: "Watchlist ID is required",
    }),
});

export const WatchHistorySchema = z.object({    
    id: z.string().optional(),
    showId: z.string().min(1, {
        message: "Show ID is required",
    }),
});

export const WatchHistoryDeleteSchema = z.object({
    id: z.string().min(1, {
        message: "Watch history ID is required",
    }),
});