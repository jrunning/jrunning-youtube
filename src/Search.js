import React, { PropTypes } from 'react';
import SearchFormContainer from './SearchFormContainer';
import SearchResults from './SearchResults';

export default function Search({ results, onSearch }) {
  return (
    <div>
      <SearchFormContainer onSearch={onSearch} />
      <SearchResults results={results || []} />
    </div>
  );
}

Search.propTypes = {
  results: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
};
