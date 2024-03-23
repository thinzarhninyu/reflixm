"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import z from "zod";
import { WatchSchema } from "@/schemas";

export const CreateWatchlist = async (values: z.infer<typeof WatchSchema>) => {
    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = WatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const watchlist = await db.watchList.create({
            data: {
                userId,
                showId: values.showId!
            }
        });

        return { success: "Watchlist created!", watchlistId: watchlist.id };
    } catch (error) {
        return { error: "Error creating watchlist!" };
    }
};