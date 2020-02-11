import React from 'react-native';
import { Alert } from 'react-native';

export default function Authentication(username, password) {
  if (username.length <= 0 && password.length <= 0) {
    Alert.alert(`Login Error`, `Please enter a username/password`);
  } else {
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
      fetch('http://pryce-cs467.appspot.com/protected', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(response => {
        console.log(access_token);
        if (response.ok === true) {
          this.props.navigation.navigate(
            "AppNavigator"
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
}
