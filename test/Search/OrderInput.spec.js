import React from 'react';
import { shallow } from 'enzyme';

import OrderInput from '../../src/Search/OrderInput';

describe('<OrderInput/>', () => {
  let props;

  beforeEach(() => {
    props = { onChange: sinon.spy() };
  });

  it('should render three radio buttons', () => {
    const wrapper = shallow(<OrderInput {...props} />);
    const radios = wrapper.find('input[type="radio"]');

    expect(radios).to.have.length(3);
  });

  it('should call `onChangeOrder` when the order radio buttons are clicked', () => {
    const wrapper = shallow(<OrderInput {...props} />);

    wrapper.find('input[type="radio"]').forEach((radio) => {
      // React fires 'change' events instead of 'click' when radio
      // buttons are clicked
      radio.simulate('change');
    });

    expect(props.onChange).to.have.callCount(3);
  });
});
