import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

const clearStyle = {
  marginLeft: '0.33em',
  color: '#267dc0',
  cursor: 'pointer',
};

export default function LocationInput({ initialValue, onChange }) {
  return (
    <div>
      <Geosuggest
        initialValue={initialValue}
        onSuggestSelect={onChange}
      />
      <a onClick={() => onChange()} style={clearStyle}>clear</a>
    </div>
  );
}

LocationInput.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
