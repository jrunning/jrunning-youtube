import {
  addFav,
  isFav,
  getAllFavs,
  getFav,
  listFavs,
  removeFav,
} from '../../src/lib/Favs';

describe('Favs', () => {
  const existingItem = {
    videoId: 'abadcafe',
    title: 'Item 1',
    publishedAt: new Date('2009-10-03T04:46:14.000Z'),
  };

  const mockItem = {
    videoId: 'deadbeef',
    title: 'Item 2',
    publishedAt: new Date('2011-06-03T05:29:52.000Z'),
  };

  beforeEach(() => {
    sinon.spy(window.localStorage, 'getItem');
    sinon.spy(window.localStorage, 'removeItem');
    sinon.spy(window.localStorage, 'setItem');
  });

  afterEach(() => {
    window.localStorage.getItem.restore();
    window.localStorage.removeItem.restore();
    window.localStorage.setItem.restore();
    window.localStorage.clear();
  });

  describe('.addFav', () => {
    it('saves the given item to localStorage', () => {
      addFav(mockItem);
      expect(window.localStorage.setItem).to.have.been.calledWith(
        `favorites:${mockItem.videoId}`, JSON.stringify(mockItem)
      );
    });

    it('adds the given item to the index', () => {
      addFav(mockItem);

      expect(window.localStorage.setItem).to.have.been.calledWith(
        'favorites:index',
        `["favorites:${mockItem.videoId}"]`,
      );
    });

    context('when another item has already been stored', () => {
      beforeEach(() => {
        addFav(existingItem);
        window.localStorage.setItem.reset(); // reset spy
      });

      it('appends the given item to the existing index', () => {
        addFav(mockItem);

        expect(window.localStorage.setItem).to.have.been.calledWith(
          'favorites:index',
          `["favorites:${existingItem.videoId}","favorites:${mockItem.videoId}"]`,
        );
      });
    });
  });

  describe('.getFav', () => {
    beforeEach(() => {
      addFav(existingItem);
    });

    context('when the item doesn\'t exist in localStorage', () => {
      it('returns undefined', () => {
        expect(getFav(mockItem.videoId)).to.equal(undefined);
      });
    });

    context('when the item exists in localStorage', () => {
      beforeEach(() => {
        addFav(mockItem);
      });

      it('returns the given item', () => {
        const fav = getFav(mockItem.videoId);
        expect(window.localStorage.getItem).to.have.been.calledWith(`favorites:${mockItem.videoId}`);
        expect(fav).to.eql(mockItem);
      });
    });
  });

  describe('.getAllFavs', () => {
    context('when no items have been stored', () => {
      it('returns an empty array', () => {
        expect(getAllFavs()).to.eql([]);
      });
    });

    context('when items have been stored', () => {
      beforeEach(() => {
        addFav(existingItem);
        addFav(mockItem);
      });

      it('returns the items as an array', () => {
        expect(getAllFavs()).to.eql([ existingItem, mockItem ]);
      });
    });
  });

  describe('.isFav', () => {
    beforeEach(() => {
      addFav(existingItem);
    });

    it('returns true for an item that has been stored', () => {
      expect(isFav(existingItem.videoId)).to.equal(true);
    });

    it('returns false for an item that has not been stored', () => {
      expect(isFav(mockItem.videoId)).to.equal(false);
    });
  });

  describe('.listFavs', () => {
    context('when no items have been stored', () => {
      it('returns an empty array', () => {
        expect(listFavs()).to.eql([]);
      });
    });

    context('when items have been stored', () => {
      beforeEach(() => {
        addFav(existingItem);
        addFav(mockItem);
      });

      it('returns an array of videoIds', () => {
        expect(listFavs()).to.eql([ existingItem.videoId, mockItem.videoId ]);
      });
    });
  });

  describe('.removeFav', () => {
    beforeEach(() => {
      addFav(existingItem);
      addFav(mockItem);
    });

    it('removes the given item from localStorage', () => {
      expect(getFav(mockItem.videoId)).not.to.equal(undefined);
      removeFav(mockItem.videoId);

      expect(window.localStorage.removeItem)
        .to.have.been.calledWith(`favorites:${mockItem.videoId}`);
      expect(getFav(mockItem.videoId)).to.equal(undefined);
    });

    it('removes the given item from the index', () => {
      expect(listFavs()).to.eql([ existingItem.videoId, mockItem.videoId ]);
      removeFav(mockItem.videoId);

      expect(listFavs()).to.eql([ existingItem.videoId ]);
    });
  });
});
