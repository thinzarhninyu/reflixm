"use client"

import { Review } from "@prisma/client";
import { Badge } from "../ui/badge";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";

const ShowReview = ({ review }: { review: Review }) => {

    return (
        <div>
            <h2 className="text-2xl font-bold mb-5 text-center">My Review</h2>
            <div className="flex justify-center items-center">
                <Badge className={`text-md font-bold text-center mb-3 ${review.rating >= 4.0 ? 'bg-green-700' : review.rating >= 3.0 ? 'bg-yellow-500' : 'bg-red-600'}`}>
                    {review.rating.toFixed(1)}/5.0
                </Badge>
            </div>
            <p className="text-justify mb-5">{review.review}</p>
            <div className="flex flex-row gap-x-3">
                <Button variant="outline" className="flex flex-row gap-x-3">
                    <ThumbsUp className="w-4 h-4" />
                    <p>{review.upvotes ?? 0}</p>
                </Button>
                <Button variant="outline" className="flex flex-row gap-x-3">
                    <ThumbsDown className="w-4 h-4" />
                    <p>{review.downvotes ?? 0}</p>
                </Button>
            </div>
        </div>
    );
}

export default ShowReview;