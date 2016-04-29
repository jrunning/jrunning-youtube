import React, { Component } from 'react';
import Search from './Search';
import { apiLoaded, search } from '../lib/YouTube';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], apiReady: false };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResultsReceived = this.handleResultsReceived.bind(this);
  }

  componentDidMount() {
    apiLoaded(() => this.setState({ apiReady: true }));
  }

  handleSearch(keywords) {
    if (!this.state.apiReady) { return; }
    console.log(`Searching for ${keywords}`);
    search(keywords, this.handleResultsReceived);
  }

  handleResultsReceived(results) {
    console.log('Received results', results);
    this.setState({ results });
  }

  render() {
    return (
      <Search
        {...this.state}
        onSearch={this.handleSearch}
      />
    );
  }
}
