import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startLoginSpy;

beforeEach(() => {
    startLoginSpy = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);
})

test('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();
})