import { getWatchHistoryByUserId, getWatchListByUserId } from "@/data/show";
import { auth } from "@clerk/nextjs";
import SearchBar from "@/components/show/search-bar";
import ShowList from "@/components/show/show-list";

const WatchHistory = async () => {

    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const watchHistory = await getWatchHistoryByUserId(userId);
    const watchList = await getWatchListByUserId(userId);

    if (!watchHistory) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-10 lg:p-24">
            <h1 className="text-4xl font-bold text-center mb-10">Watch History</h1>
            <SearchBar />
            <div className="flex flex-wrap mt-10">
                {watchHistory && <ShowList shows={watchHistory} watchList={watchList!} watchHistory={watchHistory} />}
            </div>
        </main>
    );
}

export default WatchHistory;