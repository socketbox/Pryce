import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';

import NewList from './NewList.js';
import UserLists from './UserLists.js';
import ListDetails from './ListDetails.js';

const ListScreen = createStackNavigator({
    Landing: {
        screen: stackDEBUG,
        navigationOptions: {
            headerShown: false
        } 
    },
    UserLists: {
        screen: UserLists,
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
    ListDetails: {
        screen: ListDetails,
        navigationOptions: {
            headerShown: false
        }
    },

});

export default createAppContainer(ListScreen);
