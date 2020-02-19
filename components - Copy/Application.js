import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import stackDEBUG from './stackDEBUG';
import MapScreen from './map/index';
import SearchScreen from './search/index';
import ListScreen from './lists/index';
import ScannerScreen from './scanner/index';

const Application = createBottomTabNavigator(
  {
    //Landing: { screen: stackDEBUG, },
    Map: { screen: MapScreen, },
    Scanner: { screen: ScannerScreen, },
    Lists: { screen: ListScreen },
    Search: { screen: SearchScreen, },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Map') {
          iconName = focused ? 'ios-home' : 'ios-home';
          } else if (routeName === 'Scanner') {
          iconName = focused ? 'ios-camera' : 'ios-camera';
          } else if (routeName === 'Lists') {
          iconName = focused ? 'ios-list' : 'ios-list';
          } else if (routeName === 'Search') {
          iconName = focused ? 'ios-search' : 'ios-search';
        }
        
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#d4d4d4',
      style: {
        borderWidth: 0,
      }
    },
  }
);

export default createAppContainer(Application);
