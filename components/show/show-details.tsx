"use client"
import { DEFAULT_IMAGE_URL } from "@/data/constants";
import { Show } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ShowDetails = ({ show }: { show: Show }) => {
    return (
        <div className="mx-auto">
            <div className="flex justify-center items-center mt-5 mb-10">
                <Image src={show.image ? show.image : DEFAULT_IMAGE_URL} alt={show.title} width={700} height={200} />
            </div>
            <h1 className="text-4xl font-bold text-center mb-5">{show.title} ({show.releaseYear})</h1>
            {/* <div className="sharethis-inline-share-buttons"></div> */}
            <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center items-center mb-5">
                {show.genre.map((genre, index) => (
                    <Badge className="bg-orange-700" key={index}>{genre}</Badge>
                ))}
            </div>
            <div className="mb-5">
                <p className="mb-3 text-lg font-bold">Description:</p>
                <p className="mb-5 text-justify">{show.description}</p>
                <p>Starring:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center mt-3 mb-5">
                    {show.cast.map((cast, index) => (
                        <Badge className="bg-indigo-700" key={index}>{cast}</Badge>
                    ))}
                </div>
                <p className="mb-3 text-lg font-bold">Details:</p>
                <ul className="list-disc pl-5">
                    <li><span>Number of Episodes:</span> {show.noOfEpisodes}</li>
                    <li><span>Number of Seasons:</span> {show.noOfSeasons}</li>
                    <li><span>Language:</span> {show.orgLanguage}</li>
                    <li><span>Country:</span> {show.country}</li>
                    <li><span>Network:</span> {show.network}</li>
                    <li><span>Director(s):</span> {show.director.join(", ")}</li>
                    <li><span>Writer(s):</span> {show.writer.join(", ")}</li>
                </ul>
            </div>
            <div className="mb-5">
                <p className="mb-3 text-lg font-bold">Trailer:</p>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe src={show.trailerLinks[0]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="mb-5">
                <p className="mb-3 text-lg font-bold">Watch Links:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center mt-3">
                    {show.watchLinks.map((link, index) => (
                        <Link href={link} target="_blank" rel="noopener noreferrer" className="underline" key={index}>
                            {/* Watch {index + 1} */}
                            {link.includes('viki') ? 'Viki' :
                                link.includes('netflix') ? 'Netflix' :
                                    link.includes('viu') ? 'VIU' :
                                        link.includes('wetv') ? 'WeTV' :
                                            link.includes('youtube') ? 'YouTube' :
                                                link.includes('amazon') ? 'Amazon' :
                                                    link.includes('disney') ? 'Disney' :
                                                        link.includes('hulu') ? 'Hulu' :
                                                            link.includes('hbo') ? 'HBO' :
                                                                link.includes('apple') ? 'Apple' :
                                                                    link.includes('hotstar') ? 'Hotstar' :
                                                                        'Other'}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowDetails;