"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import z from "zod";
import { CommentSchema } from "@/schemas";

export const CreateComment = async (values: z.infer<typeof CommentSchema>) => {
    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = CommentSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const comment = await db.comment.create({
            data: {
                userId,
                reviewId: values.reviewId, 
                comment: values.comment 
            }
        });

        return { success: "Comment created!", commentId: comment.id };
    } catch (error) {
        return { error: "Error creating comment!" };
    }
};