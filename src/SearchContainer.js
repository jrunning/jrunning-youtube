import React, { Component } from 'react';
import Search from './Search';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(keywords) {
    setTimeout(() => {
      this.handleResultsReceived([
        `${keywords}-0`,
        `${keywords}-1`,
        `${keywords}-2`,
      ]);
    });
  }

  handleResultsReceived(results) {
    this.setState({ ...(this.state), results });
  }

  render() {
    return (
      <Search
        results={this.state.results}
        onSearch={this.handleSearch}
      />
    );
  }
}
