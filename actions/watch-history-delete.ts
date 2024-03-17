"use server";

import { db } from "@/lib/db";
import z from "zod";
import { WatchHistoryDeleteSchema } from "@/schemas";

export const DeleteWatchHistory = async (values: z.infer<typeof WatchHistoryDeleteSchema>) => {

    const validatedFields = WatchHistoryDeleteSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const history = await db.watchHistory.delete({
            where: { id: values.id }
        });

        return { success: "Watch history deleted!", historyId: history.id };
    } catch (error) {
        return { error: "Error deleting watch history!" };
    }
};