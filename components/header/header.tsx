import Image from "next/image";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { APP_LOGO, APP_NAME } from "@/data/constants";
import HeaderSearch from "@/components/header/search";
import { getShows } from "@/data/show";

import { auth } from "@clerk/nextjs";

const Header = async () => {

    const { userId } = auth();

    const shows = await getShows();

    return (
        <header className="bg-white dark:bg-gray-900 drop-shadow-lg sticky top-0 z-5 py-2">
            <nav className="mx-auto flex items-center justify-between p-2 lg:px-10" aria-label="Global">
                <div className="flex items-center flex-row gap-x-3">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">ReFlix</span>
                        <Image src={APP_LOGO} alt="logo" width={50} height={50} />
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" className="text-sm font-bold leading-6 text-gray-900 dark:text-white">{APP_NAME}</Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white">
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <HeaderSearch shows={shows!} />
                    {!userId && <Link href="/sign-in">Sign In</Link>}
                </div>
            </nav>
        </header >
    );
}

export default Header;