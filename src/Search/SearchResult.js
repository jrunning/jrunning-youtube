import React, { PropTypes } from 'react';

const linkStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: '-1em 0 .5em 0',
  cursor: 'pointer',
};

const thumbnailStyle = {
  flexBasis: 'auto',
  width: 120,
  height: 90,
};

const infoStyle = { flex: 1, padding: '.5em' };
const titleStyle = { margin: '0 0 .5em 0' };
const channelStyle = { fontWeight: 'normal', margin: '0 0 .5em 0' };

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
        <img src={thumbnailUrl} style={thumbnailStyle} />
        <div style={infoStyle}>
          <h4 style={titleStyle}>{title}</h4>
          <h5 style={channelStyle}>by {channelTitle}</h5>
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
