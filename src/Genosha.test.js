import React from 'react';
import { shallow } from 'enzyme';
import Genosha from './Genosha';

describe('Genosha', () => {
  it('Genosha renders GENOSHA', () => {
    const genosha = shallow(<Genosha />);
    expect(genosha.find('div').text()).toEqual('GENOSHA');
  });
  it('Genosha snapshot', () => {
    const genosha = shallow(<Genosha />);
    expect(genosha).toMatchSnapshot;
  });
});