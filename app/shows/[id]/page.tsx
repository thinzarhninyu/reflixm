import ShowComments from "@/components/show/show-comments";
import ShowDetails from "@/components/show/show-details";
import ShowReview from "@/components/show/show-review";
import { Separator } from "@/components/ui/separator";
import { getCommentsByReviewId, getShowById, getShowReviewById, getRelatedShows, getWatchListByUserId, getWatchHistoryByUserId } from "@/data/show";
import { auth } from "@clerk/nextjs";
import ShowList from "@/components/show/show-list";

const ShowDetailsPage = async ({ params }: { params: { id: string } }) => {
    const show = await getShowById(params.id);
    const review = await getShowReviewById(params.id);

    const { userId } = auth();

    if (!show) {
        return <div>No Show Found</div>
    }

    if (!review) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-10 lg:p-24">
                <div>No Review Found</div>
            </main>
        )
    }

    const comments = await getCommentsByReviewId(review.review.id);

    const relatedShows = await getRelatedShows(show.id);

    console.log(relatedShows)

    const watchlist = await getWatchListByUserId(userId!);
    const watchHistory = await getWatchHistoryByUserId(userId!);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 lg:p-24">
            <ShowDetails show={show} />
            <Separator className="my-10" />
            <ShowReview review={review.review} votes={review.votes} />
            <Separator className="my-10" />
            <h2 className="text-2xl font-bold mb-5">Suggested Shows</h2>
            <div className="flex flex-wrap mt-10">
                {relatedShows && relatedShows.length > 0 ? <ShowList shows={relatedShows} watchHistory={watchHistory!} watchList={watchlist!} /> : <div>No Related Shows Found</div>}
            </div>
            <Separator className="my-10" />
            <ShowComments comments={comments!} reviewId={review.review.id} />
        </main>
    );
}

export default ShowDetailsPage;