import React, { Component } from 'react';
import { 
  AsyncStorage,
  SafeAreaView, 
  FlatList, 
  Text, 
  TextInput, 
  TouchableOpacity,
  View, 
  Button } from 'react-native';
import styles from '../Styles'


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
    this.state = {pryceLists: [], listStale: true, readyToRender: false};
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
      this._getPryceLists();
      if(this.state.pryceLists)
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

  _postNewList = async(listName) => {
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken
      },
      body: JSON.stringify(listName),
    })
    .then(response => response.json())
    .then(responseJson => { 
      let pls = Array.from(this.state.pryceLists)
      console.log("response: " + responseJson + ", pls arr: " + pls); 
      pls.push(responseJson);
      this.setState({ pryceLists: pls}); 
    })
    .catch(error => console.error(error));
	};

  _getPryceLists = async () => {
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
    .then(responseJson => { this.setState({ pryceLists: responseJson });})
    .catch(error => console.error(error));
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
            <Button title="New List" onPress={() => {this._postNewList(this.state.newListName);}} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.buttonContainer}
            >
            <Text style={styles.signIn2}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
	  );
  }
}
