import React, { PropTypes } from 'react';

const linkStyle = {
  display: 'block',
  cursor: 'pointer',
};

export default function SearchResult({
  data: {
    thumbnails: { default: { url: thumbnailUrl } },
    title
  },
  onSelect,
}) {
  return (
    <li>
      <a onClick={onSelect} style={linkStyle}>
        <h4>{title}</h4>
        <img src={thumbnailUrl} />
      </a>
    </li>
  );
}

SearchResult.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.shape({
    thumbnails: PropTypes.shape({
      default: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    }),
    title: PropTypes.string.isRequired
  }).isRequired
};
