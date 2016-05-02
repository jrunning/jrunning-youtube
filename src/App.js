import React, { PropTypes } from 'react';
import SearchContainer from './Search/SearchContainer';
import VideoPlayerContainer from './VideoPlayer/VideoPlayerContainer';
import FavoritesContainer from './Favorites/FavoritesContainer';

const style = {
  fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
  display: 'flex',
};

export default function App({
  favorites,
  onFavoritesChanged,
  onSelectVideo,
  selectedVideo,
}) {
  return (
    <div style={style}>
      <FavoritesContainer
        favorites={favorites}
        onFavoritesChanged={onFavoritesChanged}
        onSelect={onSelectVideo}
      />
      <SearchContainer
        favorites={favorites}
        onFavoritesChanged={onFavoritesChanged}
        onSelect={onSelectVideo}
      />
      <VideoPlayerContainer video={selectedVideo} />
    </div>
  );
}

App.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.oneOf([true])),
  onFavoritesChanged: PropTypes.func.isRequired,
  onSelectVideo: PropTypes.func.isRequired,
  selectedVideo: PropTypes.object,
};
