export const item = {
  kind: 'youtube#video',
  etag: '\'kiOs9cZLH2FUp6r6KJ8eyq_LIOk/OQu6Yo-zGc-wtL57iMUYhyvTQ0c\'',
  id: '9NoBh0hXaYg',
  player: {
    embedHtml: '<iframe width="640" height="360" src="//www.youtube.com/embed/9NoBh0hXaYg" frameborder="0" allowfullscreen></iframe>'
  }
};

const response = {
  result: {
    kind: 'youtube#videoListResponse',
    etag: '"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/Ilts62GmJPFQg68grRyUfTvdx2U"',
    pageInfo: { totalResults: 1, resultsPerPage: 1 },
    items: [ item ]
  },
  body: '{\n "kind": "youtube#videoListResponse",\n "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/Ilts62GmJPFQg68grRyUfTvdx2U\"",\n "pageInfo": {\n  "totalResults": 1,\n  "resultsPerPage": 1\n },\n "items": [\n  {\n   "kind": "youtube#video",\n   "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/OQu6Yo-zGc-wtL57iMUYhyvTQ0c\"",\n   "id": "9NoBh0hXaYg",\n   "player": {\n    "embedHtml": "\\u003ciframe width=\"640\" height=\"360\" src=\"//www.youtube.com/embed/9NoBh0hXaYg\" frameborder=\"0\" allowfullscreen\\u003e\\u003c/iframe\\u003e"\n   }\n  }\n ]\n}\n',
  headers: {
    date: 'Sun, 01 May 2016 20:45:26 GMT',
    'content-encoding': 'gzip',
    server: 'GSE',
    etag: '"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/Ilts62GmJPFQg68grRyUfTvdx2U"',
    vary: 'Origin, X-Origin',
    'content-type': 'application/json; charset=UTF-8',
    'cache-control': 'private, max-age=0, must-revalidate, no-transform',
    'content-length': '339',
    expires: 'Sun, 01 May 2016 20:45:26 GMT'
  },
  status: 200,
  statusText: null
};

export default response;
