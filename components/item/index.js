import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import NewItem from './NewItem';
import EditItem from './EditItem'

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
});

export default createAppContainer(ScannerScreen);