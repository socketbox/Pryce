import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, SafeAreaView, FlatList, Text, View, Image, Button } from 'react-native';

export default class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDetails: [],
      pryceListId: this.props.navigation.state.params.pryceListId,
      readyToRender: false,
    };
  }

  async _setToken() { 
    let token = null; 
    try {
      token = await AsyncStorage.getItem('user')
        .then((res) => { 
          user = JSON.parse(res);
          token = {authToken: user.authToken};
          console.log("user: " + user + "; token: " + token.authToken);
        })
        .catch((err) => {console.log("error getting user obj: " + err)});
      
      this.setState(token);
      ivId = setInterval( ()=>{
        if(typeof(this.state.authToken) === 'string')
          clearInterval(ivId);
        else
          console.log("Waiting");
      }, 250);
    }
    catch(err1){
      console.log("_setToken throws error: " + err1);
    }
  }

  getWhenReady()
  {
    ivalId = setInterval( ()=>{
        if(this.state.authToken)
        {  
          this._getListItemDetails();
          clearInterval(ivalId);
        }
      },
      250
    );
  }

  async componentDidMount() {
    console.log("Calling setToken from cDM");
    await this._setToken();
    console.log("authToken in state: " + this.state.authToken);
    this.getWhenReady();
  }

  componentDidUpdate(){ 
  }

  componentWillUnmount() {
  }


  _getListItemDetails = async () => {
    result = false;
    //let url = 'https://pryce-cs467.appspot.com/pryce_lists/details/' + this.state.pryceListId;
    let url = 'http://192.168.1.100:5000/pryce_lists/details/' + this.state.pryceListId;
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
    .then( (responseJson) => { 
      console.log("responseJson: " + JSON.stringify(responseJson) + ", " + this.state.authToken); 
      tableRows = [];

      let tableRows = responseJson.map( (cv, i, responseJson) => {
        [cv.item_name, cv.price, cv.store_name, cv.reported]
        } 
      );
      console.log("setting tabledata in _getListItemDetails");
      this.setState({tableData: tableRows});
      result = true; 
      }
    )
    .catch( (error) => {console.error(error + "_this is horrible"); result = false;});
      
    console.log("returning result of " + result);
    //if(result)
      //this.setState({readyToRender: true});
    return result;
	};

  render(){ 
    if( !this.store.readyToRender )
    {
      return (<SafeAreaView><Text>Loading...</Text></SafeAreaView>);
    } 
    else
    {  
      return (
        <SafeAreaView style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={tableData} textStyle={styles.text}/>
          </Table>
        </SafeAreaView>
      );
    }
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  }
);

