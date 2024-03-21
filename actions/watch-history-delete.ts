"use server";

import { db } from "@/lib/db";
import z from "zod";
import { WatchHistoryDeleteSchema } from "@/schemas";
import { auth } from "@clerk/nextjs";

export const DeleteWatchHistory = async (values: z.infer<typeof WatchHistoryDeleteSchema>) => {

    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = WatchHistoryDeleteSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const history = await db.watchHistory.deleteMany({
            where: { showId: values.id, userId: userId }
        });

        return { success: "Watch history deleted!" };
    } catch (error) {
        return { error: "Error deleting watch history!" };
    }
};