import React, { PropTypes } from 'react';
import SearchFormContainer from './SearchFormContainer';
import VideoList from '../VideoList/VideoList';

const style = {
  flex: 1
};

export default function Search({
  apiReady,
  favorites,
  onSelect,
  onSearch,
  onToggleFavorite,
  results
}) {
  return (
    <div style={style}>
      <h2>Search</h2>
      <SearchFormContainer apiReady={apiReady} onSearch={onSearch} />
      <VideoList
        favorites={favorites || {}}
        items={results || []}
        onSelect={onSelect}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

Search.propTypes = {
  apiReady: PropTypes.bool.isRequired,
  favorites: PropTypes.objectOf(PropTypes.oneOf([true])),
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  results: PropTypes.array,
};
