import React, { PropTypes } from 'react';

const style = {
  flex: 1,
};

export default function VideoPlayer({
  embedHtml,
  statistics: {
    commentCount,
    dislikeCount,
    favoriteCount,
    likeCount,
    viewCount,
  },
  title,
}) {
  return (
    <div style={style}>
      <h4>{title}</h4>
      <div dangerouslySetInnerHTML={embedHtml} />
      <dl>
        <dt>Views</dt> <dd>{viewCount}</dd>
        <dt>Likes / Dislikes</dt> <dd>{likeCount} / {dislikeCount}</dd>
        <dt>Favorites</dt> <dd>{favoriteCount}</dd>
        <dt>Comments</dt> <dd>{commentCount}</dd>
      </dl>
    </div>
  );
}

VideoPlayer.propTypes = {
  embedHtml: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }).isRequired,
  statistics: PropTypes.shape({
    commentCount: PropTypes.string.isRequired,
    dislikeCount: PropTypes.string.isRequired,
    favoriteCount: PropTypes.string.isRequired,
    likeCount: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
};
