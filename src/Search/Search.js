import React, { PropTypes } from 'react';
import SearchFormContainer from './SearchFormContainer';
import SearchResults from './SearchResults';

const style = {
  flex: 1
};

export default function Search({ apiReady, onSelect, onSearch, results }) {
  return (
    <div style={style}>
      <h2>Search</h2>
      <SearchFormContainer apiReady={apiReady} onSearch={onSearch} />
      <SearchResults onSelect={onSelect} results={results || []} />
    </div>
  );
}

Search.propTypes = {
  apiReady: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array,
};
