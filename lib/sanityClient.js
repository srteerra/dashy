import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "5q12e41v",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "sk56jSsjgGdGhzECy4o8XydNfwTVH3QCJMyy9bfkkkT2ZH4Iiv9mE9QN38v7SHrvETBuIJASqDCzCpE0p6Tp9UKN5MrOtMednZOb7w3Yw7cFODbEjUttiGnX6RY8PrFg1DuG6Fv2GSAoA5X2OIwVnBoeUFd0unEROwslJ7tJnATCjUPRReyf",
  useCdn: false,
});
