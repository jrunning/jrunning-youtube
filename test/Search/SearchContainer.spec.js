import React from 'react';
import { shallow } from 'enzyme';

import SearchContainer from '../../src/Search/SearchContainer';
import Search from '../../src/Search/Search';

describe('<SearchContainer/>', () => {
  it('initially sets `state.results` to an empty array', () => {
    const wrapper = shallow(<SearchContainer/>);
    expect(wrapper.state('results')).to.eql([]);
  });

  it('renders a Search component and passes `state.results` as its ' +
     '`results` prop', () => {
    const wrapper = shallow(<SearchContainer/>);
    wrapper.setState({ results: [ 'foo' ] });

    const searchComponent = wrapper.find(Search);
    expect(searchComponent.prop('results')).to.eql(['foo']);
  });
});

