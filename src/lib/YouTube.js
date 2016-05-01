/* YouTube
 * -------
 * A wrapper around the Google APIs JavaScript client. Provides
 * simplified access to `gapi.client.youtube.search.list`, etc.
 */
import { youtube as config } from '../../config';

const LOAD_POLL_INTERVAL = 50; // ms
const MAX_RESULTS = 20;
const DEFAULT_PARAMS = {
  maxResults: MAX_RESULTS,
  part: 'snippet',
  type: 'video',
};

let apiReady = false;
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

  setTimeout(() => clientLoaded(callback), LOAD_POLL_INTERVAL);
}

// Invokes its callback when the YouTube Data API client has loaded. The
// callback will be passed the YouTube API client object.
export function apiLoaded(callback) {
  if (apiReady) {
    callback(youtube);
    return;
  }

  clientLoaded(client => {
    client.load('youtube', 'v3').then(() => {
      apiReady = true;
      youtube = client.youtube;
      callback(youtube);
    });
  });
}

/* Transform result object to simplified, flat object with the following
 * properties:
 * - kind (String)
 * - videoId (String)
 * - title (String)
 * - channelId (String)
 * - channelTitle (String)
 * - description (String)
 * - publishedAt (Date)
 * - thumbnails (Object)
 */
function transformItem({ id: { kind, videoId }, snippet }) {
  const publishedAt = new Date(snippet.publishedAt);
  return { kind, videoId, ...snippet, publishedAt };
}

function handleResponse(callback) {
  return function ({ result: { items } }) {
    callback(items.map(transformItem));
  };
}

function handleError({ result }) {
  // TODO Better error handling
  throw new Error(`YouTube API error: ${result.error.message}`);
}

export function search(q, callback) {
  if (!apiReady) { throw new Error('YouTube API not yet loaded!'); }
  youtube.search.list({ ...DEFAULT_PARAMS, q })
    .then(handleResponse(callback));
}

const YouTube = { apiLoaded, search };

export default YouTube;
