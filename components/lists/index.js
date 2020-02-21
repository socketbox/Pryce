import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';

import NewList from './NewList.js';
import UserList from './UserList';

const ListScreen = createStackNavigator({
    Landing: {
        screen: stackDEBUG,
        navigationOptions: {
            headerShown: false
        } 
    },
    UserList: {
        screen: UserList,
        navigationOptions: {
            headerShown: false
        }
    },
    NewList: {
        screen: NewList,
        navigationOptions: {
            headerShown: false
        }
    },
});

export default createAppContainer(ListScreen);