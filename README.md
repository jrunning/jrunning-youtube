jrunning-youtube
================
A simple YouTube API client.

### Usage

This application requires a Google API key with the Google Maps
JavaScript API and Google Maps JavaScript API services enabled. Read
the [API Client Library for JavaScript Getting Started guide] for
instructions.

```sh
export YOUTUBE_API_KEY=xxxxxxxxx...
npm install
npm start
open http://localhost:3000
```

[API Client Library for JavaScript Getting Started guide]: https://developers.google.com/api-client-library/javascript/start/start-js

### Tests

Tests are incomplete. ☹️

```sh
npm test
```

Notes
=====

Unapologetically ES2015+. Thanks, [Babel]!

[Babel]: https://babeljs.io/

Search
------
Search is powered by `src/lib/YouTube.js`, a wrapper around
`window.gapi.client.youtube`. Since the Google JavaScript API Client
doesn't play well with any module loader, it's loaded in a `<script>`
tag and `YouTube.js` provides an `apiLoaded` method that invokes a
callback when the API is ready. This lets us (for example) disable the
Search button until the API is ready.

Filter by location uses [React Geosuggest] and the Google Maps
Places API.

[React Geosuggest]: https://github.com/ubilabs/react-geosuggest

Favorites
---------
Favorites are stored locally using localStorage and persist between
sessions.

When a video is favorited it's stored as a JSON object with the key
`favorites:${videoId}`. Additionally an index of keys as a JSON array is
stored with the key `favorites:index`.

Check out `src/lib/Favs.js` to see how the sausage is made.

Video player
------------
The video player uses [react-youtube-player] because it's more
flexible than the `embedHtml` provided by the search API.

[react-youtube-player]: https://github.com/gajus/react-youtube-player/

Miscellaneous
-------------
### Smart components and dumb components
All data and state are stored in "smart" container components, e.g.
SearchFormContainer. All rendering is done by "dumb" stateless
functional components, e.g. SearchForm. This requires passing both event
handlers and data down through many layers of parents and children. If
more features were added, it would be more than advisable to switch to a
data/state system like [Redux].

[Redux]: http://redux.js.org/
