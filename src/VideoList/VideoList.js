import React, { PropTypes } from 'react';
import VideoListItem from './VideoListItem';

const style = { padding: 0 };

export default function VideoList({
  items,
  favorites,
  onSelect,
  onToggleFavorite,
}) {
  if (!items) { return null; }

  if (items.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ol style={style}>
      {items.map((item, idx) => (
        <VideoListItem
          data={item}
          key={idx}
          isFavorite={!!favorites[item.videoId]}
          onSelect={() => onSelect(idx)}
          onToggleFavorite={() => onToggleFavorite(idx)}
        />
      ))}
    </ol>
  );
}

VideoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
  favorites: PropTypes.objectOf(PropTypes.oneOf([true])).isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
