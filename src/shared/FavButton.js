import React, { PropTypes } from 'react';

const activeStyle = {
  flex: 1,
  position: 'absolute',
  top: 0,
  right: 0,
  fontSize: '200%',
  cursor: 'pointer',
};

const style = {
  default: {
    ...activeStyle,
    opacity: '.67',
    WebkitFilter: 'grayscale(100%)',
    filter: 'grayscale(100%)',
  },
  active: activeStyle,
};

const GLYPH = '\u2b50'; // Emoji ★

export default function FavButton({ active, onClick }) {
  return (
    <a onClick={onClick} style={style[active ? 'active' : 'default']}>
      {GLYPH}
    </a>
  );
}

FavButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
