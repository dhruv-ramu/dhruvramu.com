import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { mdxComponents } from "@/components/MDXComponents";

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
