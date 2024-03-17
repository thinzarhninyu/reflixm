// import { PrismaClient, Type, Genre } from "@prisma/client";

// const prisma = new PrismaClient();

// async function seedHarryPotterShows() {
//     const defaultImageUrl =
//         "https://res.cloudinary.com/ddoajstil/image/upload/v1687530382/review-site/product_default_image_spmwnx.png";

//     const harryPotterShowsData = [
//         {
//             title: "Harry Potter and the Philosopher's Stone",
//             type: Type.movie,
//             genre: [Genre.fantasy],
//             description: "The first installment of the Harry Potter series.",
//             cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
//             releaseYear: 2001,
//             noOfEpisodes: 1,
//             noOfSeasons: 1,
//             orgLanguage: "English",
//             country: "UK",
//             network: "Warner Bros.",
//             director: ["Chris Columbus"],
//             writer: ["J.K. Rowling", "Steve Kloves"],
//             trailerLinks: ["https://www.youtube.com/watch?v=eKSB0gXl9dw"],
//             watchLinks: ["https://www.amazon.com/dp/B0192CTMUU"],
//             image: defaultImageUrl,
//         },
//         {
//             title: "Harry Potter and the Chamber of Secrets",
//             type: Type.movie,
//             genre: [Genre.fantasy],
//             description: "The second installment of the Harry Potter series.",
//             cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
//             releaseYear: 2002,
//             noOfEpisodes: 1,
//             noOfSeasons: 1,
//             orgLanguage: "English",
//             country: "UK",
//             network: "Warner Bros.",
//             director: ["Chris Columbus"],
//             writer: ["J.K. Rowling", "Steve Kloves"],
//             trailerLinks: ["https://www.youtube.com/watch?v=1bq0qff4iF8"],
//             watchLinks: ["https://www.amazon.com/dp/B0192CTMUU"],
//             image: defaultImageUrl,
//         },
//         // Add more data for other Harry Potter movies or shows
//     ];

//     for (const showData of harryPotterShowsData) {
//         await prisma.show.create({
//             data: showData,
//         });
//     }
// }

// seedHarryPotterShows()
//     .catch((error) => {
//         console.error("Error seeding Harry Potter shows:", error);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function seedReviews() {
//   const reviewData = [
//     {
//       showId: "cltv7q4hn00008l1j42q21lc9",
//       rating: 4,
//       review: "Great show! Really enjoyed the plot and characters.",
//     },
//     {
//       showId: "cltv7q4i200018l1jgfeg25ov",
//       rating: 5,
//       review: "Absolutely fantastic! A must-watch for all Harry Potter fans.",
//     },
//     // Add more review data as needed
//   ];

//   for (const data of reviewData) {
//     await prisma.review.create({
//       data,
//     });
//   }
// }

// seedReviews()
//   .catch((error) => {
//     console.error("Error seeding reviews:", error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import { PrismaClient, Type, Genre } from "@prisma/client";

// const prisma = new PrismaClient();

// async function seedTwilightShows() {
//   const defaultImageUrl =
//     "https://res.cloudinary.com/ddoajstil/image/upload/v1687530382/review-site/product_default_image_spmwnx.png";

//   const twilightShowsData = [
//     {
//       title: "Twilight",
//       type: Type.movie,
//       genre: [Genre.fantasy, Genre.romance],
//       description: "The first movie in the Twilight saga.",
//       cast: ["Kristen Stewart", "Robert Pattinson", "Taylor Lautner"],
//       releaseYear: 2008,
//       noOfEpisodes: 1,
//       noOfSeasons: 1,
//       orgLanguage: "English",
//       country: "USA",
//       network: "Summit Entertainment",
//       director: ["Catherine Hardwicke"],
//       writer: ["Melissa Rosenberg", "Stephenie Meyer"],
//       trailerLinks: ["https://www.youtube.com/watch?v=uxFJvlWPeHs"],
//       watchLinks: ["https://www.amazon.com/dp/B001GZ6QEC"],
//       image: defaultImageUrl,
//     },
//     {
//       title: "Twilight: New Moon",
//       type: Type.movie,
//       genre: [Genre.fantasy, Genre.romance],
//       description: "The second movie in the Twilight saga.",
//       cast: ["Kristen Stewart", "Robert Pattinson", "Taylor Lautner"],
//       releaseYear: 2009,
//       noOfEpisodes: 1,
//       noOfSeasons: 1,
//       orgLanguage: "English",
//       country: "USA",
//       network: "Summit Entertainment",
//       director: ["Chris Weitz"],
//       writer: ["Melissa Rosenberg", "Stephenie Meyer"],
//       trailerLinks: ["https://www.youtube.com/watch?v=BNi-ebCWXos"],
//       watchLinks: ["https://www.amazon.com/dp/B001M5UDGS"],
//       image: defaultImageUrl,
//     },
//     // Add more data for other Twilight movies or shows
//   ];

//   for (const showData of twilightShowsData) {
//     await prisma.show.create({
//       data: showData,
//     });
//   }
// }

// seedTwilightShows()
//   .catch((error) => {
//     console.error("Error seeding Twilight shows:", error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedReviews() {
  const reviewData = [
    {
      showId: "cltv88a0t0000omwg2lwnh9qa",
      rating: 4,
      review: "Enjoyed this show a lot! Great storyline and characters.",
    },
    {
      showId: "cltv88a150001omwgl77eltt4",
      rating: 5,
      review: "Absolutely amazing show! Loved every minute of it.",
    },
  ];

  for (const data of reviewData) {
    await prisma.review.create({
      data,
    });
  }
}

seedReviews()
  .catch((error) => {
    console.error("Error seeding reviews:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
