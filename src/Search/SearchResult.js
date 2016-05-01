import React, { PropTypes } from 'react';

const linkStyle = {
  display: 'block',
  cursor: 'pointer',
};

const thumbnailStyle = {
  float: 'left'
};

export default function SearchResult({
  data: {
    channelTitle,
    thumbnails: { default: { url: thumbnailUrl } },
    title
  },
  onSelect,
}) {
  return (
    <li>
      <a onClick={onSelect} style={linkStyle}>
        <h4>{title}</h4>
        <div className="clearfix">
          <img src={thumbnailUrl} style={thumbnailStyle} />
          <dl>
            <dt>Channel Title</dt>
            <dd>{channelTitle}</dd>
          </dl>
        </div>
      </a>
    </li>
  );
}

SearchResult.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.shape({
    channelTitle: PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      default: PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
};
