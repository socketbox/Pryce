import { createStackNavigator, createAppContainer } from 'react-navigation-stack';
import Login from './account/Login';
import Register from './account/Register';
import Application from './Application'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register},
    Application: { screen: Application },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
)

export default AuthNavigation;