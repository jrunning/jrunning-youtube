import React, { PropTypes } from 'react';

const ORDERS = {
  relevance: 'Relevance',
  date: 'Date',
  rating: 'Rating',
};

const style = {
  main: { fontSize: 16, marginBottom: '.5em' },
  radio: { display: 'inline-block', marginRight: '.5em' },
};

export default function OrderInput({ onChange, order }) {
  return (
    <div style={style.main}>{
      Object.keys(ORDERS).map((key) => {
        const radioProps = {
          checked: key === order,
          id: `search-order-${key}`,
          onChange: () => onChange(key),
        };

        return (
          <label key={key} htmlFor={radioProps.id} style={style.radio}>
            <input type="radio" {...radioProps} /> {ORDERS[key]}
          </label>
        );
      })
    }</div>
  );
}

OrderInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.keys(ORDERS)).isRequired,
};
