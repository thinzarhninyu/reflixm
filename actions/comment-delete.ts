"use server";

import { db } from "@/lib/db";
import z from "zod";
import { CommentDeleteSchema } from "@/schemas";

export const DeleteComment = async (values: z.infer<typeof CommentDeleteSchema>) => {

    const validatedFields = CommentDeleteSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const comment = await db.comment.delete({
            where: { id: values.id }
        });

        return { success: "Comment deleted!", commentId: comment.id };
    } catch (error) {
        return { error: "Error deleting comment!" };
    }
};