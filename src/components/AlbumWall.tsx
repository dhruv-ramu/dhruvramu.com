"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VinylRecord } from "@/data/vinyl-collection";

interface AlbumWallProps {
  records: VinylRecord[];
  activeIndex: number;
  onSelect: (index: number, autoplay?: boolean) => void;
}

export function AlbumWall({ records, activeIndex, onSelect }: AlbumWallProps) {
  return (
    <div className="album-wall">
      <div className="album-wall-texture" aria-hidden />
      <div className="album-wall-header">
        <p className="album-wall-title">The wall</p>
        <p className="album-wall-count">{records.length} records</p>
      </div>

      <div className="album-wall-grid" role="list">
        {records.map((record, i) => (
          <button
            key={record.id}
            type="button"
            role="listitem"
            className={cn(
              "album-wall-sleeve",
              i === activeIndex && "album-wall-sleeve--active"
            )}
            onClick={() => onSelect(i, true)}
            aria-label={`Play ${record.title} by ${record.artist}`}
            aria-pressed={i === activeIndex}
            style={{ "--sleeve-rot": `${((i % 5) - 2) * 0.4}deg` } as React.CSSProperties}
          >
            <div className="album-wall-sleeve-inner">
              <Image
                src={record.cover}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className="album-wall-sleeve-gloss" aria-hidden />
            </div>
            <span className="album-wall-sleeve-title">{record.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
