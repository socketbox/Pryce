import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
//https://github.com/shimohq/react-native-prompt-android/issues/45
import { Alert, ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DataTablePagination } from 'material-bread';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../Styles'
import { Button, Card, CardHeader } from 'material-bread';


export default class UserLists extends Component {
  state = {
    page: 0,
    perPage: 8,
    tableData: null,
    listStale: true,
    readyToFetch: false,
    readyToRender: false,
    baseApiUrl: 'https://pryce-cs467.appspot.com',
  };

  setUser(){
    AsyncStorage.getItem('user')
      .then( user => {
          let parsedUser = JSON.parse(user);
          this.setState({userObj: parsedUser})})
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if(!this.state.userObj) 
      this.setUser();
    else
      this.getPryceLists();
  }

  componentDidUpdate() {
    //if (this.state.readyToaFetch && this.state.listStale) {
    if (!this.state.userObj)
      this.setUser()
    else if (!this.state.tableData)
    {
      this.getPryceLists();
    }
    
    /*else  if (this.state.tableData)
        this.setState({ readyToRender: true });
    }
    else if (this.state.readyToRender && !this.state.listStale) {
      return;
    }
    else {
      this.setUser();
    }*/
  }

  postNewList = async (listName) => {
    let url = this.state.baseApiUrl + '/pryce_lists/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.userObj.authToken
      },
      body: JSON.stringify(listName),
    })
      .then(response => response.json())
      .then(responseJson => {
        let pls = Array.from(this.state.tableData)
        console.log("response: " + responseJson + ", pls arr: " + pls);
        pls.push(responseJson);
        this.setState({ tableData: pls });
      })
      .catch(error => console.error(error));
  };

  getPryceLists = async () => {
    console.log("authToken in getPryceLists: " + this.state.userObj.authToken);
    let url = this.state.baseApiUrl + '/pryce_lists/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.userObj.authToken,
      }
    })
      .then(response => response.json())
      .then(responseJson => { this.setState({ tableData: responseJson }); })
      .catch(error => console.error(error));
  
    if(this.state.tableData != null)
      this.setState({readyToRender: true});
  };

  copyList = async(plid, name) => {
    
    let url = this.state.baseApiUrl + '/pryce_lists/duplicate/' + plid;
    fetch(url, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.userObj.authToken
        },
        body: JSON.stringify(name)
      })
      .then(response => response.json())
      .then(responseJson => {
        let pls = this.state.tableData;
        console.log("response: " + responseJson + ", pls arr: " + pls);
        pls.push(responseJson);
        this.setState({ pryceLists: pls });
      })
      .catch(error => console.error(error));
  }

  deleteList = async (plid) => {
    let url = this.state.baseApiUrl + '/pryce_lists/' + plid;
    console.log("delete url: " + url);
    fetch(url, { 
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.userObj.authToken
      }
    }).then(res => console.log(res), err => {console.log(err)})

    let listObjs = this.state.tableData;
    for(let i = 0; i < listObjs.length; i++)
    {
      //delete relevant list 
      if(listObjs[i].pryce_list_id === plid)
        listObjs.splice(i, 1);
    }
    console.log(listObjs);
    this.setState({tableData: listObjs});
  }

  render() {
    if (!this.state.readyToRender) {
      return (
      <SafeAreaView style={styles.activityIndicator}>
        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color="#d3d3d3" />
      </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={{ flex: 9, flexDirection: 'column' }}>
        <Card radius={1} shadow={4} style={{ maxWidth: 400, width: '100%', flex: 8 }}>
          <CardHeader title={this.state.userObj.name + "'s Lists"} />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.listNameColumn}>List Name</DataTable.Title>
              <DataTable.Title style={styles.listCopyColumn}></DataTable.Title>
              <DataTable.Title style={styles.listTrashColumn}></DataTable.Title>
            </DataTable.Header>
            {this.state.tableData
            .slice(
                this.state.page * this.state.perPage,
                this.state.page * this.state.perPage + this.state.perPage
              )
              .map((item, index) => (
                <DataTable.Row key={item.pryce_list_id} >
                  <DataTable.Cell style={styles.listNameColumn} onPress={
                      () => this.props.navigation.push('ListDetails', {
                        pryceListId: item.pryce_list_id, pryceListName: item.name })}>
                          {item.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.listCopyColumn}>
                    <FeatherIcon name='copy' style={styles.button} 
                      onPress={() => { 
                        Alert.prompt('Copied List Name', 'Please provide a name for your copied list.', (name) => {
                          this.copyList(item.pryce_list_id, name)})}} />
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.listTrashColumn}>
                    <FeatherIcon name='trash' style={styles.button} 
                      onPress={() => this.deleteList(item.pryce_list_id)} />
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
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}> 
          
         <Button text={'New List'} style={styles.button} onPress={ () => {
              Alert.prompt('New List Name', 'Please provide a name for your new list.', (name) => {
                        this.postNewList(name) 
                  } ) } 
          } type="outlined" />
        </View>
      </SafeAreaView>

    );
  }
}
