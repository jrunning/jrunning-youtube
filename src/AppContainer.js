import React, { Component } from 'react';
import { listFavs } from './lib/Favs';

import App from './App';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedVideo: null, favorites: {} };
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
    this.handleFavoritesChanged = this.handleFavoritesChanged.bind(this);
  }

  componentDidMount() {
    this.loadFavs();
  }

  handleFavoritesChanged() {
    this.loadFavs();
  }

  handleVideoSelected(selectedVideo) {
    this.setState({ selectedVideo });
  }

  loadFavs() {
    const favorites = listFavs().reduce(
      (favs, id) => { favs[id] = true; return favs; },
      {}
    );
    this.setState({ favorites });
  }

  render() {
    return (
      <App
        {...this.state}
        onSelectVideo={this.handleVideoSelected}
        onFavoritesChanged={this.handleFavoritesChanged}
      />
    );
  }
}
