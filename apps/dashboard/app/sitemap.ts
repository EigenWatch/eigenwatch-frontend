import { MetadataRoute } from "next";

// This is a basic sitemap. For a production app with thousands of dynamic pages,
// you would want to generate this dynamically by fetching IDs from your API.
// Since I don't have direct access to the API to fetch all IDs right now,
// I will create a static structure that can be easily extended.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dashboard.eigenwatch.xyz";

  // Static routes
  const routes = [
    "",
    "/operator",
    "/avs",
    "/strategy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
