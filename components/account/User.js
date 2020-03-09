import React from 'react';
import { Text, StyleSheet, AsyncStorage, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {styles} from '../Styles'

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
            <TouchableOpacity style={styles.userButton} onPress={this.doLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        );

        const loginButton = (
            <TouchableOpacity style={styles.userButton} onPress={() => this.props.navigation.navigate('Login')}>
                <Text>Login</Text>
            </TouchableOpacity>
        );
    
        return (
            <SafeAreaView style={styles.userContainer}>
                <Text style={styles.username}>{this.state.loggedInUser ? this.state.loggedInUser.name : 'Guest' }</Text>

                {this.state.loggedInUser ? logoutButton : loginButton}
            </SafeAreaView>
        );
    }
}


export default User;
