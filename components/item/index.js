import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import NewItem from './NewItem';
import ItemInfo from './ItemInfo'
import ItemDetail from './ItemDetail'
import NewPrice from './NewPrice'

const ItemScreen = createStackNavigator({
    NewItem: {
        screen: NewItem,
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
    NewPrice: {
        screen: NewPrice,
        navigationOptions: {
            headerShown: false
        }
    },
    ItemDetail: {
        screen: ItemDetail,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default createAppContainer(ItemScreen);