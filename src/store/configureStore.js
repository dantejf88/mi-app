import {createStore, compose, applyMiddleware} from 'redux';
import { middleware } from '../middlewares/middleware';
import  reducers  from './index';



export default function configureStore(initialState) {


  const store = createStore(reducers, initialState, compose(
    applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );


  return store;
}

// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept('./reducers', () => {
//     const nextReducer = require('./reducers').default; // eslint-disable-line global-require
//     store.replaceReducer(nextReducer);
//   });
// }

// const initialState = {
//   nameField: "",
//   validField: "",
//   title: false
// }
//
// const store = createStore(
//   (state) => state,
//   initialState
// )
