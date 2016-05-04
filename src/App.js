import React, { PropTypes } from 'react';
import SearchContainer from './Search/SearchContainer';
import VideoPlayerContainer from './VideoPlayer/VideoPlayerContainer';
import FavoritesContainer from './Favorites/FavoritesContainer';

const style = { display: 'flex' };

export default function App({
  favorites,
  onToggleFavorite,
  onSelectVideo,
  selectedVideo,
}) {
  const selectedVideoIsFavorite =
    selectedVideo && favorites[selectedVideo.videoId];

  return (
    <div style={style}>
      <SearchContainer
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onSelect={onSelectVideo}
      />
      <FavoritesContainer
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onSelect={onSelectVideo}
      />
      <VideoPlayerContainer
        isFavorite={selectedVideoIsFavorite}
        onToggleFavorite={onToggleFavorite}
        video={selectedVideo}
      />
    </div>
  );
}

App.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.oneOf([true])),
  onToggleFavorite: PropTypes.func.isRequired,
  onSelectVideo: PropTypes.func.isRequired,
  selectedVideo: PropTypes.object,
};
