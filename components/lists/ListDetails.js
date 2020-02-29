import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component } from 'react';
import { TextInput, StyleSheet, AsyncStorage, SafeAreaView, FlatList, Text, View, Image, Button } from 'react-native';

export default class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDetails: [],
      pryceListId: this.props.navigation.state.params.pryceListId, 
      listStale: true,
      readyToFetch: false,
      authToken: ''
    };
    this.setState = this.setState.bind(this);
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
      if(this.state.authToken)
        this.setState({readyToFetch: true});
    }
    else
    {
        this.setState({readyToFetch: false});
    }
  }

  componentDidMount() {
    console.log("Did Mount");
    if(!this.state.readyToFetch) { 
      console.log("Calling setToken");
      this._setToken();
    }
  }

  componentDidUpdate() {
    if(this.state.readyToFetch && this.state.listStale)
    { 
      console.log("Calling _getListDetails()");
      if(this._getListItemDetails())
        this.setState({listStale: false});
    }
    else if (this.state.readyToFetch &! this.state.listStale)
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


  _getListItemDetails = async () => {
    result = false;
    let url = 'https://pryce-cs467.appspot.com/pryce_lists/details/' + this.state.pryceListId;
    console.log("url: " + url);
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken,
			} 
    })
    .then(response => response.json())
    .then(responseJson => { console.log("responseJson: " + JSON.stringify(responseJson) + ", " + this.state.authToken); this.setState({ listDetails: responseJson }); result = true; })
    .catch( (error) => {console.error(error + "_this is horrible"); result = false;});
    console.log("returning result of " + result);
    if(result)
      this.setState({readyToRender: true});
    return result;
	};

  render(){ 
    if( !this.state.readyToRender )
    {
      return (<SafeAreaView><Text>Loading...</Text></SafeAreaView>);
    } 
    //const listData = Object.keys(this.state.pryceLists).map(key => ({key,...this.state.pryceLists[key] }));
    listData = this.state.listDetails;
    return (
        <SafeAreaView>
          <FlatList
            data={listData}
            renderItem={({ item }) => <PryceList pryceListDetails={this.props.navigation} pryceListId={item.pryce_list_id} pryceListName={item.name} />}
            keyExtractor={item => item.key} 
          />
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

