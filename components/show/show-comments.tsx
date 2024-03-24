"use client";
import type { Comment } from "@prisma/client";
import { CreateComment } from "@/actions/comment-create";
import { DeleteComment } from "@/actions/comment-delete";
import { CommentDeleteSchema, CommentSchema } from "@/schemas";
import { useTransition, useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Send, Trash } from "lucide-react";
import AlertBox from "../alert-box";
import { useAuth } from "@clerk/nextjs";

const ShowComments = ({ comments, reviewId }: { comments: Comment[], reviewId: string }) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [comment, setComment] = useState("");
    const { userId } = useAuth();
    const [showComments, setShowComments] = useState<Comment[]>(comments);

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
                    if (data.success) setShowComments((prevComments) => prevComments.filter((comment) => comment.id !== values.id));
                });
        });
    };

    return (
        <div className="mx-auto w-full rounded-lg border-2 pt-5">
            <h2 className="text-2xl font-bold mb-5 text-center">Comments</h2>
            <div className="mt-10">
                <ScrollArea className="h-[300px] flex flex-col gap-6 pb-5">
                    <AlertBox title="Heads up!" description="Our comments are anonymous. Please be respectful and kind to other users." />
                    {comments && (
                        <>
                            {showComments.length > 0 ? (
                                showComments.map((comment) => (
                                    <div key={comment.id} className="flex justify-between items-center space-x-4 p-5 text-left mx-5">
                                        <div className="flex flex-row gap-x-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={'https://github.com/shadcn.png'} />
                                                <AvatarFallback>Avatar</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col justify-center bg-gray-200 p-3 rounded-md">
                                                <p className="text-sm text-left mb-3">{comment.comment}</p>
                                                <p className="text-xs text-gray-600">{comment.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
                                            </div>
                                        </div>
                                        {userId === comment.userId && (
                                            <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDeleteComment({ id: comment.id })}>
                                                <Trash className="w-5 h-5 dark:text-white" />
                                            </Button>
                                        )}
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
                <div className="mx-5 flex flex-row gap-x-3 border-2 mb-5 px-3 rounded-md">
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                        className="border-0"
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