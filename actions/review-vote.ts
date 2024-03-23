"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import z from "zod";
import { VoteSchema } from "@/schemas";

export const VoteReview = async (values: z.infer<typeof VoteSchema>) => {
    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = VoteSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const review = await db.review.findUnique({
        where: {
            id: values.id,
        },
    });

    if (!review) {
        return { error: "Review not found!" };
    }

    try {
        const reviewVote = await db.reviewVote.upsert({
            where: {
                userId_reviewId: {
                    userId: userId, 
                    reviewId: values.id,
                },
            },
            create: {
                userId: userId,
                reviewId: values.id,
                vote: values.type === "upvote",
            },
            update: {
                vote: values.type === "upvote",
            },
        });

        return { success: "Voted review!", reviewVoteId: reviewVote.id };
    } catch (error) {
        return { error: "Error voting review!" };
    }
};