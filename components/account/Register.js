import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from "react-native";
import {styles} from '../Styles'
import { Button, TextField, Icon } from 'material-bread';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
		}
	}

	submitForm = async () => {
		if (!this.state || !this.state.username || !this.state.password || !this.state.passwordConfirmation) {
			alert("Please fill out all fields.");
			return;
		}
		
		const {username, password} = this.state;

		if (this.state.password !== passwordConfirmation) {
			alert("Passwords don't match.");
			return;
		}

		fetch('https://pryce-cs467.appspot.com/register', {
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
				console.log(responseJson.message);
				alert('Successfully registered ' + username + '!');
				this.props.navigation.navigate('Login');
			}
		});
	}

	render () {
		const registerForm = (
			<View style={styles.container}>
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
						<TextField
							label={'Confirm Password'}
							value={this.state.password}
							secureTextEntry={true}
							onChangeText={(text) => this.setState({ password: text })}
							leadingIcon={
								<Icon name={'check'} size={24} color={'#6e6e6e'} />
							}
						/>
						<Button text={'Submit'} type='outlined' onPress={this.submitForm} style={styles.button}/> 
					</View>
				</View>
		);

		return (
			<View style={styles.container}>
				{ registerForm }
			</View>
		);
	}
}