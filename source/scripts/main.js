// Web App Initter
// ===============
//
// This file configures Redux and kicks off the rendering of the web app.
//
// Import Modules
// --------------
//
// ### NPM Modules

import 'babel-core/polyfill';
import React from 'react'; // Required by JSX
import {render} from 'react-dom';
import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';
//import {reducer as formReducer} from 'redux-form';
import {Provider} from 'react-redux';
import Parse from 'parse';

// ### Local Modules

import {defaultState} from 'scripts/configs';
import {reduceToObject} from 'scripts/helpers';
import * as reducers from 'scripts/reducers';
import App from 'scripts/containers/App';

Parse.initialize('yGUSouDXykmrUW3BsIqy1x6vLVkWAQpK1jfJysOl', '8w3tKiUSBPvENZ2r59IAsd9GkfYmK52P48g7T8yw');

// Configure Redux Store
// ---------------------
//
// > configureStore : Function
//
// (Reducer, ?State) -> (
//   StoreCreator
//   -> StoreEnhancer: StoreCreator
//   -> StoreEnhancer: StoreCreator
// ): Store
//
// Apply the following [Redux middleware](https://github.com/rackt/redux/blob/master/docs/advanced/Middleware.md):
//
// * [Redux Promise](https://github.com/acdlite/redux-promise) - Enable promise-based async actions
// * [Redux Logger](https://github.com/fcomb/redux-logger) - Add action logger

function configureStore (initialState) {
  return compose(
    applyMiddleware(
      ReduxPromise,
      createLogger()
    )
  )(
    createStore
  )(
    combineReducers(
      defaultState::reduceToObject((_, stateName) => combineReducers(reducers[stateName]))
    ),

    initialState
  );
}

// Render the Web App
// ------------------
//
// Render the React entry container `< App/>` - which is wrapped inside the Redux container `< Provider/>` - in `<#app/>`.

render(
  <Provider store = {configureStore()}>
    <App/>
  </Provider>,

  document.getElementById('app')
);
