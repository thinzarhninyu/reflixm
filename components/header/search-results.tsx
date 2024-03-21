import { CommandItem } from '@/components/ui/command';
import { Show } from '@prisma/client';
import Link from 'next/link';

const ShowResults = ({ shows }: { shows: Show[] }) => {

    return (
        <>
            {shows.map((show) => (
                <Link href={`/shows/${show.id}`} key={show.id}>
                    <CommandItem className="flex justify-between mb-2 dark:hover:bg-gray-500">
                        <p>{show.title}</p>
                        <span className="font-light">
                            ({show.releaseYear})
                        </span>
                    </CommandItem>
                </Link>
            ))}
        </>
    )

}

export default ShowResults;