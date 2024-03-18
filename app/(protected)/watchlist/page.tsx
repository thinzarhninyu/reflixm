import Show from "@/components/show/show";
import { getWatchListByUserId } from "@/data/show";
import { auth } from "@clerk/nextjs";
import SearchBar from "@/components/show/search-bar";

const Watchlist = async () => {

    const { userId } = auth();

    if (!userId) {
        return null;
    }

    // const watchHistory = await getWatchHistoryByUserId(userId);
    const watchlist = await getWatchListByUserId(userId);

    if (!watchlist) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 lg:p-24">
            <h1 className="text-4xl font-bold text-center mb-10">Watchlist</h1>
            <SearchBar />
            <div className="flex flex-wrap mt-10">
                {watchlist && watchlist.map((show) => (
                    <div key={show.id} className="w-full sm:w-full md:w-full lg:w-1/3 p-2">
                        <Show key={show.id} show={show} />
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Watchlist;