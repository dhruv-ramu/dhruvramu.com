"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  vinylCollection,
  DEFAULT_VINYL_ID,
  getVinylIndex,
  type VinylRecord,
} from "@/data/vinyl-collection";
import { Turntable } from "./Turntable";
import { AlbumWall } from "./AlbumWall";
import "./VinylStation.css";

const defaultIndex = Math.max(0, getVinylIndex(DEFAULT_VINYL_ID));

export function VinylStation() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [albumIndex, setAlbumIndex] = useState(defaultIndex);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const album = vinylCollection[albumIndex]!;

  const loadAndPlay = useCallback(async (record: VinylRecord, autoplay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = record.previewUrl;
    audio.load();
    setProgress(0);

    if (autoplay) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      setPlaying(false);
    }
  }, []);

  const selectRecord = useCallback(
    (index: number, autoplay = true) => {
      setAlbumIndex(index);
      loadAndPlay(vinylCollection[index]!, autoplay);
    },
    [loadAndPlay]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      if (!audio.src) loadAndPlay(album, true);
      else audio.play().catch(() => setPlaying(false));
    }
  }

  function prevRecord() {
    const next = (albumIndex - 1 + vinylCollection.length) % vinylCollection.length;
    selectRecord(next, playing);
  }

  function nextRecord() {
    const next = (albumIndex + 1) % vinylCollection.length;
    selectRecord(next, playing);
  }

  return (
    <div className="vinyl-station">
      <audio ref={audioRef} preload="none" />

      <Turntable
        album={album}
        playing={playing}
        progress={progress}
        onTogglePlay={togglePlay}
        onPrev={prevRecord}
        onNext={nextRecord}
      />

      <AlbumWall
        records={vinylCollection}
        activeIndex={albumIndex}
        onSelect={selectRecord}
      />
    </div>
  );
}
