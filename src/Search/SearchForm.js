import React, { PropTypes } from 'react';
import OrderInput from './OrderInput';

const style = {
  main: { marginBottom: '1em' },
  inputGroup: { display: 'block', fontSize: 16, marginBottom: '.5em' }
};

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
      <OrderInput order={order} onChange={onChangeOrder} />
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
