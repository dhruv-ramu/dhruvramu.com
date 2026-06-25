export interface LifeSlice {
  id: string;
  /** Path under /public, e.g. /slices/beach.jpg */
  src?: string;
  alt: string;
  caption: string;
  /** Tailwind grid span classes for masonry layout */
  span?: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
}

export const lifeSlices: LifeSlice[] = [
  {
    id: "friends-dinner",
    alt: "Dinner with friends",
    caption: "Late-night debriefs over food",
    span: "md:col-span-2",
    aspect: "landscape",
  },
  {
    id: "sunset-hike",
    alt: "Sunset hike",
    caption: "Trail miles, good conversation",
    aspect: "portrait",
  },
  {
    id: "coffee-shop",
    alt: "Coffee shop corner",
    caption: "Where half my essays start",
    aspect: "square",
  },
  {
    id: "concert",
    alt: "Live music",
    caption: "Small venues, loud speakers",
    aspect: "portrait",
  },
  {
    id: "beach-day",
    alt: "Beach day",
    caption: "San Diego winters",
    span: "md:col-span-2",
    aspect: "wide",
  },
  {
    id: "road-trip",
    alt: "Road trip",
    caption: "Playlist on, windows down",
    aspect: "landscape",
  },
];
