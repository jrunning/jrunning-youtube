import React, { PropTypes } from 'react';
import VideoListItem from './VideoListItem'

export default function VideoList({ onSelect, items }) {
  if (!items) { return null; }

  if (items.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ol>
      {items.map((item, idx) => (
        <VideoListItem
          key={idx}
          onSelect={(...args) => onSelect(idx, ...args)}
          data={item}
        />
      ))}
    </ol>
  );
}

VideoList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
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
