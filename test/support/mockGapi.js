/* mockGapi
 * --------
 * A limited mock Google APIs JavaScript client providing spies for API
 * request methods.
 */
let gapi;
let response;

function mockReturnsPromise() {
  const then = (callback) => setTimeout(() => callback(response), 0);
  return sinon.spy((params) => ({ then }));
}

function mockYoutube() {
  return {
    search: { list: mockReturnsPromise() },
    videos: { list: mockReturnsPromise() }
  };
}

function mockLoad() {
  const then = (callback) => {
    setTimeout(callback, 0);
  };

  return sinon.spy((callback) => {
    gapi.client.youtube = mockYoutube();
    return { then };
  });
}

export function reset() {
  delete window.gapi;

  gapi = {
    client: {
      load: mockLoad(),
      setApiKey: sinon.spy(),
    }
  };

  response = undefined;
};
reset();

export function init() {
  window.gapi = gapi;
}

export function setResponse(_response) {
  response = _response;
}

export default { init, reset, setResponse };
