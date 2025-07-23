import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // ... existing config options
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-gfm")],
    rehypePlugins: [
      require("rehype-slug"),
      require("rehype-autolink-headings"),
      require("rehype-highlight"),
      require("rehype-figure"),
      // require("rehype-callout"), // If you want callouts, use a compatible plugin
    ],
    providerImportSource: "@mdx-js/react",
  },
})(nextConfig);
