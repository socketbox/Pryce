import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from "react-native";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import {styles} from '../Styles'

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	submitForm = async () => {
		if (!this.state || !this.state.username || !this.state.password || !this.state.passwordConfirmation) {
			alert("Please fill out all fields.");
			return;
		}
		const username = this.state.username;
		const password = this.state.password;
		const passwordConfirmation = this.state.passwordConfirmation;

		if (password !== passwordConfirmation) {
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
		return (
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.title}>Register</Text>
					<View style={styles.inputRow}>
						<SimpleLineIconsIcon name="user" style={styles.inputIcon} />
						<TextInput
							placeholder="Username"
							placeholderTextColor="#e6e6e6"
							editable={true}
							style={styles.inputField}
							onChangeText={(text) => this.setState({username:text})}
						/>
					</View>
	
					<View style={styles.inputRow}>
						<SimpleLineIconsIcon name="lock" style={styles.inputIcon} />
						<TextInput
							placeholder="Password"
							placeholderTextColor="#e6e6e6"
							editable={true}
							secureTextEntry={true}
							style={styles.inputField}
							onChangeText={(text) => this.setState({password:text})}
						/>
					</View>
	
					<View style={styles.inputRow}>
						<SimpleLineIconsIcon name="lock" style={styles.inputIcon} />
						<TextInput
							placeholder="PasswordConfirmation"
							placeholderTextColor="#e6e6e6"
							editable={true}
							secureTextEntry={true}
							style={styles.inputField}
							onChangeText={(text) => this.setState({passwordConfirmation:text})}
						/>
					</View>
		
				<TouchableOpacity
					onPress={this.submitForm}
					style={styles.buttonContainer}
					>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
	
				</View>
			</View>
		);
	}
}

