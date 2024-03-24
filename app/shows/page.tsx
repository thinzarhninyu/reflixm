import { getShows, getWatchHistoryByUserId, getWatchListByUserId } from "@/data/show";
import ShowResults from "@/components/show/show-results";
import { auth } from "@clerk/nextjs";

const AllShows = async () => {

    const {userId} = auth();
    
    const shows = await getShows();

    const watchlist = await getWatchListByUserId(userId!);
    const watchHistory = await getWatchHistoryByUserId(userId!);

    if (!shows) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col p-10 lg:p-24">
            <h1 className="text-4xl font-bold text-center mb-10">All Shows</h1>
            <ShowResults shows={shows} watchList={watchlist!} watchHistory={watchHistory!} />
        </main>
    );
}

export default AllShows;