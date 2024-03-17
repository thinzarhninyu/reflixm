import SearchBar from "@/components/show/search-bar";
import Show from "@/components/show/show";
import { getShows } from "@/data/show";

const AllShows = async () => {
    const shows = await getShows();

    if (!shows) {
        return <div>No Shows Found</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold text-center mb-10">All Shows</h1>
            <SearchBar />
            <div className="flex flex-wrap mt-10">
                {shows && shows.map((show) => (
                    <div key={show.id} className="w-full sm:w-1/3 p-2">
                        <Show key={show.id} show={show} />
                    </div>
                ))}
            </div>
        </main>
    );
}

export default AllShows;