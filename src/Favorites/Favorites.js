import React, { PropTypes } from 'react';
import VideoList from '../VideoList/VideoList';

const style = {
  main: { flex: '30%', margin: '1em' },
  heading: { marginTop: 0 },
};

export default function Favorites({
  items,
  favorites,
  onRemoveFavorite,
  onSelect,
}) {
  return (
    <div style={style.main}>
      <h2 style={style.heading}>Favorites</h2>
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
