import React from 'react';
import LogginButton from "./LogginButton"
import { mount } from 'enzyme';

describe('LogginButton', () => {
    let logginButton;
    let loggin;
    let mappedAppState = {loggedIn: false,
                          phrase: "",
                          userCreated: false}   
      loggin = jest.fn();

      logginButton = mount(<LogginButton loggin={loggin} mappedAppState={mappedAppState} />); 
        
        it('LogginButton requires loggin prop', () => {
            expect(logginButton.props().loggin).toBeDefined();
        });
        
        it('LogginButton requires mappedAppState prop', () => {
            expect(logginButton.props().mappedAppState).toBeDefined();
        })

        it('LogginButton renders button', () => {
            const button = logginButton.find('button').first();
            expect(button).toBeDefined();
        });
        it('Button click calls loggin', () => {
            const button = logginButton.find('button').first();
            const input1 = logginButton.find('input').first();
            const input2 = logginButton.find('input').last();
            input1.simulate('change', { target: { value: 'gonto' } });
            input2.simulate('change', { target: { value: 'gonto' } });
            button.simulate('click');
            expect(loggin).toBeCalled();
          })
          logginButton.unmount
  });