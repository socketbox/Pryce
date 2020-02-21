import { createStackNavigator } from 'react-navigation-stack';
import Authentication from './AuthNavigator';
import Application from './Application';
import { createAppContainer } from 'react-navigation';

<<<<<<< Updated upstream
<<<<<<< HEAD
=======


>>>>>>> 5010556b30df0cdb63844785c952560c5feb080e
=======


>>>>>>> Stashed changes
const AppNavigator = createStackNavigator(
    {
        AuthNavigator: { 
            screen: Authentication,
            navigationOptions: {
                headerShown: false
            }
        },
        Application: { screen: Application,
            navigationOptions: {
                headerShown: false
            }},
    },
)

const AppNav = createAppContainer(AppNavigator)

export default AppNav