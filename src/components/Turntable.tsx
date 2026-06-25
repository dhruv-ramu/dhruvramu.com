"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VinylRecord } from "@/data/vinyl-collection";

interface TurntableProps {
  album: VinylRecord;
  playing: boolean;
  progress: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Turntable({
  album,
  playing,
  progress,
  onTogglePlay,
  onPrev,
  onNext,
}: TurntableProps) {
  return (
    <div className="turntable-side">
      <div className="turntable-plinth">
        <div className="turntable-plinth-grain" aria-hidden />

        <div className="turntable-header">
          <span className="turntable-brand">AT-LP120</span>
          <span
            className={cn("turntable-power-led", playing && "turntable-power-led--on")}
            aria-hidden
          />
        </div>

        <div className="turntable-deck">
          <div className="turntable-platter-zone">
            <div className="turntable-platter-rim" aria-hidden />
            <div className="turntable-platter-base" aria-hidden />
            <div className="turntable-platter-mat" aria-hidden />

            <div
              className={cn("turntable-vinyl", playing && "turntable-vinyl--spinning")}
            >
              <div className="turntable-vinyl-grooves" aria-hidden />
              <div className="turntable-vinyl-shine" aria-hidden />
              <div className="turntable-label">
                <Image
                  src={album.cover}
                  alt={`${album.title} cover`}
                  fill
                  className="object-cover"
                  sizes="140px"
                  priority
                />
                <div className="turntable-spindle" aria-hidden />
              </div>
            </div>

            <div className="turntable-rpm-badge" aria-hidden>
              33⅓
            </div>
          </div>

          <div className="turntable-tonearm-mount" aria-hidden>
            <div className="turntable-pivot" />
            <div
              className={cn(
                "turntable-tonearm",
                playing && "turntable-tonearm--engaged"
              )}
            >
              <div className="turntable-tonearm-tube" />
              <div className="turntable-counterweight" />
              <div className="turntable-headshell">
                <div className="turntable-stylus" />
              </div>
            </div>
          </div>
        </div>

        <div className="turntable-transport">
          <button
            type="button"
            className="turntable-transport-btn"
            onClick={onPrev}
            aria-label="Previous record"
          >
            ‹
          </button>
          <button
            type="button"
            className="turntable-start-btn"
            onClick={onTogglePlay}
            aria-label={playing ? "Stop" : "Start"}
          >
            <span className={cn("turntable-start-cap", playing && "turntable-start-cap--pressed")} />
          </button>
          <button
            type="button"
            className="turntable-transport-btn"
            onClick={onNext}
            aria-label="Next record"
          >
            ›
          </button>
        </div>

        <div className="turntable-progress">
          <div
            className="turntable-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="turntable-now-playing">
          <p className="turntable-now-playing-label">
            {playing ? "Now spinning" : "Ready to play"}
          </p>
          <p className="turntable-now-playing-title">{album.title}</p>
          <p className="turntable-now-playing-artist">
            {album.artist} · {album.year}
          </p>
        </div>
      </div>
    </div>
  );
}
