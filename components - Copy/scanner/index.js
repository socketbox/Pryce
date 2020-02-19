import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import Item from '../item/index';
import Scanner from './Scanner';

const ScannerScreen = createStackNavigator({
  Landing: {
    screen: stackDEBUG,
    navigationOptions: {
      headerShown: false
    } 
  },
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      headerShown: false
    }
  },
  Item: {
    screen: Item,
    navigationOptions: {
      headerShown: false
    }
  },
});

export default createAppContainer(ScannerScreen);