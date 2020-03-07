import React, { Component } from 'react';
import {
	Button,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	FlatList,
	AsyncStorage
} from 'react-native';
import { DataTable } from 'react-native-paper';
import ItemInfo from '../item/ItemInfo';
import { DataTablePagination } from 'material-bread';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';
import {
	TextField,
	Icon,
	IconButton,
	Card,
	CardHeader,
	CardContent,
} from 'material-bread';


class ItemButton extends Component {

	/*
	onPress(srchObj){
	   this logic now included in selectedItem(itemInstance)	
    //searchNav proxy for navigation object; provided by Search class in render()	
		let navParams = this.props.searchNav.state.params; 
		if(navParams)	
		{
			if(navParams.routeName === 'ListDetails')
			{
				let listId = navParams.listId;
			  //asyncstorage not necessary (merged out)	
        AsyncStorage.setItem('addedItem', JSON.stringify(srchObj));
				AsyncStorage.setItem('pryceListId', JSON.stringify(listId));
				this.props.searchNav.navigate(navParams.routeName);
			}
		}
		else //default to std search 
		{
			//go to itemInfo and take the item 
			this.props.searchNav.navigate('ItemInfo', {item: itemInstance});
		}
	}*/
	
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
		data: [],
		page: 0,
		perPage: 5,
		showResults: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/*handleChange(e) {
		this.setState({
			itemName: e.nativeEvent.text
		});
	}*/
	
  	_toggleShow = () => {
		this.setState({ showResults: true });
	};

	handleSubmit = async () => {
		console.log(this.state.itemName);
		//const url = 'http://192.168.1.100:5000/items/search';
		const url = 'https://pryce-cs467.appspot.com/items/search';
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
  	};

  	/*NEED TO REFACTOR THIS INTO FUNCTION SERVICE 
	FlatListItemSeparator = () => {
        return (
        <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };
	*/

	selectedItem(itemInstance) {
		let navParams = this.props.navigation.getParam('routeName', 'null');
		if (navParams === 'ListDetails') {
			let listId = this.props.navigation.getParam('listId', 'null');
			this.props.navigation.navigate(navParams, {
				addedItem: itemInstance,
				pryceListId: listId,
			});
		} //default to std search
		else {
			//go to itemInfo and take the item
			let itemCode = itemInstance.code;
			this.props.navigation.navigate('ItemInfo', { itemCode });
		}
	}

	/*Render result card after search */
	displayResults = () => {
		this.handleSubmit();
		return (
			<Card radius={1} shadow={4} style={{ maxWidth: 400, width: '100%' }}>
				<CardHeader
					title="Results"
					subtitle="Select an item for more details"
				/>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Brand</DataTable.Title>
						<DataTable.Title>Store</DataTable.Title>
					</DataTable.Header>
					{this.state.data
						.slice(
							this.state.page * this.state.perPage,
							this.state.page * this.state.perPage + this.state.perPage
						)
						.map(item => (
							<DataTable.Row
								onPress={() => this.selectedItem(item)}
								key={item.brand}>
								<DataTable.Cell>{item.brand}</DataTable.Cell>
								<DataTable.Cell>{item.name}</DataTable.Cell>
							</DataTable.Row>
						))}
					<Text />
					<DataTablePagination
						style={{
							flex: 1,
							alignContent: 'center',
							alignItems: 'center',
						}}
						page={this.state.page}
						numberOfPages={this.state.data.length / this.state.perPage}
						numberOfRows={this.state.data.length}
						perPage={this.state.perPage}
						onChangePage={page => this.setState({ page: page })}
					/>
					<Text />
				</DataTable>
			</Card>
		);
	};

	render() {

		/*let searchList = (srchData) => {
				console.log(srchData);
				return(<FlatList initialNumToRender='20' maxToRenderPerBatch='100'
							data={ srchData } ItemSeparatorComponent = {this.FlatListItemSeparator}
							renderItem={({item}) => 
							<ItemButton instance={item} searchState={this.state} searchNav={this.props.navigation}
								title={item.item_name} style={styles.item}>
							</ItemButton>}
							keyExtractor={item => item.code} /> );
			};
		*/

		return ( /*
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
						SEARCH
					</Text>
				</TouchableHighlight>
				<Card>
					{searchList(this.state.data)}
				</Card>
			</View>
		)*/

			<View style={styles.mainContainer}>
				<TextField
					style={{ width: '90%' }}
					label="Enter text here..."
					focusedLabelColor={'#3d3d3d'}
					value={this.state.itemName}
					leadingIcon={<Icon name={'search'} size={24} color={'#6e6e6e'} />}
					trailingIcon={
						<IconButton
							name={'arrow-forward'}
							size={18}
							color={'#6e6e6e'}
							onPress={this._toggleShow}
						/>
					}
					onChangeText={value => this.setState({ itemName: value })}
				/>
				<Text style={styles.textStyleSmall}>
					Search for items in our database!
			</Text>
				<Text />
				{this.state.showResults && this.displayResults()}
				<View />
			</View>
		);
	}
}

export default withNavigation(Search);

