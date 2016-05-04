import React, { Component, PropTypes } from 'react';
import VideoPlayer from './VideoPlayer';
import { apiLoaded, getVideo } from '../lib/YouTube';

const noVideoStyle = { flex: '40%', margin: '1em' };

export default class VideoPlayerContainer extends Component {
  static propTypes = {
    isFavorite: PropTypes.bool,
    onToggleFavorite: PropTypes.func.isRequired,
    video: PropTypes.shape({
      channelTitle: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.state = { apiReady: false, statistics: null };
    this.handleResponseReceived = this.handleResponseReceived.bind(this);
  }

  componentDidMount() {
    apiLoaded(() => {
      this.setState({ apiReady: true });
      this.loadStatistics();
    });
  }

  componentWillReceiveProps(nextProps) {
    const videoId = this.videoId(nextProps);
    if (!this.state.apiReady) { return; }
    if (videoId === this.videoId()) { return; }
    this.loadStatistics(videoId);
  }

  shouldComponentUpdate({ isFavorite, ...nextProps }, { statistics }) {
    return !(
      this.videoId(nextProps) === this.videoId() &&
        isFavorite === this.props.isFavorite &&
        statistics === this.state.statistics
    );
  }

  handleResponseReceived({ statistics }) {
    this.setState({ statistics });
  }

  // If an object is given, return its `videoId` property; otherwise
  // return `this.props.videoId`.
  videoId(props) {
    const { video } = props || this.props;
    return video && video.videoId;
  }

  loadStatistics(videoId) {
    const id = videoId || this.videoId();
    if (!id) { return; }
    getVideo(id, this.handleResponseReceived);
    this.setState({ statistics: null });
  }

  render() {
    if (!this.props.video) {
      return <div style={noVideoStyle}>No video selected.</div>;
    }

    const onToggleFavorite =
      () => this.props.onToggleFavorite(this.props.video);

    return (
      <VideoPlayer
        channelTitle={this.props.video.channelTitle}
        isFavorite={this.props.isFavorite}
        onToggleFavorite={onToggleFavorite}
        videoId={this.videoId()}
        statistics={this.state.statistics}
        title={this.props.video.title}
      />
    );
  }
}
