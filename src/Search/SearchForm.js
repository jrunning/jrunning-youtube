import React, { PropTypes } from 'react';

const ORDERS = {
  relevance: 'Relevance',
  date: 'Date',
  rating: 'Rating',
}

const style = {
  main: { marginBottom: '1em' },
  inputGroup: { display: 'block', fontSize: 16, marginBottom: '.5em' },
  radio: { display: 'inline-block', marginRight: '.5em' },
};

function renderOrders(checkedKey, onChangeOrder) {
  return (
    <div style={style.inputGroup}>{
      Object.keys(ORDERS).map((key) => {
        const props = {
          checked: key === checkedKey,
          id: `search-order-${key}`,
          onChange: () => onChangeOrder(key)
        };

        return (
          <label key={key} for={props.id} style={style.radio}>
            <input type="radio" {...props} /> {ORDERS[key]}
          </label>
        );
      })
    }</div>
  );
}

export default function SearchForm({
  apiReady,
  onChangeOrder,
  onChangeValue,
  onSearch,
  order,
  value,
}) {
  return (
    <form onSubmit={onSearch} style={style.main}>
      <input
        type="text"
        placeholder="Keywords"
        value={value || ''}
        onChange={onChangeValue}
        style={style.inputGroup}
      />
      {renderOrders(order, onChangeOrder)}
      <input
        type="submit"
        value="Search"
        disabled={!apiReady}
        style={style.inputGroup}
      />
    </form>
  );
}

SearchForm.propTypes = {
  apiReady: PropTypes.bool.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
