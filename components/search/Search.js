import React, { Component } from 'react';
import {
	Button,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Card, DataTable  } from 'react-native-paper';
import { DataTablePagination } from 'material-bread';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
		itemName: '',
		error: false,
		data: [],
		page: 0,
		perPage: 6,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
		itemName: e.nativeEvent.text,
		});
	}

	handleSubmit = async () => {
		const url = `https://pryce-cs467.appspot.com/items?name=${
		this.state.itemName
		}`;
		const response = await fetch(url, {
		method: 'GET',
		})
		.then(response => response.json())
		.then(responseJson => {
			console.log(responseJson);
			this.setState({
			data: responseJson,
			});
		})
		.catch(error => console.error(error));
	};

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

	render() {
		return (
			<View style={styles.mainContainer}>
			<Card>
				<Card.Title
				titleStyle={{ fontSize: 25 }}
				title="Search"
				subtitle="Look up items in our database!"
				/>
				<Card.Content>
				<TextInput 
					style={styles.searchInput} 
					onChange={this.handleChange} 
					placeholder="Enter item here...">
				</TextInput><Text></Text>
				<DataTable>
					<DataTable.Header>
					<DataTable.Title>Brand</DataTable.Title>
					<DataTable.Title>Store</DataTable.Title>
					</DataTable.Header>
					{this.state.data
					.slice(
					this.state.page * this.state.perPage,
					this.state.page * this.state.perPage + this.state.perPage,
					).map(item => (
					<DataTable.Row
						onPress={ () => this.selectedItem(item)}
						key={item.brand}>
						<DataTable.Cell 
						borderRight flex={2}>
						{item.brand}
						</DataTable.Cell>
						<DataTable.Cell numeric>
						{item.name}
						</DataTable.Cell>
					</DataTable.Row>
					))}
					<DataTablePagination
						style={{flex: 1, alignContent: 'center', alignItems: 'center'}}
						page={this.state.page}
						numberOfPages={this.state.data.length / this.state.perPage}
						numberOfRows={this.state.data.length}
						perPage={this.state.perPage}
						onChangePage={page => this.setState({ page: page })}
						onChangeRowsPerPage={perPage => this.setState({ perPage: perPage })}
						possibleNumberPerPage={[ 3, 6]}
					/>
				</DataTable>
				</Card.Content>
			</Card>
				<TouchableOpacity
				style={styles.button}
				onPress={this.handleSubmit}>
				<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default withNavigation(Search);
