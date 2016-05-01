import React from 'react';
import { shallow } from 'enzyme';
import { transformedItem as item } from '../data/search';

import SearchResult from '../../src/Search/SearchResult';

describe('<SearchResult/>', () => {
  let onSelect;
  let wrapper;

  beforeEach(() => {
    onSelect = sinon.spy();
    wrapper = shallow(
      <SearchResult data={item} onSelect={onSelect} />
    );
  });

  it('renders a link with a header and thumbnail image', () => {
    const link = wrapper.find('a');
    expect(link.prop('onClick')).to.equal(onSelect);

    const header = link.find('h4');
    expect(header.prop('children')).to.equal(item.title);

    const thumbnail = link.find('img');
    expect(thumbnail.prop('src'))
      .to.equal(item.thumbnails.default.url);
  });

  it('invokes onSelect when the link is clicked', () => {
    const link = wrapper.find('a');
    link.simulate('click');
    expect(onSelect).to.have.callCount(1);
  });
});
