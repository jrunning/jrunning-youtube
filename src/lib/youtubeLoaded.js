import { youtube as config } from '../../config';

const POLL_INTERVAL = 50; // ms
let youtubeHasLoaded = false;
let youtube = null;

// Invokes its callback when `gapi.client` is loaded (i.e. when the
// Google APIs JavaScript client finishes loading). Its callback will be
// passed the client object.
function clientLoaded(callback) {
  if (typeof(window.gapi) !== 'undefined' && window.gapi.client) {
    window.gapi.client.setApiKey(config.api_key);
    callback(window.gapi.client);
    return;
  }

  setTimeout(() => clientLoaded(callback), POLL_INTERVAL);
}

// Invokes its callback when the YouTube Data API client has loaded. The
// callback will be passed the YouTube API client object.
function youtubeLoaded(callback) {
  if (youtubeHasLoaded) {
    callback(youtube);
    return;
  }

  clientLoaded(client => {
    client.load('youtube', 'v3').then(() => {
      youtubeHasLoaded = true;
      youtube = client.youtube;
      callback(youtube);
    });
  });
}

export default youtubeLoaded;
