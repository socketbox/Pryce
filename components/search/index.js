import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';

import Search from './Search';

const SearchScreen = createStackNavigator({
    Landing: {
        screen: Search,
        navigationOptions: {
            headerShown: false
        } 
    },
});

export default createAppContainer(SearchScreen);