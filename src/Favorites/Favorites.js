import React, { PropTypes } from 'react';
import VideoList from '../VideoList/VideoList';

const style = { flex: 1 };

export default function Favorites({
  items,
  favorites,
  onRemoveFavorite,
  onSelect,
}) {
  return (
    <div style={style}>
      <h2>Favorites</h2>
      <VideoList
        items={items}
        favorites={favorites}
        onToggleFavorite={onRemoveFavorite}
        onSelect={onSelect}
      />
    </div>
  );
}

Favorites.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.objectOf(PropTypes.oneOf([true])).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};