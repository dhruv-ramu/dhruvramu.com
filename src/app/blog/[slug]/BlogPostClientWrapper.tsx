"use client";
import dynamic from "next/dynamic";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const BlogPostClient = dynamic(() => import("../BlogPostClient"), { ssr: false });

interface PostMeta {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  slug: string;
}

interface Props {
  post: PostMeta;
  mdxSource: MDXRemoteSerializeResult;
  related: PostMeta[];
}

export default function BlogPostClientWrapper(props: Props) {
  return <BlogPostClient {...props} />;
} 