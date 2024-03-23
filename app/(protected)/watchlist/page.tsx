import { getWatchHistoryByUserId, getWatchListByUserId } from "@/data/show";
import { auth } from "@clerk/nextjs";
import SearchBar from "@/components/show/search-bar";
import ShowList from "@/components/show/show-list";

const Watchlist = async () => {

    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const watchHistory = await getWatchHistoryByUserId(userId);
    const watchlist = await getWatchListByUserId(userId);

    if (!watchlist) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 lg:p-24">
            <h1 className="text-4xl font-bold text-center mb-10">Watchlist</h1>
            <SearchBar />
            <div className="flex flex-wrap mt-10">
                {watchlist && <ShowList shows={watchlist} watchHistory={watchHistory!} watchList={watchlist} />}
            </div>
        </main>
    );
}

export default Watchlist;