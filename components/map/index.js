import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import Item from '../item/index';
import Map from './Map';
import Scanner from '../scanner/index';

const MapScreen = createStackNavigator({
    // Landing: {
    //     screen: stackDEBUG,
    //     navigationOptions: {
    //         headerShown: false
    //     } 
    // },
    Map: {
        screen: Map,
        navigationOptions: {
            headerShown: false
        }
    },
    Scanner: {
        screen: Scanner,
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
});

export default createAppContainer(MapScreen);