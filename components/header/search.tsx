"use client"

import { Command, CommandEmpty, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import Link from "next/link";
import { Show } from "@prisma/client";
import { useState, useEffect } from "react";


const HeaderSearch = ({ shows }: { shows: Show[] }) => {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState<Show[]>(shows ?? []);

    useEffect(() => {
        if (search && search.length > 0) {
            setShowResults(shows?.filter((show: Show) => show?.title?.toLowerCase().includes(search.toLowerCase())) ?? []);
        } else {
            setShowResults(shows ?? []);
        }
    }, [search]);

    useEffect(() => {
        console.log(showResults);
    }, [showResults]);

    return (
        <Command className="border-1 border-gray-200 dark:bg-gray-900 dark:text-white">
            <CommandInput
                placeholder="Search"
                value={search}
                onValueChange={(e) => setSearch(e)}
            />
            {search && search.length > 0 && (
                <CommandList className="absolute z-10 top-16 left-30 bg-white dark:bg-gray-800 p-3 rounded-lg w-[200px] lg:w-[300px]">
                    {showResults && showResults.length === 0 ? (
                        <CommandEmpty>No results found.</CommandEmpty>
                    ) : (
                        <CommandGroup heading="Shows">
                            {showResults.map((show) => (
                                <Link href={`/shows/${show.id}`} key={show.id}>
                                    <CommandItem className="flex justify-between mb-2 dark:hover:bg-gray-500">
                                        <p>{show.title}</p>
                                        <span className="font-light">
                                            ({show.releaseYear})
                                        </span>
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            )}
        </Command>
    );
}

export default HeaderSearch;
