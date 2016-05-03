import React, { Component, PropTypes } from 'react';
import Search from './Search';
import { apiLoaded, search } from '../lib/YouTube';

export default class SearchContainer extends Component {
  static propTypes = {
    favorites: PropTypes.objectOf(PropTypes.oneOf([true])),
    onToggleFavorite: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { apiReady: false, results: [] };
    this.handleResultsReceived = this.handleResultsReceived.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this);
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
  }

  componentDidMount() {
    apiLoaded(() => this.setState({ apiReady: true }));
  }

  handleResultsReceived(results) {
    this.setState({ results });
  }

  handleSearch(keywords, params={}) {
    if (!this.state.apiReady) { return; }
    search(keywords, params, this.handleResultsReceived);
  }

  handleToggleFavorite(itemIdx) {
    this.props.onToggleFavorite(this.getItem(itemIdx));
  }

  handleVideoSelected(searchResultIdx) {
    this.props.onSelect(this.getItem(searchResultIdx));
  }

  getItem(itemIdx) {
    const selectedItem = this.state.results[itemIdx];

    if (!selectedItem) {
      throw new Error('Invalid selected video index!');
    }

    return selectedItem;
  }

  render() {
    return (
      <Search
        {...this.state}
        favorites={this.props.favorites}
        onSearch={this.handleSearch}
        onSelect={this.handleVideoSelected}
        onToggleFavorite={this.handleToggleFavorite}
      />
    );
  }
}
