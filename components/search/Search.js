import React, { Component } from 'react';
import {
	Button,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	FlatList
} from 'react-native';
import { Card } from 'react-native-paper';
import ItemInfo from '../item/ItemInfo';
import { withNavigation } from 'react-navigation';
import { styles } from '../Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

// class ItemButton extends Component {
	
// 	onPress(itemInstance){
// 		//searchNav proxy for navigation object; provided by Search class in render()	
// 		let navParams = this.props.searchNav.state.params; 
// 		if(navParams)	
// 		{
// 			if(navParams.routeName === 'ListDetails')
// 			{
// 				let listId = navParams.listId;
// 				this.props.searchNav.navigate(navParams.routeName, {
// 					addedItem: itemInstance, pryceListId: listId
// 				});
// 			}
// 		}
// 		else //default to std search 
// 		{
// 			//go to itemInfo and take the item 
// 			this.props.searchNav.navigate('ItemInfo', {item: itemInstance});
// 		}
// 	}
	
// 	render(){
// 		return (
// 				<Text onPress={() => this.onPress(this.props.instance)}>
// 					{this.props.instance.brand} - {this.props.instance.name}
// 				</Text> 
// 		);
// 	}
// }

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemName: '',
			error: false,
			data: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			itemName: e.nativeEvent.text
		});
	}

	handleSubmit = async () => {
		console.log(this.state.itemName);
		const url = `https://pryce-cs467.appspot.com/items?name=${this.state.itemName}`;
		const response = await fetch(url, {
			method: 'GET',
		})
		.then(response => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			this.setState({
				data: responseJson
			})
		})
		.catch(error => console.error(error));
	}

	selectedItem(itemInstance){
		let navParams = this.props.navigation.getParam('routeName', 'null');
		console.log(this.props.navigation)
		if(navParams === 'ListDetails')
			{
				let listId = this.props.navigation.getParam('listId', 'null');
				this.props.navigation.navigate(navParams, {
					addedItem: itemInstance, pryceListId: listId
				});
			}
		else //default to std search 
		{
			//go to itemInfo and take the item 
			let itemCode = itemInstance.code;
			//console.log(data);
			this.props.navigation.navigate('ItemInfo', {itemData: itemInstance});
		}
	}

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	FlatListItemSeparator = () => {
        return (
        <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };


	render() {
		
		return (
		<View style={styles.searchContainer}>
			<Text style={styles.title}>Search for Item</Text>
			<TextInput
				style={styles.searchInput}
				onChange={this.handleChange}
				/>
			<TouchableHighlight
					style = {styles.button}
					underlayColor= "white"
					onPress = {this.handleSubmit}
				>
				<Text
					style={styles.searchButtonText}>
					Search
				</Text>
			</TouchableHighlight>
			<Card>
			<FlatList
			
					initialNumToRender='20'
					maxToRenderPerBatch='100'
					data={ this.state.data }
					ItemSeparatorComponent = {this.FlatListItemSeparator}
					renderItem={({item}) => 
						<TouchableOpacity style={styles.button}
							onPress={ () => this.selectedItem(item)}>
							<Text>{item.brand} - {item.name}</Text>
						</TouchableOpacity>
					}
					keyExtractor={item => item.code}
				/>
			</Card>

		</View>
		)
	}
}

export default withNavigation(Search)

