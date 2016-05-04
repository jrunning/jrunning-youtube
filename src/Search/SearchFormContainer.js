import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';

const DEFAULT_ORDER = 'relevance';

export default class SearchFormContainer extends Component {
  static propTypes = {
    apiReady: PropTypes.bool.isRequired,
    initialLocation: PropTypes.string,
    initialOrder: PropTypes.string,
    initialValue: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      order: props.initialOrder || DEFAULT_ORDER,
      value: props.initialValue || '',
      location: props.initialLocation || {},
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChangeLocation(location = {}) {
    this.setState({ location });
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
    const { location } = this.state.location;

    if (location) {
      params.location = `${location.lat},${location.lng}`;
    }

    this.props.onSearch(this.state.value, params);
  }

  render() {
    const { location, ...props } = this.state;
    return (
      <SearchForm
        {...props}
        apiReady={this.props.apiReady}
        initialLocation={location}
        onChangeLocation={this.handleChangeLocation}
        onChangeOrder={this.handleChangeOrder}
        onChangeValue={this.handleChangeValue}
        onSearch={this.handleSearch}
      />
    );
  }
}
