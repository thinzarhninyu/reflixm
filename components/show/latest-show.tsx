"use client"

import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import { Show } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '@/data/constants';
import { HeartIcon } from 'lucide-react';

import { useTransition, useState } from "react";
import z from "zod";
import { WatchHistoryDeleteSchema, WatchListDeleteSchema, WatchListSchema } from "@/schemas";
import { CreateWatchlist } from "@/actions/watchlist-create";
import { CreateWatchHistory } from "@/actions/watch-history-create";
import { DeleteWatchlist } from "@/actions/watchlist-delete";
import { DeleteWatchHistory } from "@/actions/watch-history-delete";
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const LatestShow = ({ show, type }: { show: Show & { review: { rating: number } | null }, type?: string }) => {

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
        <div>
            <Link href={`/shows/${show.id}`}>
                <Card className='w-full h-full flex flex-col lg:flex-row'>
                    <div className='flex items-center w-full lg:w-25 p-3'>
                        <Image
                            src={show.image ? show.image : DEFAULT_IMAGE_URL}
                            alt={show.title}
                            layout="responsive"
                            width={100}
                            height={100}
                            blurDataURL="data:..."
                            placeholder="blur"
                            className='w-full rounded-lg'
                        />
                    </div>
                    <div className='flex w-full lg:w-75'>
                        <div>
                            <CardHeader>
                                <CardTitle className="whitespace-normal break-words mb-3">{show.title}</CardTitle>
                                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center">
                                    {show.genre.map((genre, index) => (
                                        <Badge className="bg-orange-700" key={index}>{genre}</Badge>
                                    ))}
                                </div>
                                <CardDescription className="pt-3 overflow-hidden line-clamp-3">{show.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
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
                        </div>
                    </div >
                </Card >
            </Link>
        </div>
    )
}

export default LatestShow;