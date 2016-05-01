import React from 'react';
import { shallow } from 'enzyme';

import SearchResult from '../../src/Search/SearchResult';

describe('<SearchResult/>', () => {
  const mockResultData = {
    kind: 'youtube#video',
    videoId: 'SBjQ9tuuTJQ',
    publishedAt: new Date('2009-10-03T04:46:14.000Z'),
    channelId: 'UCGRjJrpD2bmk9Ilq6nq80qg',
    title: 'Foo Fighters - The Pretender',
    description: 'Foo Fighters\' official music video for \'The Pretender\'. Click to listen to Foo Fighters on Spotify: http://smarturl.it/FooFSpotify?IQid=FooFTP As featured on Greatest ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/default.jpg',
        width: 120, height: 90
      },
      medium: {
        url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg',
        width: 320, height: 180
      },
      high: {
        url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/hqdefault.jpg',
        width: 480, height: 360
      }
    },
    channelTitle: 'foofightersVEVO',
    liveBroadcastContent: 'none'
  };

  let onSelect;
  let wrapper;

  beforeEach(() => {
    onSelect = sinon.spy();
    wrapper = shallow(
      <SearchResult data={mockResultData} onSelect={onSelect} />
    );
  });

  it('renders a link with a header and thumbnail image', () => {
    const link = wrapper.find('a');
    expect(link.prop('onClick')).to.equal(onSelect);

    const header = link.find('h4');
    expect(header.prop('children')).to.equal(mockResultData.title);

    const thumbnail = link.find('img');
    expect(thumbnail.prop('src'))
      .to.equal(mockResultData.thumbnails.default.url);
  });

  it('invokes onSelect when the link is clicked', () => {
    const link = wrapper.find('a');
    link.simulate('click');
    expect(onSelect).to.have.callCount(1);
  });
});
