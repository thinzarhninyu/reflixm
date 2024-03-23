"use client"

import { useTransition, useState } from "react";
import z from "zod";
import { WatchSchema } from "@/schemas";
import { WatchShow } from "@/actions/show-watch";

import { Show } from "@prisma/client";
import ShowCard from "./show";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type ShowWithReview = Show & { review: { rating: number } | null };

const ShowList = ({ shows, watchList, watchHistory }: { shows: ShowWithReview[], watchList: ShowWithReview[], watchHistory: ShowWithReview[] }) => {

    const router = useRouter();
    const { userId } = useAuth();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onWatch = (values: z.infer<typeof WatchSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            WatchShow(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                    if (data?.error === "Unauthorized") {
                        router.push("/sign-in");
                    }
                })
        });
    };

    return (
        <>
            {shows && shows.map((show) => (
                <div key={show.id} className="w-full sm:w-full md:w-full lg:w-1/3 p-2">
                    <ShowCard show={show} onWatch={onWatch} inWatchHistory={watchHistory?.some(history => history.id === show.id)} inWatchlist={watchList?.some(list => list.id === show.id)} />
                </div>
            ))}
        </>
    );
}

export default ShowList;