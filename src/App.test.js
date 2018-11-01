import React from 'react';
import App from "./App"
import { shallow } from 'enzyme';

describe('App', () => {
    let app 
    app = shallow(<App />);
    it('App renders nested components', () => {
        expect(app.find('.LogginButton').length).toEqual(1);

      });
});