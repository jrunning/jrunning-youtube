import React, { PropTypes } from 'react';

export default function SearchForm({ value, onChange, onSearch }) {
  value = value || "";

  return (
    <form onSubmit={onSearch}>
      <input type="text" placeholder="Keywords" value={value} onChange={onChange}/>
      <input type="submit" value="Search"/>
    </form>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string
};
