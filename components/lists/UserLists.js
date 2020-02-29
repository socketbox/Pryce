import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Text, 
  TextInput, 
  TouchableOpacity,
  View, 
  Button } from 'react-native';

class PryceList extends Component {
  
  onPress(plid){
    this.props.pryceListDetails.push('ListDetails', {pryceListId: plid});
  }

  render(){
		return (
			<View>
        <Button title={this.props.pryceListName} onPress={() => this.onPress(this.props.pryceListId)} /> 
			</View>
		);
	}
}


export default class UserLists extends Component {
  constructor(props){
    super(props);
    this.state = {pryceLists: [], listStale: true};
  }

  _setToken = async () => {
    const token = await AsyncStorage.getItem('user').then((res) => {
        console.log("result of getItem: " + res);
        const parsed = JSON.parse(res);
        console.log("parsed.authToken: " + parsed.authToken);
        return {authToken: parsed.authToken};
      });

    console.log("token value: " + token.authToken);
    if( token.authToken )
    {
      this.setState(token); 
      this.setState({readyToRender: true});
    }
    else
    {
        this.setState({readyToRender: false});
    }
  }

  componentDidMount() {
    console.log("Did Mount");
    if(!this.state.readyToRender) { 
      console.log("Calling setToken");
      this._setToken();
    }
  }

  componentDidUpdate() {
    if(this.state.readyToRender && this.state.listStale)
    { 
      console.log("Calling _getPryceLists()");
      if(this._getPryceLists())
        this.setState({listStale: false});
    }
    else if (this.state.readyToRender &! this.state.listStale)
    {
      return;
    }
    else
    {
      console.log("calling set token");
      this._setToken();
    }
  }

  componentWillUnmount() {
    console.log("Will Unmount");
  }

  _postNewList = async(listName, authToken) => {
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken
			} 
    })
    .then(response => response.json())
    .then(responseJson => { this.setState({ pryceLists: responseJson }); })
    .catch(error => console.error(error));
	};

  _getPryceLists = async () => {
    result = false; 
    console.log("authToken in getPryceLists: " + this.state.authToken);
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken,
			} 
    })
    .then(response => response.json())
    .then(responseJson => { this.setState({ pryceLists: responseJson }); result=true })
    .catch(error => console.error(error));

    return result;
	};

  goBackButton = () => {
    this.props.navigation.goBack();
  }

	render(){
    if( !this.state.readyToRender )
    {
      return (<SafeAreaView><Text>Loading...</Text></SafeAreaView>);
    } 
    const listData = Object.keys(this.state.pryceLists).map(key => ({key,...this.state.pryceLists[key] }));
    console.log(listData); 
    return (
        <SafeAreaView>
          <FlatList
            data={listData}
            renderItem={({ item }) => <PryceList pryceListDetails={this.props.navigation} pryceListId={item.pryce_list_id} pryceListName={item.name} />}
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
          <TouchableOpacity onPress={this.goBackButton} style={styles.buttonContainer} >
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
