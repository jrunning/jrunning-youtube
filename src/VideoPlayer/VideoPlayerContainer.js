import React, { Component, PropTypes } from 'react';
import VideoPlayer from './VideoPlayer';

export default class VideoPlayerContainer extends Component {
  static propTypes = {
    video: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    console.log('didMount');
  }

  componentWillReceiveProps() {
    console.log('willReceiveProps');
  };

  render() {
    return <VideoPlayer data={this.state.data} />;
  }
}
