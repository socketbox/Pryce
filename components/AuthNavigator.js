import { createStackNavigator } from 'react-navigation-stack';
import Login from './account/Login';
import Register from './account/Register';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register},
  },
  {
    initialRouteName: 'Login',
  }
)

export default AuthNavigation;