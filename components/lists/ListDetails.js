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
import { withNavigation } from 'react-navigation';
import { styles } from '../Styles'

class ListDetails extends Component {
  _mounted = null;
  
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Price', 'Store', 'Reported'],
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

  _addItemFromSearch()
  {
    /*if we're coming back from Search, check for added item*/
    if(this.props.navigation.state.params.addedItem)
    {
      //table library expects an array
      let addedItem = this.props.navigation.state.params.addedItem;
      let backingArray = this.state.tableData;
      //TODO: filter the values returned such that they conform to table columns defined in tableHead
      backingArray.push(Object.values(addedItem));
      this.setState({tableData: backingArray});

      //add item to db
      this.addItemToList(addedItem, this.props.navigation.state.params.pryceListId);
    }
  }

  componentDidMount() {
    //this.storeNavigationParams();
    console.log("Did Mount");
    if(!this.state.authToken) { 
      console.log("Calling setToken");
      this._setToken();
    }
    this._mounted = true;
    this._unsubscribe = this.props.navigation.addListener('didFocus', () =>
      { this._addItemFromSearch() }
    );
  }

  componentDidUpdate() {
    if(this.state.authToken && this.state.listStale)
    { 
      console.log("Fetching...");
      (async ()=>{
        try{
          result = await this._getListItemDetails();
          if(result)
            this.setState({listStale: false});
        }
        catch(err)
        {
          console.log("error in cDU: " + err);
        }
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
    this._unsubscribe.remove();
  }

  /* necessary because Search is in a different stackNavigator 
  storeNavigationParams() {
    let serPlid = JSON.stringify(this.state.pryceListId);
    AsyncStorage.setItem(serPlid).then(res => console.log(res)).catch( (err) => {
      console.log("Failed to store parms: " + err);
    });
  }*/
  
  addItemToList = async(itemObj, plid) => {
    let token = null;
    try{
      let user = await AsyncStorage.getItem('user');
      token = JSON.parse(user).authToken; 
    }
    catch(err)
    {
      console.log(err);
    } 
    setTimeout(()=>{},1000);
    let url = 'https://pryce-cs467.appspot.com/pryce_lists/' + plid;
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then(responseJson => { 
      console.log("response: " + JSON.stringify(responseJson));
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {
              listId: this.state.pryceListId,
              routeName: this.props.navigation.state.routeName
            })}
                style={styles.buttonContainer} >
              <Text style={styles.buttons}>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.button}
              >
              <Text style={styles.buttons}>Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}


export default withNavigation(ListDetails);
