import { db } from "@/lib/db";
import { Genre, Type } from "@prisma/client";
import { count } from "console";

export const getHighestRatedShows = async () => {
    try {
        const shows = await db.show.findMany({ orderBy: { review: { rating: "desc" } }, take: 3, include: { review: { select: { rating: true } } } });
        return shows;
    } catch {
        return null;
    }
}

export const getLatestRatedShow = async () => {
    try {
        const shows = await db.show.findFirst({ orderBy: { review: { createdAt: "desc" } }, take: 1, include: { review: { select: { rating: true } } } });
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
        const review = await db.review.findFirst({ where: { showId } });
        if (!review) return null;
        const votes = await db.reviewVote.findMany({ where: { reviewId: review.id } });
        return { review, votes };
    } catch {
        return null;
    }
}

export const getShows = async () => {
    try {
        const shows = await db.show.findMany({
            include: { review: { select: { rating: true } } }
        });
        return shows;
    } catch {
        return null;
    }
}

export const getShowsByGenre = async (genre: Genre) => {
    try {
        const shows = await db.show.findMany({ where: { genre: { has: genre } }, include: { review: { select: { rating: true } } } });
        return shows;
    } catch {
        return null;
    }
}

export const getShowsByType = async (type: Type) => {
    try {
        const shows = await db.show.findMany({ where: { type }, include: { review: { select: { rating: true } } } });
        return shows;
    } catch {
        return null;
    }
}

export const getWatchListByUserId = async (userId: string) => {
    try {
        const watchList = await db.show.findMany({ where: { watchList: { some: { userId } } }, include: { review: { select: { rating: true } } } })
        return watchList;
    } catch {
        return null;
    }
}

export const getWatchHistoryByUserId = async (userId: string) => {
    try {
        const watchHistory = await db.show.findMany({ where: { watchHistory: { some: { userId } } }, include: { review: { select: { rating: true } } } })
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

export const getRelatedShows = async (showId: string) => {
    try {
        const show = await db.show.findFirst({ where: { id: showId } });
        if (!show) return null;

        const mainTitle = show.title.split(':')[0].trim();

        const relatedSeasons = await db.show.findMany({
            where: {
                title: { contains: mainTitle },
                id: { not: show.id }
            },
            include: { review: { select: { rating: true } } }
        });

        const relatedCastsPromises = show.cast.map(async (cast) => {
            return await db.show.findMany({
                where: {
                    cast: { has: cast },
                    id: { not: show.id }
                },
                include: { review: { select: { rating: true } } }
            });
        });

        const relatedCasts = await Promise.all(relatedCastsPromises);

        const flattenedRelatedCasts = relatedCasts.flat().filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.id === item.id
            ))
        );

        const relatedShows = [...relatedSeasons, ...flattenedRelatedCasts].slice(0, 3);

        return relatedShows;
    } catch (error) {
        console.error("Error fetching related shows:", error);
        return null;
    }
}

export const checkWatchlist = async (showId: string, userId: string) => {
    try {
        const watchlist = await db.watchList.findFirst({
            where: { showId, userId }
        });
        return watchlist;
    } catch {
        return null;
    }
}

export const checkWatchHistory = async (showId: string, userId: string) => {
    try {
        const watchHistory = await db.watchHistory.findFirst({
            where: { showId, userId }
        });
        return watchHistory;
    } catch {
        return null;
    }
}

export const getReviewVotesByUserId = async (userId: string) => {
    try {
        const votes = await db.reviewVote.findMany({ where: { userId } });
        return votes;
    } catch {
        return null;
    }
}