import React from 'react';
import { shallow } from 'enzyme';

import SearchFormContainer from '../../src/Search/SearchFormContainer';
import SearchForm from '../../src/Search/SearchForm';

describe('<SearchFormContainer/>', () => {
  let props;

  beforeEach(() => {
    props = { onSearch: () => {} };
  });

  it('should render the SearchForm component', () => {
    const wrapper = shallow(<SearchFormContainer {...props}/>);
    expect(wrapper.find(SearchForm)).to.have.length(1);
  });

  it('should update `state.value` when the SearchForm component\'s ' +
     '`props.onChange` is called', () => {
    const newValue = 'bar';
    const wrapper = shallow(<SearchFormContainer {...props}/>);
    const searchComponent = wrapper.find(SearchForm);

    searchComponent.prop('onChange')({ target: { value: newValue } });
    expect(wrapper.state('value')).to.equal(newValue);
  });

  it('should call `props.onSearch` with the search keywords when the ' +
     'SearchForm component\'s `props.onSearch` is called', () => {
    const keywords = 'foo bar';
    const props = { ...props, onSearch: sinon.spy() };
    const wrapper = shallow(<SearchFormContainer {...props}/>);
    const searchComponent = wrapper.find(SearchForm);

    wrapper.setState({ value: keywords });
    searchComponent.prop('onSearch')({ preventDefault: () => {} });
    expect(props.onSearch).to.have.been.calledWith(keywords);
  });

  context('when its received props have an `initialValue`', () => {
    beforeEach(() => {
      props = { ...props, initialValue: 'foo' };
    });

    it('should set `state.value` from `initialValue`', () => {
      const wrapper = shallow(<SearchFormContainer {...props}/>);
      expect(wrapper.state('value')).to.equal(props.initialValue);
    });

    it('should pass `initialValue` as the SearchForm component\'s ' +
       '`value` prop', () => {
      const wrapper = shallow(<SearchFormContainer {...props}/>);
      expect(wrapper.find(SearchForm).prop('value')).to.equal(props.initialValue);
    });
  });
});
