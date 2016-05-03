import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';

const DEFAULT_ORDER = 'relevance';

export default class SearchFormContainer extends Component {
  static propTypes = {
    apiReady: PropTypes.bool.isRequired,
    initialOrder: PropTypes.string,
    initialValue: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      order: props.initialOrder || DEFAULT_ORDER,
      value: props.initialValue || '',
    };
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChangeOrder(order) {
    this.setState({ order });
  }

  handleChangeValue(evt) {
    this.setState({ value: evt.target.value || '' });
  }

  handleSearch(evt) {
    evt.preventDefault();
    const params = { order: this.state.order };
    this.props.onSearch(this.state.value, params);
  }

  render() {
    return (
      <SearchForm
        {...this.state}
        apiReady={this.props.apiReady}
        onChangeOrder={this.handleChangeOrder}
        onChangeValue={this.handleChangeValue}
        onSearch={this.handleSearch}
      />
    );
  }
}
