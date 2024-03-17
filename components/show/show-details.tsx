"use client"
import { DEFAULT_IMAGE_URL } from "@/data/constants";
import { Show } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const ShowDetails = ({ show }: { show: Show }) => {
    return (
        <div className="mx-auto">
            <div className="flex justify-center items-center mt-5 mb-10">
                <Image src={show.image ? show.image : DEFAULT_IMAGE_URL} alt={show.title} width={200} height={200} />
            </div>
            <h1 className="text-4xl font-bold text-center mb-5">{show.title}</h1>
            <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center items-center mb-5">
                {show.genre.map((genre, index) => (
                    <Badge className="bg-orange-700" key={index}>{genre}</Badge>
                ))}
            </div>
            <div className="mb-5">
                <p className="mb-3 text-lg font-bold">Description:</p>
                <p className="mb-5">{show.description}</p>
                <p>Starring:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center mt-3 mb-5">
                    {show.cast.map((cast, index) => (
                        <Badge className="bg-indigo-700" key={index}>{cast}</Badge>
                    ))}
                </div>
                <p className="mb-3 text-lg font-bold">Details:</p>
                <ul className="list-disc pl-5">
                    <li><span className="font-bold">Release Year:</span> {show.releaseYear}</li>
                    <li><span className="font-bold">Number of Episodes:</span> {show.noOfEpisodes}</li>
                    <li><span className="font-bold">Number of Seasons:</span> {show.noOfSeasons}</li>
                    <li><span className="font-bold">Language:</span> {show.orgLanguage}</li>
                    <li><span className="font-bold">Country:</span> {show.country}</li>
                    <li><span className="font-bold">Network:</span> {show.network}</li>
                    <li><span className="font-bold">Director(s):</span> {show.director.join(", ")}</li>
                    <li><span className="font-bold">Writer(s):</span> {show.writer.join(", ")}</li>
                </ul>
            </div>
            <div className="mb-5">
                <p className="mb-3 text-lg font-bold">Links:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center">
                    {show.trailerLinks.map((link, index) => (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="underline" key={index}>Trailer {index + 1}</a>
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3 items-center mt-3">
                    {show.watchLinks.map((link, index) => (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="underline" key={index}>Watch {index + 1}</a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowDetails;