import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, SafeAreaView, FlatList, Text, View, Image, Button } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.store = {};
    this.store.readyToFetch = false;
    this.store.readyToRender = false;
    this.store.tableData = [];
    this.store.pryceListId = this.props.navigation.state.params.pryceListId;
    this.store.tableHead = ['Name','Price','Store','Reported'];
      //listStale: true,
      //readyToFetch: false,
      //authToken: ''
    //this.setState = this.setState.bind(this);
  }
 
  _setToken = async () => {
    const token = await AsyncStorage.getItem('user').then((res) => {
        console.log("result of getItem: " + res);
        const parsed = JSON.parse(res);
        console.log("parsed.authToken: " + parsed.authToken);
        return {authToken: parsed.authToken};
      });

    if( token.authToken )
    {
      this.store.authToken = token.authToken; 
      this.store.readyToFetch = true 
      /*if(this.state.authToken)
      {
        this.setState({readyToFetch: true});
        console.log("Token set in state and ready to fetch");
      }*/
    }
    else
    {
      this.store.readyToFetch = false;
        //this.setState({readyToFetch: false});
    }
  }

  componentDidMount() {
    console.log("Did Mount");
    this._setToken();
    if(this.store.readyToFetch) { 
      this._getListItemDetails();
    }
  }

  componentDidUpdate() {
      //this.setState({listStale: false});
    /*
    if(this.state.readyToFetch && this.state.listStale)
    { 
      console.log("Calling _getListDetails() from cDU");
      if(this._getListItemDetails()) {
        this.setState({listStale: false});
        this.setState({readyToRender: true});
      }
    }
    else if (this.state.readyToFetch &! this.state.listStale)
    {
      return;
    }
    else
    {
      console.log("readyToFetch: " + this.state.readyToFetch + "; " + "calling set token from cDU");
      this._setToken();
    }
    */
  }

  componentWillUnmount() {
    console.log("Will Unmount");
  }


  _getListItemDetails = async () => {
    result = false;
    //let url = 'https://pryce-cs467.appspot.com/pryce_lists/details/' + this.state.pryceListId;
    let url = 'http://192.168.1.100:5000/pryce_lists/details/' + this.store.pryceListId;
    console.log("url: " + url);
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.store.authToken,
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
      this.store.tableData = tableRows;
      result = true; 
      }
    )
    .catch( (error) => {console.error(error + "_this is horrible"); result = false;});
    console.log("returning result of " + result);
    if(result)
      this.store.readyToRender=true;
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

