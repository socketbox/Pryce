import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './components/account/reducers/index'

import AppNav from './components/AppNavigator';

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNav />
      </Provider>
    )
  }
}

export default App;