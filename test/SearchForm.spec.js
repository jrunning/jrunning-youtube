import React from 'react';
import { shallow } from 'enzyme';

import SearchForm from '../src/SearchForm';

describe('<SearchForm/>', () => {
  let props;

  beforeEach(() => {
    props = { onSearch: () => {} };
  });

  it('should render the search box and submit button', () => {
    const wrapper = shallow(<SearchForm {...props}/>);
    const form = wrapper.find('form');
    expect(form).to.have.length(1);
    expect(form.find('input[type="text"]')).to.have.length(1);
    expect(form.find('input[type="submit"]')).to.have.length(1);
  });

  context('when its received props have a `value`', () => {
    beforeEach(() => {
      props = { ...props, value: "foo" };
    });

    it('should render the `value` prop in the search box', () => {
      const wrapper = shallow(<SearchForm {...props}/>);
      const searchBox = wrapper.find('input[type="text"]');
      expect(searchBox.prop('value')).to.equal(props.value);
    });

    it('should call `onChange` when the text box\'s value changes', () => {
      props = { ...props, onChange: sinon.spy() };
      const wrapper = shallow(<SearchForm {...props}/>);
      const searchBox = wrapper.find('input[type="text"]');

      searchBox.value = 'bar';
      searchBox.simulate('change');
      expect(props.onChange).to.have.been.called;
    });

    it('should call `onSearch` when the submit button is clicked', () => {
      props = { ...props, onSearch: sinon.spy() };
      const wrapper = shallow(<SearchForm {...props}/>);

      wrapper.find('form').simulate('submit');
      expect(props.onSearch).to.have.been.called;
    });
  });
});
