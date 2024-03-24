"use client";
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

import { useState } from "react";
import z from "zod";
import { WatchSchema } from "@/schemas";

const ShowCard = ({
    show,
    onWatch,
    inWatchlist,
    inWatchHistory
}: {
    show: Show & { review: { rating: number } | null },
    onWatch: (values: z.infer<typeof WatchSchema>) => void,
    inWatchlist: boolean,
    inWatchHistory: boolean
}) => {

    const [isInWatchlist, setIsInWatchlist] = useState<boolean>(inWatchlist);
    const [isInWatchHistory, setIsInWatchHistory] = useState<boolean>(inWatchHistory);

    return (
        <Card key={show.id} className="w-full min-h-[300px] shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.025] flex flex-col">
            <Link key={show.id} href={`/shows/${show.id}`} className="flex flex-col h-full">
                <div className="flex justify-center items-center w-full p-3 h-60">
                    <Image src={show.image ? show.image : DEFAULT_IMAGE_URL} alt={show.title} width={300} height={50} className="w-full h-full object-cover rounded-lg" />
                </div>
                <CardHeader className="pt-3">
                    <CardTitle className="text-md text-center mb-3 overflow-hidden line-clamp-1">
                        {show.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center items-center">
                        {show.genre.map((genre, index) => (
                            <Badge className="bg-orange-700" key={index}>{genre}</Badge>
                        ))}
                    </div>
                    <CardDescription className="pt-3 overflow-hidden line-clamp-3">{show.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-xs">Starring:</p>
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
                    <div className="flex flex-row gap-x-3">
                        <Button variant="outline" onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (isInWatchlist) {
                                setIsInWatchlist(false);
                                onWatch({ type: "removeWatchlist", showId: show.id })
                            } else {
                                setIsInWatchlist(true);
                                onWatch({ type: "addWatchlist", showId: show.id })
                            }
                        }}>
                            <HeartIcon className="w-5 h-5" fill={isInWatchlist ? "red" : "transparent"} color={!isInWatchlist ? "black" : "transparent"} />
                        </Button>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (isInWatchHistory) {
                                setIsInWatchHistory(false);
                                onWatch({ type: "removeWatchHistory", showId: show.id })
                            } else {
                                setIsInWatchHistory(true);
                                onWatch({ type: "addWatchHistory", showId: show.id })
                            }
                        }}>Watched {isInWatchHistory ? "!" : "?"}</Button>
                    </div>
                </CardFooter>
            </Link>
        </Card>
    )
}

export default ShowCard;