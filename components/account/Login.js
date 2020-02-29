import React from 'react';
import {
	AsyncStorage,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard,
	Animated
	} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.keyboardHeight = new Animated.Value(0);
	}

	async getLoggedInUser(){
		return await AsyncStorage.getItem('user').then(req => JSON.parse(req))
			.then((userObj) => {
				this.setState({loggedInUser: userObj});
				console.log(this.state.loggedInUser);
		});
	}

	async componentDidMount() {
		await this.getLoggedInUser();
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
		if(this.state.loggedInUser.isLoggedIn)
			this.props.navigation.navigate('Application');
	}

	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	// Code to get keyboard height on keyboard show/hide for ensuring the login form isn't hidden.
	// https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/
	keyboardDidShow = (event) => {
		Animated.parallel([
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: event.endCoordinates.height,
			})
		]).start();
	};

	keyboardDidHide = (event) => {
		Animated.parallel([
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: 0,
			})
		]).start();
	};

	onLogin = async () => {
		if (!this.state) {	
			return;
		} else {
			await this.doLogin(this.state.username, this.state.password);
		}
	}

	render () {
		const loginForm = (
			<View style={styles.loginInfo}>
				<Animated.View style={{ paddingBottom: this.keyboardHeight }}>
					<View style={styles.inputRow}>
						<FeatherIcon name="user" style={styles.inputIcon} />
						<TextInput
							placeholderTextColor="#ccc"
							editable={true}
							placeholder="Username"
							defaultValue=""
							autoCapitalize="none"
							style={styles.inputField}
							onChangeText={(text) => this.setState({username:text})}
						/>
					</View>

					<View style={styles.inputRow}>
						<SimpleLineIconsIcon name="lock" style={styles.inputIcon} />
						<TextInput
							placeholder="Password"
							defaultValue=""
							placeholderTextColor="#ccc"
							editable={true}
							secureTextEntry={true}
							style={styles.inputField}
							onChangeText={(text) => this.setState({password:text})}
						/>
					</View>

					<TouchableOpacity
						onPress={this.onLogin}
						style={styles.loginButton}>
						<Text style={styles.login2}>Login</Text>
					</TouchableOpacity>
				</Animated.View>
			
				<View style={styles.createAccount}>
					<Text style={styles.newText}>New? </Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
						<Text style={styles.createAccountHere}>Create account here!</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.createAccount} />
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Application')}>
					<Text style={styles.continueAsGuest}>Continue as guest</Text>
				</TouchableOpacity>
			</View>
		);	

		const logoutButton = (
			<View style={styles.loginInfo}>
				<Text style={styles.inputRow}>{this.state.loggedInUser ? 'Logged in as ' + this.state.loggedInUser.name : '' }</Text>
				
				<TouchableOpacity onPress={this.doLogout} style={styles.loginButton}>
					<Text style={styles.login2}>Logout</Text>
				</TouchableOpacity>
			</View>
		);

		return (
			<View style={styles.container}>
				<Text style={styles.pryce}>PRYCE</Text>

				{ this.state.loggedInUser ? logoutButton : loginForm }

			</View>
		);
	}

	doLogout = async () => {
		return await AsyncStorage.removeItem('user').then(this.setState({loggedInUser: null}));
	}

	async doLogin(username, password) {
		//chb:debug
		console.log("in doLogin, username: " + username + ", password: " + password);
		fetch('https://pryce-cs467.appspot.com/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"username": username,
				"password": password,
			}),
		})
		.then(async (res) => {if (!res.ok) {
				let json = await res.json();
				if (json) {
					alert(json.message);
					return;
				}
				throw new Error('Network response not ok.');
			}
			//return Promise wrapped js object 
			return res.json();
		})
		.then( async (responseJson) => {
			if (responseJson) {
				console.log("access_token from resp: " + responseJson.access_token)
				let userCredentials = {
					isLoggedIn: true,
					authToken: responseJson.access_token,
					id: null,
					name: username
				}
				await AsyncStorage.setItem('user', JSON.stringify(userCredentials));
				this.setState({loggedInUser: userCredentials});
				this.props.navigation.navigate('Application');
			}
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pryce: {
		flex: 1,
		fontSize: 70,
		textAlign: 'center'
	},
	loginInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 2
	},
	inputRow: {
		width: 220,
		height: 30,
		marginBottom: 30,
		flexDirection: 'row'
	},
	inputIcon: {
		fontSize: 30,
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
	},
	inputField: {
		width: 193,
		height: "100%",
		color: '#121212',
		textAlign: 'left',
		fontSize: 20,
		marginLeft: 6,
		borderBottomWidth: 1,
		borderBottomColor: '#060606'
	},
	loginButton: {
		width: 220,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		marginBottom: 30
	},
	login2: {
		color: '#121212',
		textAlign: 'center',
		padding: 5,
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
