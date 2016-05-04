import React from 'react';
import { shallow } from 'enzyme';

import Search from '../../src/Search/Search';
import VideoList from '../../src/VideoList/VideoList';
import SearchFormContainer from '../../src/Search/SearchFormContainer';

describe('<Search/>', () => {
  let props;

  beforeEach(() => {
    props = { onSearch: sinon.spy() };
  });

  it('renders a SearchFormContainer', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find(SearchFormContainer)).to.have.length(1);
  });

  it('renders a VideoList component and passes `state.results` as ' +
     'its `props.results`', () => {
    props = { ...props, results: [ 'foo', 'bar', 'baz' ] };
    const wrapper = shallow(<Search {...props} />);
    const videoList = wrapper.find(VideoList);
    expect(videoList).to.have.length(1);
    expect(videoList.prop('items')).to.eql(props.results);
  });
});
