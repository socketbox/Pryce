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

class ItemButton extends Component {
	
	onPress(itemInstance){
		//searchNav proxy for navigation object; provided by Search class in render()	
		let navParams = this.props.searchNav.state.params; 
		if(navParams)	
		{
			if(navParams.routeName === 'ListDetails')
			{
				let listId = navParams.listId;
				this.props.searchNav.navigate(navParams.routeName, {
					addedItem: itemInstance, pryceListId: listId
				});
			}
		}
		else //default to std search 
		{
			//go to itemInfo and take the item 
			this.props.searchNav.navigate('ItemInfo', {item: itemInstance});
		}
	}
	
	render(){
		return (
			<View>
				<Button title={this.props.title} onPress={() => this.onPress(this.props.instance)} /> 
			</View>
		);
	}
}


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
					style={styles.buttonText}>
					SEARCH
				</Text>
			</TouchableHighlight>
			<Card>
			<FlatList
			
					initialNumToRender='20'
					maxToRenderPerBatch='100'
					data={ this.state.data }
					ItemSeparatorComponent = {this.FlatListItemSeparator}
					renderItem={({item}) => 
					<ItemButton instance={item} searchState={this.state} searchNav={this.props.navigation}
						title={item.name} style={styles.item}>{item.brand} - {item.name}           
					</ItemButton>}
					keyExtractor={item => item.code}
				/>
			</Card>

		</View>
		)
	}
}

export default withNavigation(Search)

