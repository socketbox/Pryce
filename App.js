import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TabNavigation from './app/nav/AppNavigator';
import AppContainer from './app/nav/index.js'


import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default function App() {
  return <AppContainer />
}