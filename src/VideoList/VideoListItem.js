import React, { PropTypes } from 'react';

const style = {
  link: {
    display: 'flex',
    flexDirection: 'row',
    margin: '-1em 0 .5em 0',
    cursor: 'pointer',
  },

  thumbnail: {
    flexBasis: 'auto',
    width: 120,
    height: 90,
  },

  info: { flex: 1, padding: '.5em' },
  title: { margin: '0 0 .5em 0' },
  channel: { fontWeight: 'normal', margin: '0 0 .5em 0' },
  fav: { cursor: 'pointer' },
}

export default function VideoListItem({
  data: {
    channelTitle,
    thumbnails: { default: { url: thumbnailUrl } },
    title
  },
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <li>
      <a onClick={onSelect} style={style.link}>
        <img src={thumbnailUrl} style={style.thumbnail} />
        <div style={style.info}>
          <h4 style={style.title}>{title}</h4>
          <h5 style={style.channel}>by {channelTitle}</h5>
        </div>
      </a>
      <a onClick={onToggleFavorite} style={style.fav}>{isFavorite && 'un'}fav</a>
    </li>
  );
}

VideoListItem.propTypes = {
  data: PropTypes.shape({
    channelTitle: PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      default: PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
