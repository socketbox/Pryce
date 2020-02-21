import React from 'react';
import {
	AsyncStorage,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Button,
	TextInput,
	TouchableOpacity,
	Alert,
	} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {
		await AsyncStorage.getItem('user')
			.then(req => JSON.parse(req))
			.then((data) => {
				if(data) {
					this.props.log_in(data);
					console.log(data);
				}
			});
	}

	onLogin = async () => {
		if (!this.state) {	return;
		} else {
			this.doLogin(this.state.username, this.state.password);
		}
	}

	render () {
		let isLoggedIn = this.props.user.isLoggedIn;
		return (
			<View style={styles.container}>
				<Text style={styles.pryce}>PRYCE</Text>
				<View style={styles.loginInfo}>
				<View style={styles.username}>
					<View style={styles.unIconRow}>
					<FeatherIcon name="user" style={styles.unIcon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						placeholder="Username"
						autoCapitalize="none"
						onChangeText={(text) => this.setState({username:text})}
					/>
					</View>
					<View style={styles.unLine} />
				</View>
				<View style={styles.password}>
					<View style={styles.pwIconRow}>
					<SimpleLineIconsIcon name="lock" style={styles.pwIcon} />
					<TextInput
						placeholder="Password"
						placeholderTextColor="#e6e6e6"
						editable={true}
						secureTextEntry={true}
						style={styles.pwInput}
						onChangeText={(text) => this.setState({password:text})}
					/>
					</View>
					<View style={styles.pwLine} />
				</View>

				<View style={styles.loginButton}>
					<TouchableOpacity
						onPress={this.onLogin}
						style={styles.loginContainer}>
						<Text style={styles.login2}>Login</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.createAccount}>
					<Text style={styles.newText}>New? </Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
						<Text style={styles.createAccountHere}>Create account here!</Text>
					</TouchableOpacity>
				</View>
				</View>

				<View style={styles.createAccount} />
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Application')}>
					<Text style={styles.continueAsGuest}>Continue as guest</Text>
				</TouchableOpacity>
			</View>
		);
	}

	async doLogout() {
		await AsyncStorage.removeItem('user');
		this.props.log_out()
	}

	async doLogin(username, password) {
		fetch('http://pryce-cs467.appspot.com/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
		.then(res => res.json())
		.then(responseJson => responseJson.access_token)
		.then(access_token => {
			this.props.user.authToken = access_token;
			fetch('http://pryce-cs467.appspot.com/protected', {
				method: 'GET',
				headers: { Authorization: 'Bearer ' + access_token },
			})
			.then(response => {
				// console.log(JSON.stringify(response));
				// console.log("access token: " + access_token);
				if (response.ok === true) {
					this.props.navigation.navigate(
					'Application'
				);
			} else {
				Alert.alert(
				`Invalid login`,
				`Please enter a valid username/password.`
				);
			}
			//console.log(response.ok);
			return response.json();
			})
			.catch(error => {
				console.log(error);
			});
		});

		let userCredentials = {
			isLoggedIn: true,
			authToken: null,
			id: null,
			name: username
		}

		this.props.log_in(userCredentials)
		await AsyncStorage.setItem('user', JSON.stringify(userCredentials));

		//TODO: Fix authentication to store authToken to store correctly
		console.log(this.props.user.authToken)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pryce: {
		flex: 1,
		fontSize: 70,
		textAlign: 'center',
		paddingTop: 120,
	},
	loginInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 2
	},
	username: {
		width: 220,
		height: 23,
	},
	unIcon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	unInput: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	unIconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	unLine: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	password: {
		width: 220,
		height: 23,
		marginTop: 19,
	},
	pwIcon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	pwInput: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	pwIconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	pwLine: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	loginButton: {
		width: 161,
		height: 32,
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginContainer: {
		width: 161,
		height: 32,
		borderRadius: 6,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	login2: {
		color: '#121212',
		textAlign: 'center',
		paddingTop: 7,
	},
	createAccount: {
		width: 168,
		height: 16,
		flexDirection: 'row',
		flex: 1,
		alignSelf: 'center',
	},
	newText: {
		color: '#121212',
		fontSize: 14,
		marginTop: 2,
	},
	createAccountHere: {
		top: 2,
		left: 0,
		color: '#126ef7',
		fontSize: 14,
	},
	continueAsGuest: {
		width: 125,
		height: 18,
		color: '#126ef7',
		fontSize: 14,
		alignSelf: 'center',
		marginBottom: 57,
	},
});

export default Login;
