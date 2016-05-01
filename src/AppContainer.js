import React, { Component } from 'react';
import App from './App';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedVideo: null };
    this.handleVideoSelected = this.handleVideoSelected.bind(this);
  }

  handleVideoSelected(selectedVideo) {
    this.setState({ selectedVideo });
  }

  render() {
    return (
      <App
        onSelectVideo={this.handleVideoSelected}
        selectedVideo={this.state.selectedVideo}
      />
    );
  }
}
