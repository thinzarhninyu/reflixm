import Show from "@/components/show/show";
import { getWatchHistoryByUserId } from "@/data/show";
import { auth } from "@clerk/nextjs";
import SearchBar from "@/components/show/search-bar";

const WatchHistory = async () => {

    const {userId} = auth();

    if (!userId) {
        return null;
    }

    const watchHistory = await getWatchHistoryByUserId(userId);

    if (!watchHistory) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col justify-between p-24">
            <h1 className="text-4xl font-bold text-center mb-10">Watch History</h1>
            <SearchBar />
            <div className="flex flex-wrap mt-10">
                {watchHistory && watchHistory.map((show) => (
                    <div key={show.id} className="w-full sm:w-1/3 p-2">
                        <Show key={show.id} show={show} />
                    </div>
                ))}
            </div>
        </main>
    );
}

export default WatchHistory;