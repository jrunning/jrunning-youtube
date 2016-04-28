import React, { PropTypes } from 'react';

export default function SearchResults({ results }) {
  return (
    <ul>
      {results && results.map((result, idx) => (
        <li key={idx}>{result}</li>
      ))}
    </ul>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array,
};
