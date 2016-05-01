import React, { Component, PropTypes } from 'react';
import Search from './Search';
import { apiLoaded, search } from '../lib/YouTube';

export default class SearchContainer extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { results: [], apiReady: false };
    this.handleResultsReceived = this.handleResultsReceived.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
  }

  componentDidMount() {
    apiLoaded(() => this.setState({ apiReady: true }));
  }

  handleResultsReceived(results) {
    this.setState({ results });
  }

  handleSearch(keywords) {
    if (!this.state.apiReady) { return; }
    search(keywords, this.handleResultsReceived);
  }

  handleVideoSelected(searchResultIdx) {
    const selectedResult = this.state.results[searchResultIdx];

    if (!selectedResult) {
      throw new Error('Invalid selected video index!');
    }

    this.props.onSelect(selectedResult);
  }

  render() {
    return (
      <Search
        {...this.state}
        onSearch={this.handleSearch}
        onSelect={this.handleVideoSelected}
      />
    );
  }
}
