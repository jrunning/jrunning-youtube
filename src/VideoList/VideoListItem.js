import React, { PropTypes } from 'react';
import FavButton from '../shared/FavButton';

const MATCH_DATE_STRING_EXPR = /^\w+ (\w+) 0?(\d+) (\d+)$/;

function formatDate(date) {
  return date.toDateString().replace(
    MATCH_DATE_STRING_EXPR,
    (_, mon, day, year) => `${mon}. ${day}, ${year}`
  );
}

const style = {
  li: {
    listStyleType: 'none',
    position: 'relative'
  },

  link: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    marginBottom: '.5em',
    cursor: 'pointer',
  },

  thumbnail: {
    flexBasis: 'auto',
    width: 120,
    height: 90,
  },

  info: { flex: 1, padding: '.5em' },
  title: { margin: '0 0 .33em 0' },
  meta: { fontWeight: 'normal', margin: '0 0 .33em 0', fontSize: 13 },
  fav: { cursor: 'pointer' },
}

export default function VideoListItem({
  data: {
    channelTitle,
    publishedAt,
    thumbnails: { default: { url: thumbnailUrl } },
    title
  },
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <li style={style.li}>
      <a onClick={onSelect} style={style.link}>
        <img src={thumbnailUrl} style={style.thumbnail} />
        <div style={style.info}>
          <h4 style={style.title}>{title}</h4>
          <h5 style={style.meta}>by {channelTitle}</h5>
          <span style={style.meta}>{formatDate(publishedAt)}</span>
        </div>
      </a>
      <FavButton onClick={onToggleFavorite} active={isFavorite} />
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
    publishedAt: PropTypes.instanceOf(Date),
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
