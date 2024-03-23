"use server";

import { db } from "@/lib/db";
import z from "zod";
import { WatchSchema } from "@/schemas";
import { auth } from "@clerk/nextjs";

export const DeleteWatchlist = async (values: z.infer<typeof WatchSchema>) => {

    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = WatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const watchlist = await db.watchList.deleteMany({
            where: { showId: values.id, userId: userId }
        });

        return { success: "Watchlist deleted!" };
    } catch (error) {
        return { error: "Error deleting watchlist!" };
    }
};