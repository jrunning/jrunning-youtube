import React, { PropTypes } from 'react';
import YoutubePlayer from 'react-youtube-player';

import FavButton from '../shared/FavButton';

const style = {
  main: { flex: '40%', position: 'relative', margin: '1em' },
  title: { margin: '0 0 .5em 0' },
  channel: { fontWeight: 'normal', margin: '0 0 .5em 0' }
};

const NO_STATISTICS = <div>Loading statistics...</div>;

function renderStatistics(statistics) {
  if (!statistics) { return NO_STATISTICS; }

  const {
    commentCount,
    dislikeCount,
    favoriteCount,
    likeCount,
    viewCount,
  } = statistics;

  return (
    <dl>
      <dt>Views</dt> <dd>{viewCount}</dd>
      <dt>Likes / Dislikes</dt> <dd>{likeCount} / {dislikeCount}</dd>
      <dt>Favorites</dt> <dd>{favoriteCount}</dd>
      <dt>Comments</dt> <dd>{commentCount}</dd>
    </dl>
  );
}

export default function VideoPlayer({
  channelTitle,
  isFavorite,
  onToggleFavorite,
  statistics,
  title,
  videoId,
}) {
  return (
    <div style={style.main}>
      <FavButton active={isFavorite} onClick={onToggleFavorite} />
      <h4 style={style.title}>{title}</h4>
      <h5 style={style.channel}>by {channelTitle}</h5>
      <div className="video-container">
        <YoutubePlayer
          videoId={videoId}
          playbackState="unstarted"
        />
      </div>
      {renderStatistics(statistics)}
    </div>
  );
}

VideoPlayer.propTypes = {
  channelTitle: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func.isRequired,
  statistics: PropTypes.shape({
    commentCount: PropTypes.string.isRequired,
    dislikeCount: PropTypes.string.isRequired,
    favoriteCount: PropTypes.string.isRequired,
    likeCount: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
};
