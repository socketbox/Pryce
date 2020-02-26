import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component } from 'react';
import { SafeAreaView, FlatList, Text, View, Image, Button } from 'react-native';

export default class NewList extends Component {
	state = {pryceLists: []}

  componentDidMount() {
    this._getPryceLists();
  }

  componentWillUnmount() {
		console.log("Will Unmount.");
  }

  _sendNewList = async () => {
		let url = 'http://192.168.1.100:5000/pryce_lists/';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODIxNzk5MTIsIm5iZiI6MTU4MjE3OTkxMiwianRpIjoiZWIwOGRkMjMtZjliMi00ZGVlLTk5YTctZDdhN2Q4ZjYyYmQ4IiwiaWRlbnRpdHkiOnsidXNlcm5hbWUiOiJ1c2VyMSIsImFwcHVzZXJfaWQiOjF9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.Ht3p9IYXYCOBqS3HL4uJDQc1viVdGuQwulETpNxyYfk" 
			} 
		}).then(response => response.json()).then(responseJson => { this.setState({ pryceLists: responseJson }); }).catch(error => console.error(error));
	};

	render() {
    return (
        <SafeAreaView>
          <FlatList
            data={listData}
            renderItem={({ item }) => <ListItem name={item.name} />}
            keyExtractor={item => item.key} />
          <View>
           <Button title="New List" onPress={() => navigation.navigate('NewList')} />
         </View>
        </SafeAreaView>
	);
  }
}

