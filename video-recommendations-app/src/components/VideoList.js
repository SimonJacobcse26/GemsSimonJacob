// VideoList.js
import React from 'react';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <div key={video.id} className="video-card">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <p>Category: {video.category}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
