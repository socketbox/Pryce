import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default class ItemInfo extends React.Component {
    state = {
            data: [],
			priceList: [],
            selectedStore: null,
            currency: 'USD',
            currentTime: null,
            itemName: null,
            itemCode: this.props.navigation.state.params.data, 
            itemBrand: null,
            itemQuantity: null,
            itemQuantUnit: null,
			itemDescription: null,
			itemData: []
        };
    
    componentDidMount() {
		this._searchItem();
		this._getItemInfo();
    }

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    _searchItem = async () => {
        const url = `http://pryce-cs467.appspot.com/items/${this.state.itemCode}/prices`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
		.then(responseJson => {
			this.setState({ data: responseJson });
		})
		.catch(error => console.error(error));
		//console.log(this.state.data);


		//this.setState({ itemData: })
		this._storePrices();
	}
	
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	_getItemInfo = async () => {
		let tempData = [];
		let data = {
			currency: this.state.currency,
			reported: this.state.currentTime,
				code: this.props.navigation.state.params.data,
				brand: this.state.itemBrand,
				name: this.state.itemName,
				quantity: this.state.itemQuantity,
				quant_unit: this.state.itemQuantUnit,
				description: this.state.itemDescription,
		}

		const url = `http://pryce-cs467.appspot.com/items/${this.state.itemCode}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
		.then(responseJson => {
			this.setState({ tempData: responseJson });
		})
		.catch(error => console.error(error));
		
		data.brand = this.state.tempData.brand;
		data.description = this.state.tempData.description;
		data.image = this.state.tempData.image;
		data.name = this.state.tempData.name;
		data.quant_unit = this.state.tempData.quant_unit;
		data.quantity = this.state.tempData.quantity;

		this.setState({ itemData: data })
		// console.log(this.state.itemData);

	}

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
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

	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    FlatListItemSeparator = () => {
        return (
        <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };

    GetItem(item) {
        /**onPress={this.GetItem.bind(this, item.store)
         * THIS IS FOR BINDING SELECTION TO VAR? set state to go to correct store ID?
         */
        Alert.alert(item);
    }

    render() {
        return (
			<View style={styles.container}>
				<Text>{this.state.itemData.name}</Text>
				<Text>SELECT STORE BELOW TO SEE REVIEW</Text>
				<Card>
				<FlatList
					data={ this.state.priceList }
					//numColumns='2'
					ItemSeparatorComponent = {this.FlatListItemSeparator}
					renderItem={({item}) => 
					<Text style={styles.item} 
						onPress={this.GetItem.bind(this, item.price_id)}> ${item.price} {item.store.name}              
					</Text>}
					keyExtractor={(item, index) => item.price_id.toString()}
				/>
				</Card>
				<TouchableOpacity 
					onPress={() => this.props.navigation.navigate(
						"NewPrice", 
						{item: this.state.itemData } 
						)}>
					<Text style={styles.continueAsGuest}>Add New Price</Text>
				</TouchableOpacity>
				<Card>
				<Text>Description:</Text>
				<TouchableOpacity>
					<Text style={styles.continueAsGuest}>Add to list (WIP)</Text>
				</TouchableOpacity>
				<Text>{this.state.itemData.description}</Text>
				</Card>
			</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});
