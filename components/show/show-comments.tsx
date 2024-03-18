"use client"

import type { Comment } from "@prisma/client";
import { CreateComment } from "@/actions/comment-create";
import { DeleteComment } from "@/actions/comment-delete";
import { CommentDeleteSchema, CommentSchema } from "@/schemas";
import { useTransition, useState } from "react";
import z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getShowReviewById } from "@/data/show";
import { comment } from "postcss";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";

const ShowComments = ({ comments, reviewId }: { comments: Comment[], reviewId: string }) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [comment, setComment] = useState("");

    const onAddComment = (values: z.infer<typeof CommentSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            CreateComment(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    setComment("");
                });
        });
    };

    const onDeleteComment = (values: z.infer<typeof CommentDeleteSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            DeleteComment(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    return (
        <div className="mx-auto w-full rounded-lg border-2 pt-5">
            <h2 className="text-2xl font-bold mb-5 text-center">Comments</h2>
            <div className="mt-10">
                {/* <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10 text-center dark:text-white">Comments</h2> */}
                <ScrollArea className="h-[200px] flex flex-col gap-6 pb-5">
                    {comments && (
                        <>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="flex justify-start items-center space-x-4 p-5 text-left mx-5">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={'https://github.com/shadcn.png'} />
                                            <AvatarFallback>Avatar</AvatarFallback>
                                        </Avatar>
                                        <div className="flex items-center">
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center">
                                    <p className="text-gray-600 mt-20 dark:text-gray-200">No comments yet</p>
                                </div>
                            )}
                        </>
                    )}
                </ScrollArea>
                <div className="mx-5 flex flex-row gap-x-3">
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                        className="md p-5 mb-5"
                    />
                    <Button className="mt-5 bg-indigo-600 hover:bg-indigo-700" onClick={() => onAddComment({ reviewId: reviewId, comment: comment })}>
                        <Send className="w-5 h-5 dark:text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ShowComments;