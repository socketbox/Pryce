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
