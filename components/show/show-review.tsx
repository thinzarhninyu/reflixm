"use client"

import { Review, ReviewVote } from "@prisma/client";
import { Badge } from "../ui/badge";
import { useState, useTransition } from "react";
import VoteButton from "./vote-button";
import { VoteReview } from "@/actions/review-vote";
import { useAuth } from "@clerk/nextjs";

const ShowReview = ({ review, votes }: { review: Review, votes: ReviewVote[] }) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const { userId } = useAuth();

    const [upvotes, setUpvotes] = useState(votes.filter(vote => vote.vote).length);
    const [downvotes, setDownvotes] = useState(votes.filter(vote => !vote.vote).length);

    const [voteByUser, setVoteByUser] = useState(votes.find(vote => vote.userId === userId));

    const voteReview = (type: "upvote" | "downvote") => {
        setError("");
        setSuccess("");

        startTransition(() => {
            VoteReview({ id: review.id, type })
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    setSuccess(data.success);
                    if (data.success && data.reviewVoteId) {
                        if (type === "upvote" && !voteByUser?.vote) {
                            setUpvotes(prevUpvotes => prevUpvotes + 1)
                            setDownvotes(prevDownvotes => prevDownvotes - 1)
                        } else if (type === "downvote" && voteByUser?.vote) {
                            setDownvotes(prevDownvotes => prevDownvotes + 1)
                            setUpvotes(prevUpvotes => prevUpvotes - 1)
                        }
                        setVoteByUser((prevVote) => ({ ...prevVote!, vote: type === "upvote" }))
                    }
                });
        });
    }

    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-bold mb-5 text-center">My Review</h2>
            <div className="flex justify-center items-center">
                <Badge className={`text-md font-bold text-center mb-3 ${review.rating >= 4.0 ? 'bg-green-700' : review.rating >= 3.0 ? 'bg-yellow-500' : 'bg-red-600'}`}>
                    {review.rating.toFixed(1)}/5.0
                </Badge>
            </div>
            <p className="text-justify mb-5">{review.review}</p>
            <div className="flex flex-row gap-x-3">
                <VoteButton type="upvote" votes={upvotes} func={() => voteReview("upvote")} active={voteByUser?.vote || false} />
                <VoteButton type="downvote" votes={downvotes} func={() => voteReview("downvote")} active={!voteByUser?.vote || false} />
            </div>
        </div>
    );
}

export default ShowReview;