import React, { PropTypes } from 'react';
import SearchResult from './SearchResult'

export default function SearchResults({ results }) {
  if (!results) { return null; }

  if (results.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ul>
      {results.map((result, idx) => (
        <SearchResult
          key={idx}
          onSelect={() => console.log(`Selected result ${idx}`)}
          data={result}
        />
      ))}
    </ul>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array,
};
