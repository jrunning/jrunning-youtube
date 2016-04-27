import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';

export default class SearchFormContainer extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    onSearch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { value: props.initialValue || "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return <SearchForm
      value={this.state.value}
      onChange={this.handleChange}
      onSearch={this.handleSearch}/>;
  }

  handleChange(evt) {
    this.setState({ ...this.state, value: evt.target.value || "" });
  }

  handleSearch(evt) {
    evt.preventDefault();
    this.props.onSearch(this.state.value);
  }
}
