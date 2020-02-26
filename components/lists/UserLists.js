import React, { Component } from 'react';
import { 
  Alert, 
  AsyncStorage,
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Text, 
  TextInput, 
  TouchableOpacity,
  View, 
  Button } from 'react-native';

class ListItem extends Component {
  plid = "";
  constructor(props) {
    super(props);
    this.plid = JSON.stringify(props.pryce_list_id);
    console.log("plid: " + this.plid);
  }
  render(){
		return (
			<View>
			  <Button title="foo" onPress={(plid) => {navigation.navigate('ListDetails', {plid});}} />
			</View>
		);
	}
}
			  //<Button title={this.props.name} onPress={(plid) => {navigation.navigate('ListDetails', {plid});}} />

export default class UserLists extends Component {

  constructor(props){
    super(props);
    this.state = {pryceLists: []};
    let authToken = "";
    AsyncStorage.getItem('user')
      .then( res => {
         if(res){console.log("userobj not null; type: " + typeof(res) + "; " + res);}
        })
      .then(res => { 
        parsed = JSON.parse(res); 
        if(parsed){console.log("userobj not null; type: " + typeof(res)); }
      })
      .then((res) => { this.state.authToken = res.authToken;})
      .catch(Alert.alert('Login Required', 'You must login before using lists.'));
    
    console.log("this.state.authToken: " + this.state.authToken);
   }

  componentDidMount() {
    //TODO: see comment in componentWillUnmount 
    //_getStoredLists()
    this._getPryceLists(this.state.authToken);
  }

  componentWillUnmount() {
    //TODO: do we need to prevent superfluous calls by storing state, or is this somehow cached? 
    console.log("Will Unmount.");
  }

  _postNewList = async(listName, authToken) => {
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + authToken
			} 
    })
    .then(response => response.json())
    .then(responseJson => { this.setState({ pryceLists: responseJson }); })
    .catch(error => console.error(error));
	};

  _getPryceLists = async (authToken) => {
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + authToken
			} 
    })
    .then(response => response.json())
    .then(responseJson => { this.setState({ pryceLists: responseJson }); })
    .catch(error => console.error(error));
	};


	render(){
	  const listData = Object.keys(this.state.pryceLists).map(key => ({key,...this.state.pryceLists[key] }));
    console.log(listData); 
    return (
        <SafeAreaView>
          <FlatList
            data={listData}
            renderItem={({ item }) => <ListItem name={item.name} />}
            keyExtractor={item => item.key} 
          />
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
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.buttonContainer} >
            <Text>Back</Text>
          </TouchableOpacity>
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
