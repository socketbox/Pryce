import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';

import Search from './Search';
import Items from '../item/index'

const SearchScreen = createStackNavigator({
    // Landing: {
    //     screen: stackDEBUG,
    //     navigationOptions: {
    //         headerShown: false
    //     } 
    // },
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
    },
});

export default createAppContainer(SearchScreen);