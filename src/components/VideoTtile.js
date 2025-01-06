import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1>{title}</h1>
      <p>{overview}</p>
      <button>Play</button>
      <button>More Info</button>
    </div>
  );
};

export default VideoTitle;
