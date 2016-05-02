import React, { PropTypes } from 'react';
import SearchFormContainer from './SearchFormContainer';
import VideoList from '../VideoList/VideoList';

const style = {
  flex: 1
};

export default function Search({ apiReady, onSelect, onSearch, results }) {
  return (
    <div style={style}>
      <h2>Search</h2>
      <SearchFormContainer apiReady={apiReady} onSearch={onSearch} />
      <VideoList onSelect={onSelect} items={results || []} />
    </div>
  );
}

Search.propTypes = {
  apiReady: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array,
};
