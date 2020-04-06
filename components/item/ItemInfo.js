import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';
import { Button } from 'material-bread'

export default class ItemInfo extends React.Component {
	state = {
			data: [],
			priceList: [],
			selectedStore: null,
			currency: 'USD',
			currentTime: null,
			itemName: null,
			itemCode: this.props.navigation.getParam('itemCode', 'null'),
			pryceListId: this.props.navigation.getParam('pryceListId', 'null'),
			itemBrand: null,
			itemQuantity: null,
			itemQuantUnit: null,
			itemDescription: null,
			itemData: [],
			sortAscending: false,
		};

	componentDidMount() {
		this._searchItem();
		this._getItemInfo();
	}

	componentWillUnmount() {
		console.log("WillUnmount");
	}


	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	_searchItem = async () => {
		console.log("searchItem");
		const url = `http://pryce-cs467.appspot.com/items/${
		this.state.itemCode
		}/prices`;
		const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(responseJson => {
			this.setState({ data: responseJson });
		})
		.catch(error => console.error(error));
		//console.log(this.state.data);

		//this.setState({ itemData: })
		this._storePrices();
	};

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	_getItemInfo = async () => {
		console.log("getItemInfo");
		let itemCode = this.props.navigation.getParam('itemCode', 'null');
		let tempData = [];
		let data = {
			item_id: this.state.itemId,	
			currency: this.state.currency,
			reported: this.state.currentTime,
			code: this.state.itemCode, //this.props.navigation.state.params.data,
			brand: this.state.itemBrand,
			name: this.state.itemName,
			quantity: this.state.itemQuantity,
			quant_unit: this.state.itemQuantUnit,
			description: this.state.itemDescription,
		};

		const url = `http://pryce-cs467.appspot.com/items/${this.state.itemCode}`;
		const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(responseJson => {
			console.log(responseJson);
			this.setState({ tempData: responseJson });
		})
		.catch(error => console.error(error));

		data.item_id = this.state.tempData.item_id;
		data.brand = this.state.tempData.brand;
		data.description = this.state.tempData.description;
		data.image = this.state.tempData.image;
		data.name = this.state.tempData.name;
		data.quant_unit = this.state.tempData.quant_unit;
		data.quantity = this.state.tempData.quantity;

		this.setState({ itemData: data });
		// console.log(this.state.itemData);
	};

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**Function to retrieve and store store name and place_id */
	_storePrices() {
		// console.log(this.state.data);
		let i = 0;
		let tempStore = '';
		let tempPrice = '';
		let tempPriceID = '';
		let tempArr = [];

		for (i = 0; i < this.state.data.length; i++) {
			tempStore = this.state.data[i].store;
			tempPriceID = this.state.data[i].price_id;
			tempPrice = this.state.data[i].price;
			tempArr.push({
				price_id: tempPriceID,
				price: tempPrice,
				store: tempStore,
			});
		}
		this.setState({ priceList: tempArr });
	}

	_selectItem(item){
		let itemData = this.state.itemData
		let pryceListId = this.state.pryceListId
		if(!pryceListId )	
			throw new Error('No pryceListId before navigate to ItemDetail')
		this.props.navigation.navigate('ItemDetail', { item, itemData, pryceListId })
	}

	render() {
		let title = this.state.itemData.brand + ' - ' + this.state.itemData.name;
		let description = this.state.itemData.description;
		return (
			<View style={styles.searchContainer}>
				{/*<Text style={styles.title}>Information</Text>*/}
				<Card>
					<Card.Title
						titleStyle={{ fontSize: 25 }}
						wrapperStyle={true}
						title={title}
						subtitle={description}
					/>
					<Card.Content>
						<Text style={{ fontSize: 16 }}>Select item for details</Text>
						<DataTable>
							<DataTable.Header>
								<DataTable.Title>Store</DataTable.Title>
								<DataTable.Title numeric>Price</DataTable.Title>
							</DataTable.Header>
							{this.state.priceList.map(item => (
								<DataTable.Row
									onPress={() => this._selectItem(item)}
									key={item.price_id}>
								<DataTable.Cell 
									borderRight flex={2}>
									{item.store.name}
								</DataTable.Cell>
								<DataTable.Cell numeric>
									{item.price}
								</DataTable.Cell>
								</DataTable.Row>
							))}
						</DataTable>
					</Card.Content>
				</Card>
				<View 
					style={{
						flexDirection: 'row', 
						alignItems: 'center', 
						justifyContent: 'space-evenly', 
						flexWrap: 'wrap'
					}}>
					<Button 
						style={styles.button}
						text={'Back'} 
						type="text" 
						onPress={() => this.props.navigation.navigate('Search')} 
					/>
					<Button 
						style={styles.button}
						text={'add new price'} 
						type="outlined" 
						onPress={() =>
							this.props.navigation.navigate('NewPrice', {
								item: this.state.itemData,
							})
						}
					/>
				</View>
			</View>
		);
	}
}
