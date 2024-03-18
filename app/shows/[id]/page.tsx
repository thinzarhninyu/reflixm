import ShowComments from "@/components/show/show-comments";
import ShowDetails from "@/components/show/show-details";
import ShowReview from "@/components/show/show-review";
import { Separator } from "@/components/ui/separator";
import { getCommentsByReviewId, getShowById, getShowReviewById, getRelatedShows } from "@/data/show";
import Show from "@/components/show/show";

const ShowDetailsPage = async ({ params }: { params: { id: string } }) => {
    const show = await getShowById(params.id);
    const review = await getShowReviewById(params.id);

    if (!show) {
        return <div>No Show Found</div>
    }

    if (!review) {
        return <div>No Review Found</div>
    }

    const comments = await getCommentsByReviewId(review.id);

    const relatedShows = await getRelatedShows(show.id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 lg:p-24">
            <ShowDetails show={show} />
            <Separator className="my-10" />
            <ShowReview review={review} />
            <Separator className="my-10" />
            <h2 className="text-2xl font-bold mb-5">Related Shows</h2>
            <div className="flex flex-wrap mt-10">
                {relatedShows && relatedShows.length > 0 ? relatedShows.map((show) => (
                    <div key={show.id} className="w-full sm:w-full md:w-full lg:w-1/3 p-2">
                        <Show key={show.id} show={show} />
                    </div>
                )) : (
                    <div>No Related Shows Found</div>
                )}
            </div>
            <Separator className="my-10" />
            <ShowComments comments={comments!} reviewId={review.id} />
        </main>
    );
}

export default ShowDetailsPage;