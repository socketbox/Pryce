<<<<<<< HEAD
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

function Register(props) {
  return (
    <View style={styles.container}>
      <View style={styles.pryceColumn}>
        <Text style={styles.pryce}>SIGNUP SCREEN</Text>

        <View style={styles.signInButton}>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.signInContainer}
          >
            <Text style={styles.signIn2}>GO BACK</Text>
          </TouchableOpacity>
          
        </View> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pryce: {
    color: "#121212",
    fontSize: 40,
  },
    signInButton: {
    width: 161,
    height: 32,
    marginTop: 36,
    marginLeft: 40
  },
  signInContainer: {
    width: 161,
    height: 32,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.65)",
    borderWidth: 1,
    borderStyle: "solid"
  },
  signIn2: {
    color: "#121212",
    textAlign: "center",

    marginLeft: 59
  },
    pryceColumn: {
    width: 240,
    marginTop: 87,
    marginLeft: 67
  },
});

export default Register;
=======
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
				<Text style={styles.signIn2}>Submit</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => props.navigation.goBack()}
				style={styles.buttonContainer}
				>
				<Text style={styles.signIn2}>Back</Text>
			</TouchableOpacity>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		color: "#121212",
		fontSize: 40,
		textAlign: 'center',
		paddingTop: '20%',
	},
	form: {
		alignItems: 'center',
	},
	buttonContainer: {
		width: 161,
		height: 32,
		borderRadius: 6,
		borderColor: "rgba(0,0,0,0.65)",
		borderWidth: 1,
		borderStyle: "solid",
	},
	signIn2: {
		color: "#121212",
		textAlign: "center",
		paddingTop: 5,
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
});

export default Register;
>>>>>>> 5010556b30df0cdb63844785c952560c5feb080e
