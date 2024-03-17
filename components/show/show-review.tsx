"use client"

import { Review } from "@prisma/client";

const ShowReview = ({ review }: { review: Review }) => {

    return (
        <div>
            <h2 className="text-2xl font-bold mb-5 text-center">My Review</h2>
            <p className="text-justify">{review.review}</p>
        </div>
    );
}

export default ShowReview;