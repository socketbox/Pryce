import React, { Component } from 'react';
import {
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
  onPress(plid) {
    this.props.pryceListDetails.push('ListDetails', { pryceListId: plid });
  }

  async deleteList(plid){
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

  _alert = () => (Alert.alert(`This is pryceListId ${this.props.pryceListId}`))

  render() {
    return (
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginWidth: 50, borderWidth: 1, borderColor: 'red'}}>
        <Button title={this.props.pryceListName} onPress={() => this.onPress(this.props.pryceListId)} />
        <Button title='DELETE' onPress={() => this.deleteList(this.props.pryceListId)} 
            style={{borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} />
        <Button title='DUPLICATE' onPress={() => this.onPress(this.props.pryceListId)} />
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
      baseApiUrl: 'http://192.168.1.100:5000'
      //baseApiUrl: 'https://pryce-cs467.appspot.com',
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
              pryceListDetails={this.props.navigation} 
              pryceListId={item.pryce_list_id} 
              pryceLists={this.state.pryceLists}
              setParentState={this.setFlatListState} 
              pryceListName={item.name} />
            }
          keyExtractor={item => item.key}
          extraData={listData}
        />
        <View style={{alignItems: 'center'}}>
        <View style={styles.newList}>
          <TextInput style={styles.newListForm}
            placeholderTextColor="#CCCCCC"
            editable={true}
            placeholder="New List Name"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ newListName: text })}
          />
          <Button title="New List" onPress={() => { this._postNewList(this.state.newListName); }} />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.generalButtonTO}>
          <Text style={styles.generalButtonText}>Back</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>

	  );
  }
}
