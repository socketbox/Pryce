import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/account/Login';
import Signup from '../screens/account/Signup';
import AppNavigator from './AppNavigator';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup},
    AppNavigator: { screen: AppNavigator},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
)

export default AuthNavigation