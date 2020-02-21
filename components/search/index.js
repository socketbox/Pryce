import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';

import Search from './Search';

const SearchScreen = createStackNavigator({
    Landing: {
<<<<<<< Updated upstream
<<<<<<< HEAD
        screen: stackDEBUG,
        navigationOptions: {
            headerShown: false
        } 
    },
    Search: {
=======
>>>>>>> Stashed changes
        screen: Search,
        navigationOptions: {
            headerShown: false
        } 
    },
<<<<<<< Updated upstream
    });
=======
        screen: Search,
        navigationOptions: {
            headerShown: false
        } 
    },
});
>>>>>>> 5010556b30df0cdb63844785c952560c5feb080e
=======
});
>>>>>>> Stashed changes

export default createAppContainer(SearchScreen);