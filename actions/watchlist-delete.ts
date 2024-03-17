"use server";

import { db } from "@/lib/db";
import z from "zod";
import { WatchListDeleteSchema } from "@/schemas";

export const DeleteWatchlist = async (values: z.infer<typeof WatchListDeleteSchema>) => {

    const validatedFields = WatchListDeleteSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const watchlist = await db.watchList.delete({
            where: { id: values.id }
        });

        return { success: "Watchlist deleted!", watchlistId: watchlist.id };
    } catch (error) {
        return { error: "Error deleting watchlist!" };
    }
};