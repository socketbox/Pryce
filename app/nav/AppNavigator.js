import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home.js';
import Camera from '../screens/Camera.js';
import Search from '../screens/Search.js';


import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Camera: { screen: Camera,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
      }), 
    },
    Search: { screen: Search },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home';
            } else if (routeName === 'Camera') {
          iconName = focused ? 'ios-camera' : 'ios-camera';
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

export default createAppContainer(TabNavigator);