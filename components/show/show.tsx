"use client"

import type { Show } from "@prisma/client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, Star } from "lucide-react";
import { DEFAULT_IMAGE_URL } from "@/data/constants";

import { useTransition, useState } from "react";
import z from "zod";
import { WatchHistoryDeleteSchema, WatchListDeleteSchema, WatchListSchema } from "@/schemas";
import { CreateWatchlist } from "@/actions/watchlist-create";
import { CreateWatchHistory } from "@/actions/watch-history-create";
import { DeleteWatchlist } from "@/actions/watchlist-delete";
import { DeleteWatchHistory } from "@/actions/watch-history-delete";

const Show = ({ show, type }: { show: Show & { review: { rating: number } | null }, type?: string }) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onAddToWatchlist = (values: z.infer<typeof WatchListSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            CreateWatchlist(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    const onAddToWatchHistory = (values: z.infer<typeof WatchListSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            CreateWatchHistory(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    const onRemoveFromWatchlist = (values: z.infer<typeof WatchListDeleteSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            DeleteWatchlist(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    const onRemoveFromWatchHistory = (values: z.infer<typeof WatchHistoryDeleteSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            DeleteWatchHistory(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    return (
        <Card key={show.id} className="w-full min-h-[300px] shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.025] flex flex-col">
            <Link key={show.id} href={`/shows/${show.id}`} className="flex flex-col h-full">
                <div className="flex justify-center items-center w-full p-3 h-60">
                    <Image src={show.image ? show.image : DEFAULT_IMAGE_URL} alt={show.title} width={300} height={50} className="w-full h-full object-cover rounded-lg" />
                </div>
                <CardHeader className="pt-3">
                    <CardTitle className="text-lg text-center whitespace-normal break-words mb-3">{show.title}</CardTitle>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center items-center">
                        {show.genre.map((genre, index) => (
                            <Badge className="bg-orange-700" key={index}>{genre}</Badge>
                        ))}
                    </div>
                    <CardDescription className="pt-3 overflow-hidden line-clamp-3">{show.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Starring:</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 items-center mt-3">
                        {show.cast.map((cast, index) => (
                            <Badge className="bg-indigo-700" key={index}>{cast}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="justify-between items-center flex flex-row gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <Star className="w-5 h-5" fill="orange" color="orange" />
                        <span className="text-gray-500">{show.review?.rating.toFixed(1)}/5.0</span>
                    </div>
                    {!type && (
                        <div className="flex flex-row gap-x-3">
                            <Button variant="outline" onClick={() => onAddToWatchlist({ showId: show.id })}>
                                <HeartIcon className="w-5 h-5" />
                            </Button>
                            <Button onClick={() => onAddToWatchHistory({ showId: show.id })}>Watched?</Button>
                        </div>
                    )}
                    {type === "watchlist" && (
                        <Button onClick={() => onRemoveFromWatchlist({ id: show.id })}>
                            <HeartIcon className="w-5 h-5" fill="red" color="red" />
                        </Button>
                    )}
                    {type === "watchHistory" && (
                        <Button onClick={() => onRemoveFromWatchHistory({ id: show.id })}>Remove from Watch History</Button>
                    )}
                </CardFooter>
            </Link>
        </Card>
    )
}

export default Show;