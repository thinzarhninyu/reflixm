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

export const WatchSchema = z.object({
    id: z.string().optional(),
    showId: z.string().optional(),
    type: z.enum(["addWatchlist", "removeWatchlist", "addWatchHistory", "removeWatchHistory"]),
});

export const VoteSchema = z.object({
    id: z.string().min(1, {
        message: "ID is required",
    }),
    type: z.enum(["upvote", "downvote"]),
});