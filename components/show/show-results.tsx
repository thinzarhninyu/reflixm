"use client"

import { useSearchParams } from 'next/navigation'
import SearchBar from './search-bar'
import ShowCard from './show'
import { Genre, Show } from '@prisma/client';
import { useEffect, useState } from 'react';

type ShowWithReview = Show & { review: { rating: number } | null };

const ShowResults = ({ shows }: { shows: ShowWithReview[] }) => {

    const searchParams = useSearchParams()
 
    const inputSearch = searchParams.get('search') 
    const inputGenre = searchParams.get('genre')

    const [search, setSearch] = useState(inputSearch ?? "");
    const [genre, setGenre] = useState<Genre>(inputGenre as Genre);

    const [filteredShows, setFilteredShows] = useState<ShowWithReview[]>(shows);

    useEffect(() => {
        const filteredShows = shows.filter(show => 
            (!search || show.title.toLowerCase().includes(search.toLowerCase())) &&
            (!genre || show.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase()))
        );
        setFilteredShows(filteredShows)
    }, [search, genre])

    return (
        <div>
            <SearchBar setSearch={setSearch} setGenre={setGenre} search={search} genre={genre} />
            <div className="flex flex-wrap mt-10">
                {filteredShows.map(show => (
                    <div key={show.id} className="w-full sm:w-full md:w-full lg:w-1/3 p-2">
                        <ShowCard key={show.id} show={show} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowResults;
