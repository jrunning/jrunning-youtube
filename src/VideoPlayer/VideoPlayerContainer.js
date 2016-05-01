import React, { Component, PropTypes } from 'react';
import VideoPlayer from './VideoPlayer';
import { apiLoaded, getVideo } from '../lib/YouTube';

export default class VideoPlayerContainer extends Component {
  static propTypes = {
    video: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      apiReady: false,
      embedHtml: null,
      videoIsLoaded: false,
    };
    this.handleResponseReceived = this.handleResponseReceived.bind(this);
  }

  componentDidMount() {
    apiLoaded(() => {
      this.setState({ apiReady: true })
      this.loadVideo();
    });
  }

  componentWillReceiveProps(nextProps) {
    const videoId = this.videoId(nextProps);
    if (!this.state.apiReady) { return; }
    if (videoId === this.props.videoId) { return; }
    this.loadVideo(videoId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.videoId === this.props.videoId &&
        nextState.embedHtml === this.state.embedHtml
    );
  }

  handleResponseReceived({ player: { embedHtml } }) {
    this.setState({
      embedHtml: { __html: embedHtml },
      videoIsLoaded: true,
    });
  }

  render() {
    if (!this.state.videoIsLoaded) {
      return <div>No video selected.</div>;
    }

    return (
      <VideoPlayer
        title={this.props.video.title}
        embedHtml={this.state.embedHtml}
      />
    );
  }

  videoId(props) {
    const video = (props || this.props).video;
    return video && video.videoId;
  }

  loadVideo(videoId) {
    const id = videoId || this.videoId();
    if (!id) { return; }
    getVideo(id, this.handleResponseReceived);
    this.setState({ embedHtml: null, videoIsLoaded: false });
  }
}
