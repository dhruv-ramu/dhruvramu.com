export interface LifeSlice {
  id: string;
  filename: string;
  alt: string;
  caption: string;
  span?: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  /** Renders as a smaller tile in the grid */
  size?: "compact";
}

/** Photos live in public/Photo Wall/ */
export const PHOTO_WALL_DIR = "Photo Wall";

export function photoWallSrc(filename: string) {
  return `/${encodeURI(`${PHOTO_WALL_DIR}/${filename}`)}`;
}

export const lifeSlices: LifeSlice[] = [
  {
    id: "headshot",
    filename: "Additional headshot.jpg",
    alt: "Dhruv Ramu headshot",
    caption: "Headshot",
    aspect: "portrait",
  },
  {
    id: "tahoe",
    filename: "Tahoe.jpg",
    alt: "Lake Tahoe",
    caption: "Tahoe",
    aspect: "landscape",
  },
  {
    id: "big-sur",
    filename: "Big Sur.jpg",
    alt: "Big Sur coastline",
    caption: "Big Sur",
    span: "md:col-span-2",
    aspect: "wide",
  },
  {
    id: "ladakh-solo",
    filename: "Ladakh Solo.jpg",
    alt: "Solo in Ladakh",
    caption: "Ladakh, solo miles",
    aspect: "portrait",
  },
  {
    id: "friendsgiving",
    filename: "Friendsgiving.jpg",
    alt: "Friendsgiving dinner",
    caption: "Friendsgiving",
    aspect: "landscape",
  },
  {
    id: "torrey-pines",
    filename: "Torrey Pines State Beach.jpg",
    alt: "Torrey Pines State Beach",
    caption: "Torrey Pines",
    aspect: "landscape",
  },
  {
    id: "hiking",
    filename: "Hiking.jpg",
    alt: "Hiking trail",
    caption: "On the trail",
    aspect: "portrait",
  },
  {
    id: "sandboarding",
    filename: "Sandboarding.jpg",
    alt: "Sandboarding",
    caption: "Sandboarding",
    aspect: "portrait",
  },
  {
    id: "stonewall-peak",
    filename: "Stonewall Peak.jpg",
    alt: "Stonewall Peak",
    caption: "Stonewall Peak",
    span: "md:col-span-2",
    aspect: "landscape",
  },
  {
    id: "morocco",
    filename: "Morocco Snow.jpg",
    alt: "Snow in Morocco",
    caption: "Morocco snow",
    aspect: "landscape",
  },
  {
    id: "desert",
    filename: "Desert.jpg",
    alt: "Desert landscape",
    caption: "Desert horizon",
    aspect: "landscape",
  },
  {
    id: "nature-ladakh",
    filename: "Nature Ladakh.jpg",
    alt: "Nature in Ladakh",
    caption: "Ladakh valleys",
    aspect: "portrait",
  },
  {
    id: "formal",
    filename: "TCG Formal with the boys.png",
    alt: "Formal with friends",
    caption: "Formal with the boys",
    span: "md:col-span-2",
    aspect: "landscape",
  },
  {
    id: "arin-dhruv",
    filename: "Arin and Dhruv.jpg",
    alt: "Arin and Dhruv",
    caption: "Arin & Dhruv",
    aspect: "portrait",
  },
  {
    id: "nature",
    filename: "Nature.jpg",
    alt: "Nature",
    caption: "Out in nature",
    aspect: "landscape",
  },
  {
    id: "potato-chip",
    filename: "Dhruv Potato Chip.jpeg",
    alt: "Dhruv with potato chips",
    caption: "Potato chip era",
    aspect: "square",
    size: "compact",
  },
];
