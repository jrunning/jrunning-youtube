describe('youtubeLoaded', () => {
  let youtubeLoaded;

  beforeEach(() => {
    youtubeLoaded = require('../../src/lib/youtubeLoaded').default;
    window.gapi = undefined;
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../src/lib/youtubeLoaded')];
  });

  context('when the Google API client has not finished loading', () => {
    it('does not invoke the given callback immediately', () => {
      const callback = sinon.spy();
      youtubeLoaded(callback);
      expect(callback).not.to.have.been.called;
    });
  });

  context('when the Google API client has finished loading', () => {
    let mockGapi;
    let mockThen;

    beforeEach(() => {
      mockThen = sinon.spy((fn) => setTimeout(fn, 0));
      mockGapi = {
        client: {
          load: sinon.spy(() => ({ then: mockThen })),
          setApiKey: sinon.spy()
        }
      };
      window.gapi = mockGapi;
    });

    it('calls `gapi.client.setApiKey`', (done) => {
      youtubeLoaded(() => {
        expect(mockGapi.client.setApiKey)
          .to.have.been.calledWith(sinon.match.string);
        done();
      });
    });

    context('when the YouTube API client has not finished loading', () => {
      it('calls `gapi.client.load`', () => {
        youtubeLoaded(() => {});
        expect(mockGapi.client.load).to.have.been.calledWith('youtube', 'v3').once;
      });

      it('doesn\'t immediately call the given callback', () => {
        const callback = sinon.spy();
        youtubeLoaded(callback);
        expect(callback).to.have.callCount(0);
      });

      it('eventually calls the given callback', (done) => {
        const callback = sinon.spy();
        youtubeLoaded(callback);
        setTimeout(() => {
          expect(callback).to.have.callCount(1);
          done();
        }, 10);
      });
    });

    context('after the Google API client has finished loading', () => {
      beforeEach((done) => {
        youtubeLoaded(done);
      });

      it('doesn\'t call `gapi.client.load` again', (done) => {
        youtubeLoaded(() => {});

        setTimeout(() => {
          expect(mockGapi.client.load).to.have.callCount(1);
          done();
        }, 10);
      });

      it('calls the given callback immediately', () => {
        const callback = sinon.spy();
        youtubeLoaded(callback);
        expect(callback).to.have.callCount(1);
      });
    });
  });
});
