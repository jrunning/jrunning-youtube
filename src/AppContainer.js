import React, { Component } from 'react';
import { addFav, isFav, listFavs, removeFav } from './lib/Favs';

import App from './App';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedVideo: null, favorites: {} };
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this);
  }

  componentDidMount() {
    this.loadFavs();
  }

  handleToggleFavorite(item) {
    if (isFav(item.videoId)) {
      removeFav(item.videoId);
    } else {
      addFav(item);
    }

    this.loadFavs();
  }


  handleVideoSelected(selectedVideo) {
    this.setState({ selectedVideo });
  }

  // Retrieve an array of favorite videoIds from storage and set
  // `this.state.favorites` to an object of the form:
  //
  //     { "xo8TiSo4iTc": true,
  //       "SBjQ9tuuTJQ": true,
  //       ...
  //     }
  //
  loadFavs() {
    const favorites = listFavs().reduce(
      (favs, id) => ({ ...favs, [id]: true }),
      {}
    );
    this.setState({ favorites });
  }

  render() {
    return (
      <App
        {...this.state}
        onSelectVideo={this.handleVideoSelected}
        onToggleFavorite={this.handleToggleFavorite}
      />
    );
  }
}
