"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = 0.4;
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.4;
    v.loop = false;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  const handleEnded = () => {
    setPlaying(false);
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.currentTime = 0;
    v.play();
  };

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        src="/videos/stairwise.mp4"
        poster="/images/hero-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={handleEnded}
      />
      {!playing && (
        <button type="button" className="hero-video-play" aria-label="Play video with sound" onClick={handlePlay}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" /></svg>
        </button>
      )}
    </div>
  );
}
