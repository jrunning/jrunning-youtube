import gapi from '../support/mockGapi';
import { inspect } from 'util';

import searchResponse, { rawItems as searchResponseItems } from '../data/search';
import getVideoResponse, { item as getVideoResponseItem } from '../data/video';

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
    function withSearchParams(_searchParams) {
      return {
        itCallsVideosListWith(_expectedParams) {
          context(`when ${inspect(_searchParams)} is given`, () => {
            beforeEach(() => {
              searchParams = { ...searchParams, ..._searchParams };
              expectedParams = { ...expectedParams, ..._expectedParams };
            });

            it(`calls \`gapi.client.youtube.videos.list\` with ${inspect(_expectedParams)}`, (done) => {
              YouTube.search(q, searchParams, () => {
                expect(window.gapi.client.youtube.search.list)
                  .to.have.been.calledWith(sinon.match(expectedParams));
                done();
              });
            });
          });
        }
      };
    }

    let searchParams;
    let expectedParams;
    let q = 'foo bar baz 1';

    beforeEach((done) => {
      searchParams = {};
      expectedParams = { q };
      gapi.setResponse(searchResponse);
      YouTube.apiLoaded(() => { done() });
    });

    it('calls `gapi.client.youtube.search.list` with the ' +
       'given query`', (done) => {

      YouTube.search(q, () => {
        expect(window.gapi.client.youtube.search.list)
          .to.have.been.calledWith(sinon.match(expectedParams));
        done();
      });
    });

    it('returns the expected results', (done) => {
      YouTube.search('foo', (results) => {
        expect(results).to.have.length(searchResponseItems.length);
        expect(results[0]).to.have
          .any.keys('kind', 'videoId', 'title', 'publishedAt', 'channelTitle');
        expect(results[0].publishedAt).to.be.a('date');
        done();
      });
    });

    withSearchParams({ order: 'date' })
      .itCallsVideosListWith({ order: 'date' });

    withSearchParams({ order: 'rating' })
      .itCallsVideosListWith({ order: 'rating' });

    withSearchParams({ order: 'relevance' })
      .itCallsVideosListWith({ order: 'relevance' });

    withSearchParams({ location: '37.42307,-122.08427' })
      .itCallsVideosListWith({
        location: '37.42307,-122.08427',
        locationRadius: '5mi'
      });
  });

  describe('.getVideo', () => {
    let expectedParams;

    beforeEach((done) => {
      expectedParams = {
        id: 'foo-bar-baz',
        part: 'statistics'
      };
      gapi.setResponse(getVideoResponse);
      YouTube.apiLoaded(() => { done() });
    });

    it('calls `gapi.client.youtube.videos.list` with the ' +
       'given video id`', (done) => {
      const id = getVideoResponseItem.id;

      YouTube.getVideo('foo-bar-baz', () => {
        expect(window.gapi.client.youtube.videos.list)
          .to.have.been.calledWith(sinon.match(expectedParams));
        done();
      });
    });

    it('returns the expected result', (done) => {
      YouTube.getVideo('foo-bar-baz', (result) => {
        expect(result).to.equal(getVideoResponseItem);
        done();
      });
    });
  });
});
