/* Favs
 * ----
 * An interface for storing favorites in localStorage.
 *
 * Exports:
 * - addFav(video)
 * - getFav(videoId)
 * - getAllFavs()
 * - isFav(videoId)
 * - listFavs()
 * - removeFav(videoId)
 */
const KEY_PREFIX = 'favorites:';
const INDEX_KEY = `${KEY_PREFIX}index`;

function idToKey(id) {
  return `${KEY_PREFIX}${id}`;
}

function keyToId(key) {
  return key.split(':')[1];
}

function keyFor({ videoId }) {
  return idToKey(videoId);
}

function itemFromString(item) {
  const obj = JSON.parse(item);

  if (obj.publishedAt) {
    obj.publishedAt = new Date(obj.publishedAt);
  }

  return obj;
}

function itemToString(item) {
  return JSON.stringify(item);
}

function getIndex() {
  const indexJSON = window.localStorage.getItem(INDEX_KEY);
  return indexJSON ? JSON.parse(indexJSON) : [];
}

function writeIndex(index) {
  window.localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}

function addToIndex(key) {
  const index = getIndex();

  if (index.indexOf(key) >= 0) {
    // Already exists
    return;
  }

  index.push(key);
  writeIndex(index);
}

function removeFromIndex(key) {
  const index = getIndex();
  let idx;

  while ((idx = index.indexOf(key)) >= 0) {
    index.splice(idx, 1);
  }

  writeIndex(index);
}

// Add the given video object to favorites.
export function addFav(item) {
  const key = keyFor(item);
  window.localStorage.setItem(keyFor(item), itemToString(item));
  addToIndex(key);
}

// Return the video object from favorites with the given videoId or
// `undefined` if it doesn't exist.
export function getFav(id) {
  const itemJSON = window.localStorage.getItem(idToKey(id));
  return itemJSON && itemFromString(itemJSON);
}

// Return all of the video objects from favorites as an array.
export function getAllFavs() {
  return getIndex().map((key) => getFav(keyToId(key)));
}

// Return true if the given videoId is a favorite or false otherwise.
export function isFav(id) {
  return !!getFav(id);
}

// Return the videoIds of all favorites as an array.
export function listFavs() {
  return getIndex().map((key) => keyToId(key));
}

// Remove the video with the given videoId from favorites. Return `undefined` on success or failure.
export function removeFav(id) {
  const key = idToKey(id);
  window.localStorage.removeItem(key);
  removeFromIndex(key);
}

const Favs = { addFav, getFav, getAllFavs, isFav, listFavs, removeFav };

export default Favs;
