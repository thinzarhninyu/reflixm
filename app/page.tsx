import Image from "next/image";

import { getLatestRatedShow, getHighestRatedShows } from "@/data/show";
import SearchBar from "@/components/show/search-bar";
import Show from "@/components/show/show";
import Link from "next/link";
import LatestShow from "@/components/show/latest-show";
import { APP_NAME } from "@/data/constants";

const Home = async () => {

  const latestRatedShow = await getLatestRatedShow();
  const highestRatedShows = await getHighestRatedShows();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-4xl font-bold text-center mb-10">Welcome to {APP_NAME}</h1>
        <SearchBar />
      </div>
      <div className="mt-5 mb-10">
        <h2 className="text-2xl font-bold mb-5 text-center">Latest Review</h2>
        <div className='w-full flex justify-center items-center'>
          {latestRatedShow && <LatestShow show={latestRatedShow} />}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center px-10">
          <h2 className="text-2xl font-bold mb-5">Highest Rated Shows</h2>
          <Link className="hover:underline" href="/shows">View All</Link>
        </div>
        <div className="flex flex-wrap">
          {highestRatedShows && highestRatedShows.map((show) => (
            <div key={show.id} className="w-full sm:w-1/3 p-2">
              <Show show={show} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;