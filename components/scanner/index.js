import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import stackDEBUG from '../stackDEBUG';
import Item from '../item/index';
import Scanner from './Scanner';

const ScannerScreen = createStackNavigator({
	Landing: {
<<<<<<< Updated upstream
<<<<<<< HEAD
		screen: stackDEBUG,
		navigationOptions: {
			headerShown: false
		} 
	},
	Scanner: {
=======
>>>>>>> 5010556b30df0cdb63844785c952560c5feb080e
=======
>>>>>>> Stashed changes
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

export default createAppContainer(ScannerScreen);