import type { UserConfig } from "@11ty/eleventy";
import { execSync } from "node:child_process";

export default function (eleventyConfig: UserConfig) {
  eleventyConfig.on("eleventy.before", () => {
    execSync(
      "node_modules/.bin/esbuild src/assets/ts/blog.ts --bundle --outfile=src/assets/js/blog.js --format=iife --target=es2020",
      { stdio: "inherit" }
    );
  });

  // dist.css is built by Tailwind CLI before 11ty runs; rename to style.css in output
  eleventyConfig.addPassthroughCopy({ "src/assets/css/dist.css": "assets/css/style.css" });
  eleventyConfig.addPassthroughCopy("src/assets/js");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").reverse()
  );

  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Set<string>();
    api.getAll().forEach((item) => {
      ((item.data as Record<string, unknown>).tags as string[] | undefined)?.forEach((tag) => {
        if (tag !== "posts") tags.add(tag);
      });
    });
    return [...tags].sort();
  });

  eleventyConfig.addFilter("formatDate", (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  );

  eleventyConfig.addFilter("htmlDateString", (date: Date) =>
    date.toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("slugify", (str: string) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
