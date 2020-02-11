import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  onLogin = async () => {
    if (!this.state) return;
    // Authentication(this.state.username, this.state.password);
    if (this.state.username.length <= 0 && this.state.password.length <= 0) {
      Alert.alert(`Login Error`, `Please enter a username/password`);
    } else {
      fetch('http://pryce-cs467.appspot.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then(res => res.json())
      .then(responseJson => responseJson.access_token)
      .then(access_token => {
        fetch('http://pryce-cs467.appspot.com/protected', {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + access_token },
        })
        .then(response => {
          console.log(access_token);
          if (response.ok === true) {
            this.props.navigation.navigate(
              'AppNavigator'
            );
          } else {
            Alert.alert(
              `Invalid login`,
              `Please enter a valid username/password.`
            );
          }
          console.log(response.ok);
          return response.json();
        })
        .catch(error => {
          console.log(error);
        });
      });
    }
  };

  continueAsGuest = () => this.props.navigation.navigate('AppNavigator');
  goToSignup = () => this.props.navigation.navigate('Signup');

  render() {
    const { username, password } = this.state;

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
                style={styles.unInput}
                name="username"
                value={username}
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={this.handleUsernameChange}
              />
            </View>
            <View style={styles.unLine} />
          </View>
          <View style={styles.password}>
            <View style={styles.pwIconRow}>
              <SimpleLineIconsIcon name="lock" style={styles.pwIcon} />
              <TextInput
                name="password"
                value={password}
                placeholder="Password"
                placeholderTextColor="#e6e6e6"
                editable={true}
                secureTextEntry={true}
                style={styles.pwInput}
                onChangeText={this.handlePasswordChange}
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
            <TouchableOpacity onPress={this.goToSignup}>
              <Text style={styles.createAccountHere}>Create account here!</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.createAccount} />
        <TouchableOpacity onPress={this.continueAsGuest}>
          <Text style={styles.continueAsGuest}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    );
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
    alignItems: 'center',
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
    textAlign: 'center',
    marginBottom: 57,
    marginLeft: 125,
  },
});
