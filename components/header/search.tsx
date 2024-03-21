"use client"

import { Command, CommandEmpty, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Show } from "@prisma/client";
import { useState, useEffect } from "react";
import ShowResults from "./search-results";


const HeaderSearch = ({ shows = [] }: { shows: Show[] }) => {

    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState<Show[]>(shows ?? []);

    useEffect(() => {
        if (search && search.length > 0) {
            setShowResults(shows?.filter((show: Show) => show?.title?.toLowerCase().includes(search.toLowerCase())) ?? []);
        } else {
            setShowResults(shows ?? []);
        }
        console.log(search)
    }, [search, shows]);

    useEffect(() => {
        console.log(showResults);
    }, [showResults]);

    return (
        <Command className="border-1 border-gray-200 dark:bg-gray-900 dark:text-white">
            <CommandInput
                placeholder="Search"
                value={search}
                onValueChange={setSearch}
            />
            {search && (
                <CommandList className="absolute z-10 top-16 left-30 bg-white dark:bg-gray-800 p-3 rounded-lg w-[200px] lg:w-[300px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Shows">
                        <ShowResults key={search} shows={showResults} />
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    );
}

export default HeaderSearch;
