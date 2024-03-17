"use client"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Show } from "@prisma/client";

const HeaderSearch = ({ shows }: { shows: Show[] }) => {

    const [search, setSearch] = useState("");

    const [showResults, setShowResults] = useState<Show[]>(shows ?? []);

    useEffect(() => {
        setShowResults(shows ?? []);
    }, [shows]);

    useEffect(() => {
        if (search) {
            setShowResults(shows?.filter((show: Show) => show?.title?.toLowerCase().includes(search.toLowerCase())) ?? []);
        } else {
            setShowResults(shows ?? []);
            setSearch("");
        }
    }, [search, shows]);

    return (

        <Command className="border-1 border-gray-200 dark:bg-gray-900 dark:text-white"
        >
            <CommandInput
                placeholder="Search"
                value={search}
                onValueChange={(e) => setSearch(e)}
            />
            {search && search.length > 0 && (
                <CommandList className="absolute z-10 top-16 left-30 bg-white dark:bg-gray-800 p-3 rounded-lg w-[200px] lg:w-[300px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Shows">
                        {showResults.map((show) => (
                            <Link href={`/shows/${show.id}`} key={show.id}>
                                <CommandItem className="flex justify-between mb-2 dark:hover:bg-gray-500">
                                    <p>{show.title}</p>
                                    {/* <span className="font-light">
                                        {users?.find((user) => user.id === project.createdById)?.name}
                                    </span> */}
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </CommandList>
            )
            }
        </Command>
    )
}

export default HeaderSearch;