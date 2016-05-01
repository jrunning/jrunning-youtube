import React, { PropTypes } from 'react';
import SearchContainer from './Search/SearchContainer';
import VideoPlayerContainer from './VideoPlayer/VideoPlayerContainer';

export default function App({ onSelectVideo, selectedVideo }) {
  return (
    <div>
      <SearchContainer onSelect={onSelectVideo} />
      <VideoPlayerContainer video={selectedVideo} />
    </div>
  );
}

App.propTypes = {
  onSelectVideo: PropTypes.func.isRequired
};
