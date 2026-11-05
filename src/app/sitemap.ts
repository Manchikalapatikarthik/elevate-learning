
import type { MetadataRoute } from "next";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://www.elevateorbit.in";
const APP_DIRECTORY = path.join(process.cwd(), "src", "app");

const EXCLUDED_SEGMENTS = new Set([
  "api",
  "admin",
  "dashboard",
  "login",
  "signup",
  "register",
  "forgot-password",
  "reset-password",
  "account",
  "settings",
]);

const PAGE_FILE_REGEX = /^page\.(tsx|ts|jsx|js)$/;

function isRouteGroup(segment: string) {
  return segment.startsWith("(") && segment.endsWith(")");
}

function isDynamicSegment(segment: string) {
  return segment.startsWith("[") && segment.endsWith("]");
}

async function collectRoutes(
  directory: string,
  routeSegments: string[] = []
): Promise<MetadataRoute.Sitemap> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const routes: MetadataRoute.Sitemap = [];

  const pageFile = entries.find(
    (entry) => entry.isFile() && PAGE_FILE_REGEX.test(entry.name)
  );

  const excludedRoute = routeSegments.some((segment) =>
    EXCLUDED_SEGMENTS.has(segment.toLowerCase())
  );

  const dynamicRoute = routeSegments.some(isDynamicSegment);

  if (pageFile && !excludedRoute && !dynamicRoute) {
    const publicSegments = routeSegments.filter(
      (segment) => !isRouteGroup(segment)
    );

    const routePath = publicSegments.length
      ? `/${publicSegments.join("/")}`
      : "/";

    const filePath = path.join(directory, pageFile.name);
    const fileStats = await stat(filePath);

    let priority = 0.6;
    let changeFrequency: "weekly" | "monthly" = "monthly";

    if (routePath === "/") {
      priority = 1;
      changeFrequency = "weekly";
    } else if (
      routePath === "/notes" ||
      routePath.startsWith("/blog")
    ) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (routePath.startsWith("/notes/")) {
      priority = 0.75;
    }

    routes.push({
      url: `${BASE_URL}${routePath}`,
      lastModified: fileStats.mtime,
      changeFrequency,
      priority,
    });
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    if (
      entry.name.startsWith(".") ||
      entry.name.startsWith("_") ||
      entry.name.startsWith("@")
    ) {
      continue;
    }

    if (EXCLUDED_SEGMENTS.has(entry.name.toLowerCase())) {
      continue;
    }

    const childRoutes = await collectRoutes(
      path.join(directory, entry.name),
      [...routeSegments, entry.name]
    );

    routes.push(...childRoutes);
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const discoveredRoutes = await collectRoutes(APP_DIRECTORY);

  const uniqueRoutes = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const route of discoveredRoutes) {
    uniqueRoutes.set(route.url, route);
  }

  return Array.from(uniqueRoutes.values()).sort((a, b) =>
    a.url.localeCompare(b.url)
  );
}
