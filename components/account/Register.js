import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

/**EDDIT THISS */
function Register(props) {
	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Text style={styles.title}>Register</Text>
				<View style={styles.password}>
					<View style={styles.pwIconRow}>
						<SimpleLineIconsIcon name="user" style={styles.pwIcon} />
						<TextInput
							placeholder="Username"
							placeholderTextColor="#e6e6e6"
							editable={true}
							style={styles.pwInput}
							onChangeText={(text) => this.setState({username:text})}
						/>
						</View>
					<View style={styles.pwLine} />
				</View>
				
				<View style={styles.password}>
					<View style={styles.pwIconRow}>
						<SimpleLineIconsIcon name="mail" style={styles.pwIcon} />
						<TextInput
							placeholder="email"
							placeholderTextColor="#e6e6e6"
							editable={true}
							style={styles.pwInput}
							onChangeText={(text) => this.setState({email:text})}
						/>
						</View>
					<View style={styles.pwLine} />
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
	
			<TouchableOpacity
				onPress={() => props.navigation.goBack()}
				style={styles.buttonContainer}
				>
				<Text style={styles.login2}>Submit</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => props.navigation.goBack()}
				style={styles.buttonContainer}
				>
				<Text style={styles.login2}>Back</Text>
			</TouchableOpacity>

			</View>
		</View>
	);
}


export default Register;
