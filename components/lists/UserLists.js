import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, Image, Button } from 'react-native';
//import NewList from './NewList';

class ListItem extends Component {
  plid = this.props.pryce_list_id;
  render() {
		return (
			<View>
			  <Button title={this.props.name} onPress={(plid) => {navigation.navigate('ListDetails', {plid} );}} />
			</View>
		);
	}
}


export default class PryceLists extends Component {
	state = {pryceLists: []}

  componentDidMount() {
    this._getPryceLists();
  }

  componentWillUnmount() {
		console.log("Will Unmount.");
  }

  _postNewList = async(listName) => {}

  _getPryceLists = async () => {
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODI2Njg0MTQsIm5iZiI6MTU4MjY2ODQxNCwianRpIjoiNThiODIyOTctZTA4Zi00NGVkLWI5YWEtMmFlZDlkNjkxM2I2IiwiaWRlbnRpdHkiOnsidXNlcm5hbWUiOiJ1c2VyMSIsImFwcHVzZXJfaWQiOjF9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.CccvE9Aanoji230yOX43kshYx7sHb6YcfrUsQsjK8cI" 
			} 
		}).then(response => response.json()).then(responseJson => { this.setState({ pryceLists: responseJson }); }).catch(error => console.error(error));
	};

	render() {
	  const listData = Object.keys(this.state.pryceLists).map(key => ({key,...this.state.pryceLists[key] }));
    console.log(listData); 
    return (
        <SafeAreaView>
          <FlatList
            data={listData}
            renderItem={({ item }) => <ListItem name={item.name} />}
            keyExtractor={item => item.key} />
          <View style={styles.newListForm}>
             <TextInput
                 placeholderTextColor="#e6e6e6"
                 editable={true}
                 placeholder="New List Name"
                 autoCapitalize="none"
                 onChangeText={(text) => this.setState({newListName:text})}
               />
            <Button title="New List" onPress={ () => Alert.alert("call _postNewList")} />
          </View>
        </SafeAreaView>
	);
  }
}

            //<Button title="New List" onPress={ (this.getState('newListName')) => { _postNewList(navigation.navigate('NewList')}} />

const styles = StyleSheet.create({
    unLine: {
      width: 218,
      height: 1,
      backgroundColor: '#060606',
      opacity: 0.25,
      marginTop: 1,
      marginLeft: 2,
    },
    newListForm: {
      borderWidth: 1,
      borderColor: '#000000',
    },
  }
);

