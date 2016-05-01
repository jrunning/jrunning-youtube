import React, { PropTypes } from 'react';

export default function VideoPlayer({ title, embedHtml }) {
  return (
    <div>
      <h4>{title}</h4>
      <div dangerouslySetInnerHTML={embedHtml} />
    </div>
  );
}

VideoPlayer.propTypes = {
  title: PropTypes.string.isRequired,
  embedHtml: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }).isRequired,
};
