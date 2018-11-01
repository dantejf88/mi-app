import React from 'react';
import PhraseButton from "./PhraseButton"
import { mount } from 'enzyme';

describe('PhraseButton', () => {
    let phraseButton;
    let getPhrase;
    let mappedAppState = {loggedIn: false,
                          phrase: "",
                          userCreated: false}   
      getPhrase = jest.fn();
      phraseButton = mount(<PhraseButton getPhrase={getPhrase} mappedAppState={mappedAppState} />); 
        
        it('PhraseButton requires getPhrase prop', () => {
            expect(phraseButton.props().getPhrase).toBeDefined();
        });
        
        it('PhraseButton renders button', () => {
            const button = phraseButton.find('button').first();
            expect(button).toBeDefined();
        });
        it('Button click calls getPhrase', () => {
            const button = phraseButton.find('button').first();
            button.simulate('click');
            expect(getPhrase).toBeCalled();
          })
     phraseButton.unmount
  });