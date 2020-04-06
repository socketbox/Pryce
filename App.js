import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducers from './components/account/reducers/index'
import { NavigationContainer } from '@react-navigation/native';

import Container from './components/account/containers/container'

const store = createStore(reducers);

export default class App extends React.Component {
	render() {
		return (
		<Provider store={store}>
			<NavigationContainer>
				<Container />
			</NavigationContainer>
		</Provider>
		);
	}
}
