import React, { Component } from 'react';
import Search from './Search';
import youtubeLoaded from './lib/youtubeLoaded';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], apiReady: false };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    youtubeLoaded(() => this.setState({ apiReady: true }));
  }

  handleSearch(keywords) {
    if (!this.state.apiReady) { return; }

    setTimeout(() => {
      this.handleResultsReceived([
        `${keywords}-0`,
        `${keywords}-1`,
        `${keywords}-2`,
      ]);
    });
  }

  handleResultsReceived(results) {
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
