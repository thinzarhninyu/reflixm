"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import z from "zod";
import { WatchSchema } from "@/schemas";

export const WatchShow = async (values: z.infer<typeof WatchSchema>) => {
    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = WatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        if (values.type === "addWatchlist") {
            const watchlist = await db.watchList.create({
                data: {
                    userId,
                    showId: values.showId!
                }
            });
            return { success: "Watchlist created!", watchlistId: watchlist.id };
        } else if (values.type === "removeWatchlist") {
            const watchlist = await db.watchList.delete({
                where: {
                    userId_showId: {
                        showId: values.showId!, userId: userId
                    }
                }
            });
            return { success: "Watchlist deleted!", watchlistId: watchlist.id };
        } else if (values.type === "addWatchHistory") {
            const history = await db.watchHistory.create({
                data: {
                    userId,
                    showId: values.showId!
                }
            });
            return { success: "Watch history created!", historyId: history.id };
        } else if (values.type === "removeWatchHistory") {
            const history = await db.watchHistory.delete({
                where: {
                    userId_showId: {
                        showId: values.showId!, userId: userId
                    }
                }
            });
            return { success: "Watch history deleted!", historyId: history.id };
        }

        return null;
    } catch (error) {
        return { error: "Error creating watch history!" };
    }
};