import React, { PropTypes } from 'react';

export default function SearchForm({ apiReady, onChange, onSearch, value }) {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Keywords"
        value={value || ''}
        onChange={onChange}
      />
      {/* TODO Style disabled submit button */}
      <input type="submit" value="Search" disabled={!apiReady} />
    </form>
  );
}

SearchForm.propTypes = {
  apiReady: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string,
};
