import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../Styles'
import { Button } from 'material-bread';

class User extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    async componentDidMount() {
		await this.getLoggedInUser();
    }

    async getLoggedInUser(){
		return await AsyncStorage.getItem('user').then(req => JSON.parse(req))
			.then((userObj) => {
				this.setState({loggedInUser: userObj});
				console.log("User.getLoggedInUser: ");
				console.log(this.state.loggedInUser);
		});
    }

    doLogout = async () => {
		return await AsyncStorage.removeItem('user').then(this.setState({loggedInUser: null}));
	}
        
    render () {
        const logoutButton = (
            <Button 
                style={styles.button}
                text={'Logout'} 
                type="outlined" 
                onPress={() => this.doLogout()}
            />
        );

        const loginButton = (
            <Button 
                style={styles.button}
                text={'Login'} 
                type="outlined" 
                onPress={() => this.props.navigation.navigate('Login')}
            />
        );
    
        return (
            <SafeAreaView style={styles.userContainer}>
                <Text style={styles.username}>{this.state.loggedInUser ? this.state.loggedInUser.name : 'Guest' }</Text>
                <Button text={'My Scans'} type="text" />
                <Button text={'My Reviews'} type="text" />
                <Button text={'Account'} type="text" />
                <Button text={'Settings'} type="text" />

                {this.state.loggedInUser ? logoutButton : loginButton}
            </SafeAreaView>
        );
    }
}


export default User;
