import type { Metadata } from "next";
import { SlicesGallery } from "@/components/SlicesGallery";

export const metadata: Metadata = {
  title: "Slices of Life",
  description:
    "Photographs of friends, adventures, and the in-between moments.",
};

export default function SlicesPage() {
  return <SlicesGallery />;
}
