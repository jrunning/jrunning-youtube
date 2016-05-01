import React, { PropTypes } from 'react';

const style = {
  flex: 1,
};

export default function VideoPlayer({ title, embedHtml }) {
  return (
    <div style={style}>
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
