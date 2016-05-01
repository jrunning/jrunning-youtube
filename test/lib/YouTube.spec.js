import gapi from '../support/mockGapi';
import response, { rawItems } from '../data/search';

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
    beforeEach((done) => {
      gapi.setResponse(response);
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
        expect(results).to.have.length(rawItems.length);
        expect(results[0]).to.have
          .any.keys('kind', 'videoId', 'title', 'publishedAt');
        expect(results[0].publishedAt).to.be.a('date');
        done();
      });
    });
  });
});
