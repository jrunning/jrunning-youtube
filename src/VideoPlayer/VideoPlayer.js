import React, { PropTypes } from 'react';

export default function VideoPlayer({ data }) {
  if (!data) {
    return <div>No video selected.</div>;
  }

  return (
    <div>Data: {JSON.stringify(data)}</div>
  );
}

VideoPlayer.propTypes = {
  data: PropTypes.object
};
