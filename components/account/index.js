import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './containers/container'
import Register from './Register'
import Forgot from './Forgot'
// import Loading from './DELETE Loading'
import stackDEBUG from '../stackDEBUG';

const Authentication = createStackNavigator({
  // Landing: {
  //   screen: stackDEBUG,
  //   navigationOptions: {
  //     headerTitle: "Landing"
  //   }
  // },
  // Loading: { 
  //   screen: Loading,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
  Login: { 
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerTitle: "Register Account"
    }
  },
  ForgotPassword: {
    screen: Forgot,
    navigationOptions: {
      headerTitle: "Forgot Password"
    }
  },
});

export default createAppContainer(Authentication);