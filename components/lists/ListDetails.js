import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { 
  StyleSheet,
  AsyncStorage,
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  View 
  } from 'react-native';
import { Cell, Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { withNavigation } from 'react-navigation';
//import { styles } from '../Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

class ListDetails extends Component {
  _mounted = null;
  
  constructor(props) {
    super(props);
    
    this.state = {
      tableHead: ['Name', 'Price', 'Store', 'Reported', ''],
      //colWidthArr: [100, 50, 100, 50, 25],
      baseApiUrl: 'https://pryce-cs467.appspot.com',
      //baseApiUrl: 'http://192.168.1.100:5000',
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
    let addedItem = null;
    AsyncStorage.getItem('addedItem').
        then( (res) => {
          addedItem = JSON.parse(res); 
          //table library expects an array
          if(addedItem)
          {
            let backingArray = this.state.tableData;
    
            backingArray.push( 
              Array.of(addedItem.item_name, addedItem.price, addedItem.store_name, addedItem.reported, addedItem.item_id) );
            this.setState({tableData: backingArray});

            //add item to db
            this.addItemToList(addedItem, this.props.navigation.state.params.pryceListId);
            AsyncStorage.removeItem('addedItem');
          }
        },
        err => {console.log(err)}
    );
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
    let url = this.state.baseApiUrl + '/pryce_lists/' + plid;
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
 
  deleteItem(itemId, rowIndex){
    let authToken = ( async () => {
      let user = await AsyncStorage.getItem('user');
      let token = JSON.parse(user).authToken; 
      return token;
    })();
    
    
    let listArr = this.state.tableData
    let plid = this.state.pryceListId
    //console.log("In deleteItem. itemId, rowIndex: " + itemId + ", " + rowIndex);
    let url = this.state.baseApiUrl + '/pryce_lists/' + plid + '/' + itemId;
    fetch(url, { 
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + authToken
      }
    }).then(res => console.log(res), err => {console.log(err)})

    let backingArray = this.state.tableData;
    //delete row that corresponds to item
    backingArray.splice(rowIndex, 1);
    this.setState({tableData: backingArray});
  }

_getListItemDetails = async () => {
    let result = true; 
    let resJson = null;
    console.log("authToken in getPryceLists: " + this.state.authToken);
		let url = this.state.baseApiUrl + '/pryce_lists/details/' + this.state.pryceListId;
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
        return [ cv.item_name, cv.price, cv.store_name, cv.reported, cv.item_id];
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
      return (<ActivityIndicator size="large" color="#0000ff" />);
    } 
    else
    {
      const element = (itemId, index) => (
        <TouchableOpacity onPress={() => this.deleteItem(itemId, index)}>
          <FeatherIcon name='trash' style={styles.button}/>
        </TouchableOpacity>
      );
      
      return (
        <SafeAreaView style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} >
            <Row data={this.state.tableHead} textStyle={styles.text} />
            {
              this.state.tableData.map(( rowData, index ) => (
                <TableWrapper key={index} style={styles.row} widthArr={this.state.colWidthArr} >
                  { 
                    rowData.map( (cellData, cellIndex ) => (
                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}  />
                    ))
                  }
                </TableWrapper>
              )) 
            }
          </Table>
          <View style={ styles.buttonView }>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {
              listId: this.state.pryceListId,
              routeName: this.props.navigation.state.routeName
            })}
                style={styles.buttonContainer} >
              <Text style={styles.button}>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonContainer}
              >
              <Text style={styles.button}>Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Arial',
    fontSize: 14,
    padding: 10,
    color: '#444', 
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#999',
    backgroundColor: '#E6E6E6',
    borderRadius: 2,
    lineHeight: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    width: '100%'
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  container: 
  {
    flex: 1, 
    width:'95%', 
		height: '90%',
    padding: 15,
    paddingTop: 25,
  }, 
  //singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  //head: { flex: 1, backgroundColor: '#c8e1ff' },
  //title: { flex: 2, backgroundColor: '#f6f8fa' },
  row: { flexDirection: 'row', backgroundColor: '#FFF' },
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
});

export default withNavigation(ListDetails);
