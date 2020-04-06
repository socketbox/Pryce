import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DataTablePagination } from 'material-bread';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../Styles'
import { Button, Card, CardHeader } from 'material-bread';

class ListDetails extends Component {
  _mounted = null;
  
  constructor(props) {
    super(props);
    
    this.state = {
      baseApiUrl: 'https://pryce-cs467.appspot.com',
      tableData: null,
      page: 0,
      perPage: 8,
      listStale: true,
      pryceListId: this.props.navigation.state.params.pryceListId,
      pryceListName: this.props.navigation.state.params.pryceListName,
    };
  }

  _setToken = async () => {
    const token = await AsyncStorage.getItem('user').then((res) => {
        const parsed = JSON.parse(res);
        return {authToken: parsed.authToken};
      });

    //console.log("ListDetails: token value: " + token.authToken);
    if( token.authToken )
    {
      //console.log("ListDetails: setToken: " + token.authToken);
      this.setState( token );
    }
    else
    {
      this.setState({readyToRender: false});
    }
  }

  addItemFromSearch()
  {
    /*if we're coming back from Search->ItemInfo->ItemDetail, check for added item*/
    if(this.props.navigation.getParam('routeFrom') === 'ItemDetail')
    {
      let addedItem = this.props.navigation.getParam('addedItem', null);
      if(addedItem)
      {
        let backingArray = this.state.tableData;

        backingArray.push(addedItem);
          //Array.of(addedItem.item_name, addedItem.price, addedItem.store_name, addedItem.reported, addedItem.item_id));
        this.setState({ tableData: backingArray });

        //clear addedItem and add item to db
        this.props.navigation.setParams({addedItem: null});
        this.addItemToList(addedItem, this.props.navigation.state.params.pryceListId);
      }
    }
    //else
      //console.log("Info: in ListDetails.addItemFromSearch(); no 'routeFrom' in navigation params");
  }

  addItemToList = async(itemObj, plid) => {
    let token = this.state.authToken;
    //console.log("authToken in addItemToList: " + token);
    let url = this.state.baseApiUrl + '/pryce_lists/' + plid;
    //console.log("url in addItemToList: " + url);
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
      //console.log("response: " + JSON.stringify(responseJson));
    })
    .catch(); 
    //error => {console.log("in add item to list"); console.error(error);});
  };

  componentDidMount() {
    //this.storeNavigationParams();
    //console.log("Did Mount");
    if(!this.state.authToken) { 
      //console.log("ListDetails: calling _setToken()");
      this._setToken();
    }
    this._mounted = true;
    this._unsubscribe = this.props.navigation.addListener('didFocus', () =>
      { this.addItemFromSearch() }
    );
  }

  componentDidUpdate() {
    if(this.state.authToken && this.state.listStale)
    { 
      //console.log("Fetching...");
      (async ()=>{
        try{
          result = await this._getListItemDetails();
          if(result)
            this.setState({listStale: false});
        }
        catch(err)
        {
          //console.log("error in cDU: " + err);
        }
      })();
    }
    else if (this.state.tableData &! this.state.listStale)
    {
      return;
    }
    else if(!this.state.authToken)
    {
      //console.log("Token not set with cDM; calling settoken");
      this._setToken();
    }

    //console.log("at end of cDU");
  }

  componentWillUnmount() {
    //console.log("Will Unmount");
    this._mounted = false;
    this._unsubscribe.remove();
  }

   
  deleteItem(itemId, rowIndex){
  
    let authToken = this.state.authToken;
    
    let listArr = this.state.tableData
    let plid = this.state.pryceListId
 
    let url = this.state.baseApiUrl + '/pryce_lists/' + plid + '/' + itemId;
    fetch(url, { 
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + authToken
      }
    });
    //.then(res => console.log(res), err => {console.log(err)})

    let backingArray = this.state.tableData;
    //delete row that corresponds to item
    backingArray.splice(rowIndex, 1);
    this.setState({tableData: backingArray});
  }

_getListItemDetails = async () => {
    let result = true; 
		let url = this.state.baseApiUrl + '/pryce_lists/details/' + this.state.pryceListId;
    //console.log("url in _getListItemDetails: " + url);
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken
			}, 
    })
    .then(response => response.json())
    .then(jsonResp => {
      this.setState({tableData: jsonResp});
      this.setState({listStale: false})
    })
    .catch(error => {
      //console.log("error in _getListItemDetails"); 
      //console.error(error);
      this.setState({listStale: true})})
	}

	render(){
    if( !this.state.tableData || !this._mounted )
    {
      return (
        <SafeAreaView style={styles.activityIndicator}>
          <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="#d3d3d3" />
        </SafeAreaView>
      )
    } 
    else
    {
      return (
        <SafeAreaView style={{flex: 9, flexDirection: 'column'}}>
          <Card radius={1} shadow={1} style={{ maxWidth: 400, width: '100%', flex: 8}}>
            <CardHeader title={this.state.pryceListName} />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.listDetailsNameColumn}>Item</DataTable.Title>
                <DataTable.Title style={styles.listDetailsPriceColumn} numeric >Price</DataTable.Title>
                <DataTable.Title >Location</DataTable.Title>
                <DataTable.Title style={{flex: 1}}></DataTable.Title>
              </DataTable.Header>
              {this.state.tableData
                .slice(
                  this.state.page * this.state.perPage,
                  this.state.page * this.state.perPage + this.state.perPage
                )
                .map((item, index) => (
                  <DataTable.Row key={item.item_id} >
                    <DataTable.Cell style={styles.listDetailsNameColumn}>{item.item_name}</DataTable.Cell>
                    <DataTable.Cell style={styles.listDetailsPriceColumn} numeric>{item.price}</DataTable.Cell>
                    <DataTable.Cell style={styles.listDetailsStoreColumn}>{item.store_name}</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.listDetailsIconColumn}>
                        <FeatherIcon name='trash' style={styles.button} onPress={() => this.deleteItem(item.item_id, index)} />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              <Text />
              <DataTablePagination style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                page={this.state.page}
                numberOfPages={this.state.tableData.length / this.state.perPage}
                numberOfRows={this.state.tableData.length}
                perPage={this.state.perPage}
                onChangePage={page => this.setState({ page: page })}
              />
            </DataTable>
          </Card>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button text={'Add Item'} onPress={
                () => this.props.navigation.navigate('Search', {
                  listId: this.state.pryceListId, routeFrom: this.props.navigation.state.routeName
                })
              } style={styles.button} type='outlined' />
			      <Button type='outlined' text={'Back'} onPress={() => this.props.navigation.goBack()} style={styles.button} />
          </View>
        </SafeAreaView>
      );
    }
  }
}

export default withNavigation(ListDetails);
