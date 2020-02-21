import { createStackNavigator } from 'react-navigation-stack';
import Authentication from './AuthNavigator';
import Application from './Application';

const AppNavigator = createStackNavigator(
    {
        Login: { screen: Authentication },
        Signup: { screen: Application},
    },
)

export default AppNavigator