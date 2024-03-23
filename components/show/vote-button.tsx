"use client"

import React from "react";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const VoteButton = ({ type, votes, func, active }: { type: "upvote" | "downvote"; votes: number, func: () => void; active: boolean}) => {

    return (
        <Button variant="outline" className="flex flex-row gap-x-3" onClick={func}>
            {type === "upvote" ? <ThumbsUp className={`w-4 h-4 ${active ? 'text-green-500' : 'text-gray-500'}`} /> : <ThumbsDown className={`w-4 h-4 ${active ? 'text-red-500' : 'text-gray-500'}`} />}
            <p>{votes}</p>
        </Button>
    )

};

export default VoteButton;