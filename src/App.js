import React, { PropTypes } from 'react';
import SearchContainer from './Search/SearchContainer';
import VideoPlayerContainer from './VideoPlayer/VideoPlayerContainer';

const style = {
  fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
  display: 'flex',
};

export default function App({ onSelectVideo, selectedVideo }) {
  return (
    <div style={style}>
      <SearchContainer onSelect={onSelectVideo} />
      <VideoPlayerContainer video={selectedVideo} />
    </div>
  );
}

App.propTypes = {
  onSelectVideo: PropTypes.func.isRequired
};
