import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import UserLists from './UserLists.js';
import ListDetails from './ListDetails.js';
import Search from '../search/Search.js';
import Items from '../item/index.js';

const ListScreen = createStackNavigator({
    UserLists: {
        screen: UserLists,
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
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false
        } 
    },
    Items: {
        screen: Items,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default createAppContainer(ListScreen);
