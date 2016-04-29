import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';

export default class SearchFormContainer extends Component {
  static propTypes = {
    apiReady: PropTypes.bool.isRequired,
    initialValue: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { value: props.initialValue || '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(evt) {
    this.setState({ value: evt.target.value || '' });
  }

  handleSearch(evt) {
    evt.preventDefault();
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <SearchForm
        apiReady={this.props.apiReady}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        value={this.state.value}
      />
    );
  }
}
