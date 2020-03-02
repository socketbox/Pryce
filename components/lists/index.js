import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import UserLists from './UserLists.js';
import ListDetails from './ListDetails.js';

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

});

export default createAppContainer(ListScreen);
