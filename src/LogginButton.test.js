import React from 'react';
import LogginButton from "./LogginButton"
import { mount } from 'enzyme';

describe('LogginButton', () => {
    let logginButton;
    let loggin;
  
      loggin = jest.fn();
      logginButton = mount(<LogginButton loggin={loggin} />); 
        it('LogginButton requires loggin prop', () => {
            expect(logginButton.props().loggin).toBeDefined();
        });
        
        it('LogginButton renders button', () => {
            const button = logginButton.find('button').first();
            expect(button).toBeDefined();
        });
        it('Button click calls loggin', () => {
            const button = logginButton.find('button').first();
            const input1 = logginButton.find('input').first();

            input1.simulate('change', { target: { value: 'gonto' } });
 
            button.simulate('click');
            expect(loggin).toBeCalledWith("gonto");
          })
     
  });