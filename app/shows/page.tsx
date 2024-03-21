// import SearchBar from "@/components/show/search-bar";
import { getShows } from "@/data/show";
// import ShowCard from "@/components/show/show";
import ShowResults from "@/components/show/show-results";

const AllShows = async ({ searchParams }: { searchParams: any }) => {
    
    const shows = await getShows();

    if (!shows) {
        return <div>No Shows Found</div>
    }

    // const genre = searchParams.genre;
    // const search = searchParams.search;

    return (
        <main className="flex min-h-screen flex-col p-10 lg:p-24">
            <h1 className="text-4xl font-bold text-center mb-10">All Shows</h1>
            <ShowResults shows={shows} />
        </main>
    );
}

export default AllShows;