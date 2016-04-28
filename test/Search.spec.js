import React from 'react';
import { shallow } from 'enzyme';

import Search from '../src/Search';
import SearchResults from '../src/SearchResults';
import SearchFormContainer from '../src/SearchFormContainer';

describe('<Search/>', () => {
  let props;

  beforeEach(() => {
    props = { onSearch: sinon.spy() };
  });

  it('renders a SearchFormContainer', () => {
    const wrapper = shallow(<Search {...props}/>);
    expect(wrapper.find(SearchFormContainer)).to.have.length(1);
  });

  it('renders a SearchResults component and passes `state.results` as ' +
     'its `props.results`', () => {
    props = { ...props, results: ['foo', 'bar', 'baz'] };
    const wrapper = shallow(<Search {...props}/>);
    const searchResults = wrapper.find(SearchResults);
    expect(searchResults).to.have.length(1);
    expect(searchResults.prop('results')).to.eql(props.results);
  });
});
