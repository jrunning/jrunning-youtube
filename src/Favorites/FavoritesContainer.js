import React, { Component, PropTypes } from 'react';
import Favorites from './Favorites';
import {
  addFav,
  getAllFavs,
  isFav,
  removeFav,
} from '../lib/Favs';

export default class FavoritesContainer extends Component {
  static propTypes = {
    favorites: PropTypes.objectOf(PropTypes.oneOf([true])).isRequired,
    onSelect: PropTypes.func.isRequired,
    onFavoritesChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
  }

  componentDidMount() {
    this.loadFavs();
  }

  componentWillReceiveProps({ favorites }) {
    if (favorites !== this.props.favorites) {
      this.loadFavs();
    }
  }

  handleRemoveFavorite(itemIdx) {
    const { videoId } = this.getItem(itemIdx);
    removeFav(videoId);
    this.loadFavs();
    this.props.onFavoritesChanged();
  }

  handleVideoSelected(itemIdx) {
    this.props.onSelect(this.getItem(itemIdx));
  }

  getItem(itemIdx) {
    const selectedItem = this.state.items[itemIdx];

    if (!selectedItem) {
      throw new Error('Invalid selected video index!');
    }

    return selectedItem;
  }

  loadFavs() {
    this.setState({ items: getAllFavs() });
  }

  render() {
    return (
      <Favorites
        {...this.state}
        favorites={this.props.favorites}
        onRemoveFavorite={this.handleRemoveFavorite}
        onSelect={this.handleVideoSelected}
      />
    );
  }
}