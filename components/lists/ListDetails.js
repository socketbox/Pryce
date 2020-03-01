import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TouchableOpacity,
  View 
  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


export default class ListDetails extends Component {
  
  _mounted = null;
  
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      listStale: true,
      pryceListId: this.props.navigation.state.params.pryceListId,
    };
  }

  _setToken = async () => {
    const token = await AsyncStorage.getItem('user').then((res) => {
        const parsed = JSON.parse(res);
        return {authToken: parsed.authToken};
      });

    console.log("token value: " + token.authToken);
    if( token.authToken )
    {
      console.log("setToken: " + token.authToken);
      this.setState( token );
    }
    else
    {
      this.setState({readyToRender: false});
    }
  }

  componentDidMount() {
    this.storeNavigationParams();
    console.log("Did Mount");
    if(!this.state.authToken) { 
      console.log("Calling setToken");
      this._setToken();
    }
    this._mounted = true;
  }

  componentDidUpdate() {
    if(this.state.authToken && this.state.listStale)
    { 
      console.log("Fetching...");
      (async ()=>{
        result = await this._getListItemDetails();
        if(result)
          this.setState({listStale: false});
      })();
    }
    else if (this.state.tableData &! this.state.listStale)
    {
      return;
    }
    else if(!this.state.authToken)
    {
      console.log("Token not set with cDM; calling settoken");
      this._setToken();
    }
  }

  componentWillUnmount() {
    console.log("Will Unmount");
    this._mounted = false;
  }

  /* necessary because Search is in a different stackNavigator */
  storeNavigationParams() {
    let parms = {
      pryceListId: this.state.pryceListId,
      routeName: this.props.navigation.state.routeName,
      //addItemCallBack: this.addItemToList 
    };
    let serParms = JSON.stringify(parms)
    AsyncStorage.setItem(serParms).then(res => console.log(res)).catch( (err) => {
      console.log("Failed to store parms: " + err);
    });
  }
  
  addItemToList = async(itemJson, plid) => {
		//let url = 'https://pryce-cs467.appspot.com/pryce_lists/' + plid;
    let url = 'http://192.168.1.100:5000/pryce_lists/' + plid;
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken
      },
      body: itemJson,
    })
    .then(response => response.json())
    .then(responseJson => { 
      console.log("response: " + responseJson); 
    })
    .catch(error => console.error(error));
	};

_getListItemDetails = async () => {
    let result = true; 
    let resJson = null;
    console.log("authToken in getPryceLists: " + this.state.authToken);
		let url = 'https://pryce-cs467.appspot.com/pryce_lists/details/' + this.state.pryceListId;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken
			}, 
    })
    .then(response => response.json())
    .then( jsonObj => { 
      let tableRows = jsonObj.map( (cv, i, responseJson) => {
        return [cv.item_name, cv.price, cv.store_name, cv.reported];
        } 
      );
      this.setState({ tableData: tableRows});
    })
    .catch(error => {console.error(error); result = false;})
    return result;
	};

	render(){
    if( !this.state.tableData || !this._mounted )
    {
      return (<SafeAreaView><Text>Loading...</Text></SafeAreaView>);
    } 
    else
    {
      return (
        <SafeAreaView style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={this.state.tableData} textStyle={styles.text}/>
          </Table>
          <View style={{alignContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}
                style={styles.buttonContainer} >
              <Text style={styles.buttons}>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonContainer}
              >
              <Text style={styles.buttons}>Back</Text>
            </TouchableOpacity>
          </View>
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
    buttons: {
      fontSize: 18,
      color: "#121212",
      width: '35%', 
      padding: 15,
      borderWidth: 1,
    },
  }
);
