import React, { PropTypes } from 'react';

const activeStyle = {
  flex: 1,
  position: 'absolute',
  top: 0,
  right: 0,
  fontSize: '150%',
  cursor: 'pointer',
  color: 'yellow',
  WebkitTextStroke: '2px goldenrod',
  textStroke: '2px goldenrod',
};

const style = {
  default: {
    ...activeStyle,
    opacity: '.75',
    WebkitTextStroke: '2px lightgray',
    textStroke: '2px lightgray',
  },
  active: activeStyle,
};

export default function FavButton({ active, onClick }) {
  return <a onClick={onClick} style={style[active ? 'active' : 'default']}>★</a>;
}

FavButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
