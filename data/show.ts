import { db } from "@/lib/db";
import { Genre, Type } from "@prisma/client";

export const getHighestRatedShows = async () => {
    try {
        const shows = await db.show.findMany({ orderBy: { review: { rating: "desc" } }, take: 3 });
        return shows;
    } catch {
        return null;
    }
}

export const getLatestRatedShow = async () => {
    try {
        const shows = await db.show.findFirst({ orderBy: { review: { createdAt: "desc" } }, take: 1 });
        return shows;
    } catch {
        return null;
    }
}

export const getShowById = async (id: string) => {
    try {
        const show = await db.show.findFirst({ where: { id } });
        return show;
    } catch {
        return null;
    }
}

export const getShowReviewById = async (showId: string) => {
    try {
        const reviews = await db.review.findFirst({ where: { showId } });
        return reviews;
    } catch {
        return null;
    }
}

export const getShows = async () => {
    try {
        const shows = await db.show.findMany();
        return shows;
    } catch {
        return null;
    }
}

export const getShowsByGenre = async (genre: Genre) => {
    try {
        const shows = await db.show.findMany({ where: { genre: { has: genre } } });
        return shows;
    } catch {
        return null;
    }
}

export const getShowsByType = async (type: Type) => {
    try {
        const shows = await db.show.findMany({ where: { type } });
        return shows;
    } catch {
        return null;
    }
}

export const getWatchListByUserId = async (userId: string) => {
    try {
        // const watchList = await db.watchList.findMany({ where: { userId } });
        const watchList = await db.show.findMany({ where: { watchList: { some: { userId } } } })
        return watchList;
    } catch {
        return null;
    }
}

export const getWatchHistoryByUserId = async (userId: string) => {
    try {
        // const watchHistory = await db.watchHistory.findMany({ where: { userId } });
        const watchHistory = await db.show.findMany({ where: { watchHistory: { some: { userId } } } })
        return watchHistory;
    } catch {
        return null;
    }
}

export const getCommentsByReviewId = async (reviewId: string) => {
    try {
        const comments = await db.comment.findMany({ where: { reviewId } });
        return comments;
    } catch {
        return null;
    }
}    