import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import {styles} from '../Styles'

function EditItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.pryceColumn}>
        <Text style={styles.pryce}>SIGNUP SCREEN</Text>

        <View style={styles.signInButton}>

          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.signInContainer}
          >
            <Text style={styles.editItem1}>GO BACK</Text>
          </TouchableOpacity>
          
        </View> 
      </View>
    </View>
  );
}


export default EditItem;
