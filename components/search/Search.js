import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';
import {
	DataTablePagination,
	TextField,
	Icon,
	IconButton,
	Card,
	CardHeader,
} from 'material-bread';


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
	
	_toggleShow = () => {
		this.setState({ showResults: true });
		this.handleSubmit();
	};

	handleSubmit = async () => {
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
	};


	selectedItem(itemInstance) {
		let navParams = this.props.navigation.getParam('routeName', null);
		if (navParams === 'ListDetails') {
			let listId = this.props.navigation.getParam('listId', null);
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
		return (
			<SafeAreaView>
				<Card radius={1} shadow={4} style={{ maxWidth: 400, width: '100%' }}>
					<CardHeader
						title="Results"
						subtitle="Select an item for more details"
					/>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Brand</DataTable.Title>
							<DataTable.Title>Name</DataTable.Title>
						</DataTable.Header>
						{this.state.data
							.slice(
								this.state.page * this.state.perPage,
								this.state.page * this.state.perPage + this.state.perPage
							)
							.map(item => (
								<DataTable.Row
									onPress={() => this.selectedItem(item)}
									key={item.code}>
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
			</SafeAreaView>
		);
	};

	render() {
		return ( 
			<View style={styles.searchContainer}>
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

