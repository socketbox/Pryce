import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import NewItem from './NewItem';
import EditItem from './EditItem'
import Item from './Item'
import Review from './Reviews'

const ScannerScreen = createStackNavigator({
    Landing: {
        screen: stackDEBUG,
        navigationOptions: {
            headerShown: false
        } 
    },
    NewItem: {
        screen: NewItem,
        navigationOptions: {
            headerShown: false
        }
    },
    EditItem: {
        screen: EditItem,
        navigationOptions: {
            headerShown: false
        }
    },
    Item: {
        screen: Item,
        navigationOptions: {
            headerShown: false
        }
    },
    Reviews: {
        screen: Review,
        navigationOptions: {
            headerShown: false
        }
    },
});

export default createAppContainer(ScannerScreen);