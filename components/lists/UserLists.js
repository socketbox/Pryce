import React, { Component } from 'react';
import {
  //https://github.com/shimohq/react-native-prompt-android/issues/45
  Alert,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { styles } from '../Styles'
import { SafeAreaView } from 'react-native-safe-area-context'


class PryceList extends Component {

  listName = null;

  onPress(plid, plname) {
    this.props.pryceListNav.push('ListDetails', { pryceListId: plid, pryceListName: plname });
  }

  async copyList(plid, name){
    let user = await AsyncStorage.getItem('user');
    let authToken = JSON.parse(user).authToken;
    
    this.listName = name;
    
    let url = this.props.baseApiUrl + '/pryce_lists/duplicate/' + plid;
    fetch(url, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': "Bearer " + authToken
        },
        body: JSON.stringify(this.listName)
      }).then(response => response.json())
      .then(responseJson => {
        let pls = this.props.pryceLists;
        console.log("response: " + responseJson + ", pls arr: " + pls);
        pls.push(responseJson);
        //ugly hack. must call a function passed into component at render in order to set state in DOM parent
        this.props.setParentState({ pryceLists: pls });
      })
      .catch(error => console.error(error));

      this.listName = null;
  }

  async deleteList(plid){
    console.log(JSON.stringify(this.props))
    let user = await AsyncStorage.getItem('user');
    let authToken = JSON.parse(user).authToken;
    
    //let listArr = this.state.tableData
    console.log("In deleteList. authToken: " + JSON.stringify(authToken) );
    console.log("In deleteList. plid: " + plid );
    let url = this.props.baseApiUrl + '/pryce_lists/' + plid;
    fetch(url, { 
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
        'Authorization': "Bearer " + authToken
      }
    }).then(res => console.log(res), err => {console.log(err)})

    let listObjs = this.props.pryceLists;
    for(let i = 0; i < listObjs.length; i++)
    {
      //delete relevant list 
      if(listObjs[i].pryce_list_id === plid)
        listObjs.splice(i, 1);
    }
    console.log(listObjs);
    //ugh. must call a function passed into component at render in order to set state in DOM parent
    this.props.setParentState({pryceLists: listObjs});
  }

  render() {
    let modal = function(){ 
      return (<ListNameModal /> )
    };

    return (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginWidth: 50, borderWidth: 1, borderColor: 'red'}}>
          <Button title={this.props.pryceListName} onPress={() => this.onPress(this.props.pryceListId, this.props.pryceListName)} />
          <Button title='DELETE' onPress={() => this.deleteList(this.props.pryceListId)} 
              style={{borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} />
          <Button title='COPY' onPress={() => { Alert.prompt('Copied List Name', 
              'Please provide a name for your copied list.', (name) => {this.copyList(this.props.pryceListId, name)})}} />
        </View>
    );
  }
}


export default class UserLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pryceLists: [],
      listStale: true,
      readyToRender: false,
      //baseApiUrl: 'http://192.168.1.100:5000'
      baseApiUrl: 'https://pryce-cs467.appspot.com',
    };
    this.setFlatListState = this.setFlatListState.bind(this);
  }

  _setToken = async () => {
    const token = await AsyncStorage.getItem('user').then((res) => {
      console.log("result of getItem: " + res);
      const parsed = JSON.parse(res);
      console.log("parsed.authToken: " + parsed.authToken);
      return { authToken: parsed.authToken };
    });

    console.log("token value: " + token.authToken);
    if (token.authToken) {
      this.setState(token);
      this.setState({ readyToRender: true });
    }
    else {
      this.setState({ readyToRender: false });
    }
  }

  componentDidMount() {
    console.log("Did Mount");
    if (!this.state.readyToRender) {
      console.log("Calling setToken");
      this._setToken();
    }
  }

  componentDidUpdate() {
    if (this.state.readyToRender && this.state.listStale) {
      console.log("Calling _getPryceLists()");
      this._getPryceLists();
      if (this.state.pryceLists)
        this.setState({ listStale: false });
    }
    else if (this.state.readyToRender & !this.state.listStale) {
      return;
    }
    else {
      console.log("calling set token");
      this._setToken();
    }
  }

  componentWillUnmount() {
    console.log("Will Unmount");
  }

  _postNewList = async (listName) => {
    let url = this.state.baseApiUrl + '/pryce_lists/';
    fetch(url, {
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
        this.setState({ pryceLists: pls });
      })
      .catch(error => console.error(error));
  };

  _getPryceLists = async () => {
    console.log("authToken in getPryceLists: " + this.state.authToken);
    let url = this.state.baseApiUrl + '/pryce_lists/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.authToken,
      }
    })
      .then(response => response.json())
      .then(responseJson => { this.setState({ pryceLists: responseJson }); })
      .catch(error => console.error(error));
  };

  setFlatListState(newStateVal)
  {
    console.log("foo");
    this.setState(newStateVal);
  }

  render() {
    if (!this.state.readyToRender) {
      return (<ActivityIndicator size="large" color="#0000ff" />);
    }
    const listData = Object.keys(this.state.pryceLists).map(key => ({ key, ...this.state.pryceLists[key] }));
    console.log(listData);
    return (
      <SafeAreaView>
        <FlatList
          data={listData}
          renderItem={({ item }) => <PryceList baseApiUrl={this.state.baseApiUrl}
            pryceListNav={this.props.navigation}
            pryceListId={item.pryce_list_id}
            pryceLists={this.state.pryceLists}
            setParentState={this.setFlatListState}
            pryceListName={item.name} />
          }
          keyExtractor={item => item.key}
          extraData={listData}
        />
        <View>
          <View style={styles.newList}>
            <TextInput style={styles.newListForm}
              placeholderTextColor="#CCCCCC"
              editable={true}
              placeholder="New List Name"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({ newListName: text })}
            />
            <Button title="New List" onPress={() => { this._postNewList(this.state.newListName); }} />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.generalButtonTO}>
            <Text style={styles.generalButtonText}>Back</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
