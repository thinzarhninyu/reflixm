import ShowComments from "@/components/show/show-comments";
import ShowDetails from "@/components/show/show-details";
import ShowReview from "@/components/show/show-review";
import { Separator } from "@/components/ui/separator";
import { getCommentsByReviewId, getShowById, getShowReviewById } from "@/data/show";

const Show = async ({ params }: { params: { id: string } }) => {
    const show = await getShowById(params.id);
    const review = await getShowReviewById(params.id);

    if (!show) {
        return <div>No Show Found</div>
    }

    if (!review) {
        return <div>No Review Found</div>
    }

    const comments = await getCommentsByReviewId(review.id);

    return (
        <main className="flex min-h-screen flex-col justify-between p-24">
            <ShowDetails show={show} />
            <Separator className="my-10" />
            <ShowReview review={review} />
            <Separator className="my-10" />
            <ShowComments comments={comments!} reviewId={review.id} />
        </main>
    );
}

export default Show;