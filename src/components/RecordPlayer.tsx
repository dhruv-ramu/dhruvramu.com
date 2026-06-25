"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import "./RecordPlayer.css";

const albums = [
  { title: "Kind of Blue", artist: "Miles Davis", year: "1959" },
  { title: "In Rainbows", artist: "Radiohead", year: "2007" },
  { title: "Blonde", artist: "Frank Ocean", year: "2016" },
  { title: "Currents", artist: "Tame Impala", year: "2015" },
];

export function RecordPlayer() {
  const [playing, setPlaying] = useState(false);
  const [albumIndex, setAlbumIndex] = useState(0);
  const album = albums[albumIndex]!;

  function togglePlay() {
    setPlaying((p) => !p);
  }

  function nextAlbum() {
    setAlbumIndex((i) => (i + 1) % albums.length);
  }

  return (
    <div className="record-player">
      <div className="record-player-surface">
        <div className="record-player-platter">
          <div
            className={cn("record-player-vinyl", playing && "record-player-vinyl--spinning")}
          >
            <div className="record-player-label">
              <span className="record-player-label-title">{album.title}</span>
              <span className="record-player-label-artist">{album.artist}</span>
            </div>
          </div>
          <div
            className={cn("record-player-arm", playing && "record-player-arm--down")}
            aria-hidden
          />
        </div>

        <div className="record-player-controls">
          <button
            type="button"
            className="record-player-btn"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            className="record-player-btn record-player-btn--ghost"
            onClick={nextAlbum}
            aria-label="Next record"
          >
            ↻
          </button>
        </div>
      </div>

      <div className="record-player-meta">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Now spinning
        </p>
        <p className="mt-1 font-display text-xl text-ink">
          {album.title}
        </p>
        <p className="font-body text-sm text-ink-soft">
          {album.artist} · {album.year}
        </p>
      </div>
    </div>
  );
}
