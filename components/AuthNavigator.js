import { createStackNavigator } from 'react-navigation-stack';
import Login from './account/Login';
import Signup from './account/Signup';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
)

export default AuthNavigation