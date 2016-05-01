import gapi from '../support/mockGapi';

describe('YouTube', () => {
  let YouTube;

  beforeEach(() => {
    YouTube = require('../../src/lib/YouTube');
    gapi.init();
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../src/lib/YouTube')];
    gapi.reset();
  });

  describe('.apiLoaded', () => {
    context('when the Google API client has not finished loading', () => {
      it('does not invoke the given callback immediately', () => {
        const callback = sinon.spy();
        YouTube.apiLoaded(callback);
        expect(callback).not.to.have.been.called;
      });
    });

    context('when the Google API client has finished loading', () => {
      it('calls `gapi.client.setApiKey`', (done) => {
        YouTube.apiLoaded(() => {
          expect(window.gapi.client.setApiKey)
            .to.have.been.calledWith(sinon.match.string);
          done();
        });
      });

      context('when the YouTube API client has not finished loading', () => {
        it('calls `gapi.client.load`', () => {
          YouTube.apiLoaded(() => {});
          expect(window.gapi.client.load).to.have.been.calledWith('youtube', 'v3').once;
        });

        it('doesn\'t immediately call the given callback', () => {
          const callback = sinon.spy();
          YouTube.apiLoaded(callback);
          expect(callback).to.have.callCount(0);
        });

        it('eventually calls the given callback', (done) => {
          const callback = sinon.spy();
          YouTube.apiLoaded(callback);
          setTimeout(() => {
            expect(callback).to.have.callCount(1);
            done();
          }, 10);
        });
      });

      context('after the Google API client has finished loading', () => {
        beforeEach((done) => {
          YouTube.apiLoaded(() => done());
        });

        it('doesn\'t call `gapi.client.load` again', (done) => {
          YouTube.apiLoaded(() => {});

          setTimeout(() => {
            expect(window.gapi.client.load).to.have.callCount(1);
            done();
          }, 10);
        });

        it('calls the given callback immediately', () => {
          const callback = sinon.spy();
          YouTube.apiLoaded(callback);
          expect(callback).to.have.callCount(1);
        });
      });
    });
  });

  describe('.search', () => {
    const mockResponseItems = [
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

    const mockResponse = {
      result: { items: mockResponseItems }
    };

    beforeEach((done) => {
      gapi.setResponse(mockResponse);
      YouTube.apiLoaded(() => { done() });
    });

    it('calls `gapi.client.youtube.search.list` with the ' +
       'given query`', (done) => {
      const q = 'foo bar baz 1';
      const expectedParams = sinon.match({ q });

      YouTube.search(q, () => {
        expect(window.gapi.client.youtube.search.list)
          .to.have.been.calledWithMatch(expectedParams);
        done();
      });
    });

    it('returns the expected results', (done) => {
      YouTube.search('foo', (results) => {
        expect(results).to.have.length(mockResponseItems.length);
        expect(results[0]).to.have
          .any.keys('kind', 'videoId', 'title', 'publishedAt');
        expect(results[0].publishedAt).to.be.a('date');
        done();
      });
    });
  });
});
