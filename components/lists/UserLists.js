import React, { Component } from 'react';
import { 
	AsyncStorage,
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TextInput, 
  View, 
  Button } from 'react-native';

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

export default class UserLists extends Component {
	state = {pryceLists: []}

  componentDidMount() {
    //TODO: see comment in componentWillUnmount 
    //_getStoredLists()
    this._getPryceLists();
  }

  componentWillUnmount() {
    //TODO: do we need to prevent superfluous calls by storing state, or is this somehow cached? 
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
    })
    .then(response => response.json())
    .then(responseJson => { this.setState({ pryceLists: responseJson }); })
    .catch(error => console.error(error));
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
          <View style={styles.newList}>
             <TextInput style={styles.newListForm}
                 placeholderTextColor="#CCCCCC"
                 editable={true}
                 placeholder="New List Name"
                 autoCapitalize="none"
                 onChangeText={(text) => this.setState({newListName:text})}
               />
            <Button title="New List" onPress={() => {_postNewList(state.newListName);}} />
          </View>
        </SafeAreaView>
	);
  }
}


const styles = StyleSheet.create({
    newList: {
      width: '65%',
      borderWidth: 1,
      marginTop: 1,
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: '#000000',
      padding: 20
    },
    newListForm: {
      borderWidth: 1,
      borderColor: '#000000',
      width: '80%', 
      fontSize: 18,
      textAlign: 'center',
    },
  }
);

