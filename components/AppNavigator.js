import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Application from './Application';
import { createAppContainer } from 'react-navigation';
import User from './account/User';

const AppDrawer = createDrawerNavigator({
    Home: Application,
    },
    {
        drawerWidth: "90%",
        contentComponent: User,
})

const AppNavigator = createStackNavigator(
    {
        Application: { 
            screen: AppDrawer,
            navigationOptions: {
                headerShown: false,
            }
        },
    },
)

const AppNav = createAppContainer(AppNavigator)

export default AppNav