import React, { memo, useMemo } from "react";

// Move default outside component to prevent recreation
const DEFAULT_VIDEO_ID = "W7uB9-TKfTg";

const YoutubeEmbed = memo((props) => {
  const { videoId = DEFAULT_VIDEO_ID } = props;

  // Clean and memoize the video ID to prevent unnecessary re-calculations
  const cleanVideoId = useMemo(() => {
    return videoId.split('&')[0].split('?')[0];
  }, [videoId]);

  // Memoize the embed URL
  const embedUrl = useMemo(() => {
    return `https://www.youtube.com/embed/${cleanVideoId}`;
  }, [cleanVideoId]);

  return (
    <div className="bg-red-500 hover:bg-red-600 text-white overflow-hidden rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 transform  shadow-lg">
      <iframe
        src={embedUrl}
        className="w-full aspect-video"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
});

// Add display name for better debugging
YoutubeEmbed.displayName = 'YoutubeEmbed';

export default YoutubeEmbed;