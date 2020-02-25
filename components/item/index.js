import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import NewItem from './NewItem';
import EditItem from './EditItem'
import ItemInfo from './ItemInfo'
import Review from './Reviews'
import NewPrice from './NewPrice'

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
    ItemInfo: {
        screen: ItemInfo,
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
    NewPrice: {
        screen: NewPrice,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default createAppContainer(ScannerScreen);