import React from 'react';
import {
	AsyncStorage,
	Text,
	View,
	TouchableOpacity,
	Keyboard,
	Animated
} from 'react-native'
import {styles} from '../Styles'
import { Button, TextField, Icon } from 'material-bread';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.keyboardHeight = new Animated.Value(0);
	}

	async getLoggedInUser(){
		return await AsyncStorage.getItem('user').then(req => JSON.parse(req))
			.then((userObj) => {
				this.setState({loggedInUser: userObj});
		});
	}

	async componentDidMount() {
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
		
		await this.getLoggedInUser();
		if(this.state.loggedInUser && this.state.loggedInUser.isLoggedIn)
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
			<View>
				<View style={styles.loginInfo}>
					<Animated.View style={{ paddingBottom: this.keyboardHeight }}>
						<View style={styles.inputRow}>
							<TextField
								label={'Username'}
								value={this.state.username}
								onChangeText={(text) => this.setState({ username: text })}
								leadingIcon={
									<Icon name={'account-circle'} size={24} color={'#6e6e6e'} />
								}
							/>
							<TextField
								label={'Password'}
								value={this.state.password}
								secureTextEntry={true}
								onChangeText={(text) => this.setState({ password: text })}
								leadingIcon={
									<Icon name={'lock'} size={24} color={'#6e6e6e'} />
								}
							/>
							<Button 
								style={styles.button}
								text={'Login'} 
								type="outlined" 
								onPress={() => this.onLogin()} 
							/>
						</View>
					</Animated.View>
				</View>
				<View style={{ flex: 1, alignItems: 'center'}}>
					<View style={styles.createAccount}>
						<Text style={styles.newText}>New? </Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
							<Text style={styles.createAccountHere}>Create account here!</Text>
						</TouchableOpacity>
					</View>
				</View>

			</View>
		);	

		return (
			<View style={styles.container}>
				<Text style={styles.pryce}>PRYCE</Text>
				{ loginForm }
			</View>
		);
	}

	async doLogin(username, password) {
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

export default Login;
