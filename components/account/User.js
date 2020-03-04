import React from 'react';
import { Text, StyleSheet, AsyncStorage, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
				console.log(this.state.loggedInUser);
		});
    }

    doLogout = async () => {
		return await AsyncStorage.removeItem('user').then(this.setState({loggedInUser: null}));
	}
        
    render () {
        const logoutButton = (
            <TouchableOpacity style={styles.button} onPress={this.doLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        );

        const loginButton = (
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                <Text>Login</Text>
            </TouchableOpacity>
        );
    
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.username}>{this.state.loggedInUser ? this.state.loggedInUser.name : 'Guest' }</Text>

                {this.state.loggedInUser ? logoutButton : loginButton}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5
    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 30
    },
    button: {
		width: '50%',
		height: 30,
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#d3d3d3',
		marginBottom: 30
    },
    buttonText: {
        fontSize: 14
    }
})

export default User;