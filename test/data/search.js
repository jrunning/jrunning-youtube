export const rawItems = [
  { kind: "youtube#searchResult",
    etag: "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/OiiKsk3ygpNpEL3OVLYLnt5W4ig\"",
    id: { kind: "youtube#video", videoId: "SBjQ9tuuTJQ" },
    snippet: {
      publishedAt: "2009-10-03T04:46:14.000Z",
      channelId: "UCGRjJrpD2bmk9Ilq6nq80qg",
      title: "Foo Fighters - The Pretender",
      description: "Foo Fighters' official music video for 'The Pretender'. Click to listen to Foo Fighters on Spotify: http://smarturl.it/FooFSpotify?IQid=FooFTP As featured on Greatest ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/default.jpg",
          width: 120, height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg",
          width: 320, height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/hqdefault.jpg",
          width: 480, height: 360
        }
      },
      channelTitle: "foofightersVEVO",
      liveBroadcastContent: "none"
    }
  },
  { kind: "youtube#searchResult",
    etag: "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/KfFSC3VpLbYrGp0_gVPr_P87idc\"",
    id: { kind: "youtube#video", videoId: "4PkcfQtibmU" },
    snippet: {
      publishedAt: "2011-06-03T05:29:52.000Z",
      channelId: "UCi2KNss4Yx73NG0JARSFe0A",
      title: "Foo Fighters. Walk.",
      description: "Buy Wasting Light here http://bit.ly/ftbVXi Tickets for rock shows here http://www.foofighters.com/us/tour.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4PkcfQtibmU/default.jpg",
          width: 120, height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/4PkcfQtibmU/mqdefault.jpg",
          width: 320, height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/4PkcfQtibmU/hqdefault.jpg",
          width: 480, height: 360
        }
      },
      channelTitle: "Foo Fighters",
      liveBroadcastContent: "none"
    }
  },
  { kind: "youtube#searchResult",
    etag: "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/2BWGN2-jMc_DXtog9gfjbJf5Qq0\"",
    id: { kind: "youtube#video", videoId: "eBG7P-K-r1Y" },
    snippet: {
      publishedAt: "2009-10-03T04:49:58.000Z",
      channelId: "UCGRjJrpD2bmk9Ilq6nq80qg",
      title: "Foo Fighters - Everlong",
      description: "Foo Fighters' official music video for 'Everlong'. Click to listen to Foo Fighters on Spotify: http://smarturl.it/FooFSpotify?IQid=FooFEL As featured on Greatest Hits.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/default.jpg",
          width: 120, height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/mqdefault.jpg",
          width: 320, height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/hqdefault.jpg",
          width: 480, height: 360
        }
      },
      channelTitle: "foofightersVEVO",
      liveBroadcastContent: "none"
    }
  }
];

export const transformedItem = {
  kind: "youtube#video",
  videoId: "SBjQ9tuuTJQ",
  publishedAt: new Date("2009-10-03T04:46:14.000Z"),
  channelId: "UCGRjJrpD2bmk9Ilq6nq80qg",
  title: "Foo Fighters - The Pretender",
  description: "Foo Fighters' official music video for 'The Pretender'. Click to listen to Foo Fighters on Spotify: http://smarturl.it/FooFSpotify?IQid=FooFTP As featured on Greatest ...",
  thumbnails: {
    default: {
      url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/default.jpg",
      width: 120, height: 90
    },
    medium: {
      url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg",
      width: 320, height: 180
    },
    high: {
      url: "https://i.ytimg.com/vi/SBjQ9tuuTJQ/hqdefault.jpg",
      width: 480, height: 360
    }
  },
};

export const transformedItems = [
  transformedItem,
  { kind: "youtube#video",
    videoId: "4PkcfQtibmU",
    publishedAt: new Date("2011-06-03T05:29:52.000Z"),
    channelId: "UCi2KNss4Yx73NG0JARSFe0A",
    title: "Foo Fighters. Walk.",
    description: "Buy Wasting Light here http://bit.ly/ftbVXi Tickets for rock shows here http://www.foofighters.com/us/tour.",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/4PkcfQtibmU/default.jpg",
        width: 120, height: 90
      },
      medium: {
        url: "https://i.ytimg.com/vi/4PkcfQtibmU/mqdefault.jpg",
        width: 320, height: 180
      },
      high: {
        url: "https://i.ytimg.com/vi/4PkcfQtibmU/hqdefault.jpg",
        width: 480, height: 360
      }
    },
  },
  { kind: "youtube#video",
    videoId: "eBG7P-K-r1Y",
    publishedAt: new Date("2009-10-03T04:49:58.000Z"),
    channelId: "UCGRjJrpD2bmk9Ilq6nq80qg",
    title: "Foo Fighters - Everlong",
    description: "Foo Fighters' official music video for 'Everlong'. Click to listen to Foo Fighters on Spotify: http://smarturl.it/FooFSpotify?IQid=FooFEL As featured on Greatest Hits.",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/default.jpg",
        width: 120, height: 90
      },
      medium: {
        url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/mqdefault.jpg",
        width: 320, height: 180
      },
      high: {
        url: "https://i.ytimg.com/vi/eBG7P-K-r1Y/hqdefault.jpg",
        width: 480, height: 360
      }
    },
  }
];

export default { result: { items: rawItems } };
