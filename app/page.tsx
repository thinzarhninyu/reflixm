import { getLatestRatedShow, getHighestRatedShows } from "@/data/show";
import SearchBar from "@/components/show/search-bar";
import ShowCard from "@/components/show/show";
import Link from "next/link";
import LatestShow from "@/components/show/latest-show";
import { APP_NAME } from "@/data/constants";
import { ArrowRightCircle } from "lucide-react";

const Home = async () => {

  const latestRatedShow = await getLatestRatedShow();
  const highestRatedShows = await getHighestRatedShows();

  return (
    <main className="flex min-h-screen flex-col p-10 lg:p-24">
      <h1 className="text-4xl font-bold text-center mb-10">Welcome to {APP_NAME}</h1>
      <SearchBar />
      <div className="mt-16 mb-10">
        <h2 className="text-2xl font-bold mb-5 text-center">Latest Review</h2>
        <div className='w-full flex justify-center items-center'>
          {latestRatedShow && <LatestShow show={latestRatedShow} />}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center lg:px-10 mb-5">
          <h2 className="text-2xl font-bold">Best Reviews</h2>
          <Link className="hover:underline flex flex-row gap-x-3 justify-center items-center" href="/shows">
            <span>View All</span>
            <ArrowRightCircle className="w-4 h-4"/>
          </Link>
        </div>
        <div className="flex flex-wrap">
          {highestRatedShows && highestRatedShows.map((show) => (
            <div key={show.id} className="w-full sm:w-full md:w-full lg:w-1/3 p-2">
              <ShowCard show={show} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;