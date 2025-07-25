/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

// import { NextStudio } from "next-sanity/studio";
// import config from "../../../../sanity.config";
// export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

// This file is temporarily disabled due to build errors with Sanity Studio in Next.js 15
export default function StudioPage() {
  return null;
}