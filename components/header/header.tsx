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

import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { Heart, History } from "lucide-react";

const Header = async () => {

    const { userId } = auth();

    const shows = await getShows();

    return (
        <header className="bg-white dark:bg-gray-900 drop-shadow-lg py-2">
            <nav className="w-full flex items-center justify-between p-2 lg:px-10" aria-label="Global">
                <div className="w-full flex items-center justify-between flex-row gap-x-3">
                    <div className="flex flex-row gap-x-3 items-center">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">ReFlix</span>
                            <Image src={APP_LOGO} alt="logo" width={50} height={50} />
                        </Link>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href="/" className="text-sm font-bold leading-6 text-gray-900 dark:text-white">{APP_NAME}</Link>
                                </TooltipTrigger>
                                <TooltipContent className="">
                                    <p>Home</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="w-50">
                        {shows && <HeaderSearch shows={shows} />}
                    </div>
                    <div className="flex flex-row gap-x-5 justify-center items-center">
                        {userId && (
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href="/watchlist" className="-m-1.5 p-1.5">
                                                <span className="sr-only">Watchlist</span>
                                                <Heart size={24} />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="">
                                            <p>Watchlist</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href="/watch-history" className="-m-1.5 p-1.5">
                                                <span className="sr-only">Watch History</span>
                                                <History size={24} />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="">
                                            <p>Watch History</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                        )}
                        {!userId ? <SignInButton /> : <UserButton />}
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default Header;