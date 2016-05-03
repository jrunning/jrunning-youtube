/* YouTube
 * -------
 * A wrapper around the Google APIs JavaScript client. Provides
 * simplified access to `gapi.client.youtube.search.list`, etc.
 */
import { youtube as config } from '../../config';

const LOAD_POLL_INTERVAL = 50; // ms

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

function ensureApiReady() {
  if (apiReady) { return; }
  throw new Error('YouTube API not yet loaded!');
}

// YouTube.search
const SEARCH_MAX_RESULTS = 20;
const SEARCH_DEFAULT_PARAMS = {
  maxResults: SEARCH_MAX_RESULTS,
  part: 'snippet',
  type: 'video',
};

/* Transform search result object to simplified, flat object with the
 * following properties:
 * - kind (String)
 * - videoId (String)
 * - title (String)
 * - channelId (String)
 * - channelTitle (String)
 * - description (String)
 * - publishedAt (Date)
 * - thumbnails (Object)
 */
function transformSearchResultItem({ id: { kind, videoId }, snippet }) {
  const publishedAt = new Date(snippet.publishedAt);
  return { kind, videoId, ...snippet, publishedAt };
}

function handleSearchResponse(callback) {
  return function ({ result: { items } }) {
    callback(items.map(transformSearchResultItem));
  };
}

function handleError({ result }) {
  // TODO Better error handling
  throw new Error(`YouTube API error: ${result.error.message}`);
}

// Searches YouTube for the given query and invokes the callback with
// the results (at most SEARCH_MAX_RESULTS).
export function search(q, callback) {
  ensureApiReady();
  youtube.search.list({ ...SEARCH_DEFAULT_PARAMS, q })
    .then(handleSearchResponse(callback), handleError);
}

// YouTube.getVideo
const GET_VIDEO_DEFAULT_PARAMS = { part: 'statistics' };

function handleGetVideosResponse(callback) {
  return function({ result: { items: [item,] } }) {
    callback(item);
  }
}

// Retrieves the video player embed code for the given video id and
// passes it to the given callback.
export function getVideo(id, callback) {
  ensureApiReady();
  youtube.videos.list({ ...GET_VIDEO_DEFAULT_PARAMS, id })
    .then(handleGetVideosResponse(callback), handleError);
}

const YouTube = { apiLoaded, search, getVideo };

export default YouTube;
