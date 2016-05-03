import React, { PropTypes } from 'react';
import YoutubePlayer from 'react-youtube-player';

const style = {
  main: { flex: '40%', margin: '1em' },
  title: { margin: '0 0 .5em 0' },
  channel: { fontWeight: 'normal', margin: '0 0 .5em 0' }
};


export default function VideoPlayer({
  channelTitle,
  statistics: {
    commentCount,
    dislikeCount,
    favoriteCount,
    likeCount,
    viewCount,
  },
  title,
  videoId,
}) {
  return (
    <div style={style.main}>
      <h4 style={style.title}>{title}</h4>
      <h5 style={style.channel}>by {channelTitle}</h5>
      <div className="video-container">
        <YoutubePlayer
          videoId={videoId}
          playbackState="unstarted"
        />
      </div>
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
  channelTitle: PropTypes.string.isRequired,
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
