import React, { PropTypes } from 'react';
import SearchResult from './SearchResult'

export default function SearchResults({ onSelect, results }) {
  if (!results) { return null; }

  if (results.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ul>
      {results.map((result, idx) => (
        <SearchResult
          key={idx}
          onSelect={(...args) => onSelect(idx, ...args)}
          data={result}
        />
      ))}
    </ul>
  );
}

SearchResults.propTypes = {
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired
        })
      }),
      title: PropTypes.string.isRequired
    }).isRequired
  ),
};
