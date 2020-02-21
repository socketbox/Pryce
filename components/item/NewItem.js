import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import googleAPIsearch from '../../assets/find.json'

class NewItem extends React.Component {

	state = {
		data: [googleAPIsearch],
		stores: [],
		selectedStore: null,
		prices: null,
		currency: 'USD',
		currentTime: null,
		storeName: null,
		storeLat: null,
		storeLng: null,
		storePID: null,
		itemName: null,
		itemCode: null, 
		itemBrand: null,
		itemQuantity: null,
		itemQuantUnit: null,
		itemDescription: null,
	};

	componentDidMount() {
		this.getData();
		this.getStores();
	}


	/**POST info to server for verification */
	/**--------------------------------------------------------------*/
	submitInfo = () => {

		let data = {
			price: this.state.price,
			currency: this.state.currency,
			reported: this.state.currentTime, 
			store: {
				place_id: this.state.storePID,
				lat: this.state.storeLat,
				lng: this.state.storeLng,
				name: this.state.storeName,
			},
			item: {
				code: this.props.navigation.state.params.data,
				brand: this.state.itemBrand,
				name: this.state.itemName,
				quantity: this.state.itemQuantity,
				quant_unit: this.state.itemQuantUnit,
				description: this.state.itemDescription,

				/**HARD CODE TEST DATA */
				// code: "0000000959742",
				// brand: "Trader Joe's",
				// name: "Turkey Jerky Teriyaki",
				// quantity: 4,
				// quant_unit: "oz",
				// description: "Snap into a Slim Jim",
			}
		}

		fetch('http://pryce-cs467.appspot.com/price', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then((response) => response.json())
		.then(responseData => {
			Alert.alert("SERVER RESPONSE", JSON.stringify(responseData));
			//console.log(JSON.stringify(responseData));
		})
	} 

	/**fetch data from server to retrieve location data for nearby stores */
	getData = async () => {
		// TODO: get this from location data ~ create map location service 
		// let lat = this.state.user.lat;
		// let lng = this.state.user.lng;
		// const apiKey = AIzaSyAtOqdR0mFwseeMd9LJb7nBJQIBJYfhTZ4;
		// let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=stores&key=${apiKey}`
		let url = 'https://pryce-cs467.appspot.com/stores/find?lat=40.4464055&long=-80.183559'
		// let url = 'https://randomuser.me/api/?seed=23&page=1&results=4';
		const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(responseJson => {
			this.setState({
			data: responseJson
			});
		})
		.catch(error => console.error(error));
	};	

	/**Function to retrieve and store store name and place_id */
	getStores() {
	let i = 0;
	let tempName = '';
	let tempPlaceID = '';
	let tempArr = [];
	let tempLat = '';
	let tempLng = '';

	for (i = 0; i < this.state.data[0].results.length; i++) {
		tempName = this.state.data[0].results[i].name;
		tempPlaceID = this.state.data[0].results[i].place_id;
		tempLat = this.state.data[0].results[i].geometry.location.lat;
		tempLng = this.state.data[0].results[i].geometry.location.lng;
		// console.log(tempName + " " + tempPlaceID)
		tempArr.push({
		name: tempName,
		place_id: tempPlaceID,
		lat: tempLat,
		lng: tempLng,
		});
	}
	this.setState({ stores: tempArr });
	}

	  /**set store info to be sent */
	setStoreInfo(index) {
		this.setState({ storeName: this.state.stores[index].name });
		this.setState({ storePID: this.state.stores[index].place_id });
		this.setState({ storeLat: this.state.stores[index].lat });
		this.setState({ storeLng: this.state.stores[index].lng });
	}
	/**--------------------------------------------------------------*/

	render() {
		//console.log(this.state.data);
		//console.log(this.state.stores);
		// console.log(this.state.storeName)
		// console.log(this.state.storePID)
		// console.log(this.state.storeLat)
		// console.log(this.state.storeLng)
		const placeholder = {
			label: 'Select a store...',
			value: '',
			color: '#9EA0A4',
		};
		return (
		<View style={styles.container}>
			<View style={styles.data}>

				<Text>{this.props.navigation.state.params.data}</Text>

				<View style={styles.iconRow}>
					<FeatherIcon name="box" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="name"
						value={this.state.itemName}
						placeholder="Name"
						onChangeText={(itemName) => this.setState({ itemName })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="dollar-sign" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="price"
						value={this.state.prices}
						placeholder="Price"
						keyboardType="decimal-pad"
						onChangeText={(price) => this.setState({ price })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="zap" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="brand"
						value={this.state.itemBrand}
						placeholder="Brand"
						onChangeText={(itemBrand) => this.setState({ itemBrand })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="sun" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="quantity"
						value={this.state.itemQuantity}
						placeholder="Quantity"
						keyboardType='number-pad'
						onChangeText={(itemQuantity) => this.setState({ itemQuantity })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<RNPickerSelect
						placeholder={placeholder}
						items={this.state.stores.map(obj => ({
							label: obj.name,
							value: obj.name,
							color: 'rgba(77,38,22,1)',
						}))}
						onValueChange={(name, index) => {
							this.setState({
							selectedStore: name,
							selectedStorePID: index,
							}); 
							this.setStoreInfo(index-1);
						}}
						style={styles.inputIOS}
						value={this.state.selectedStore}
						useNativeAndroidPickerStyle={false}
						textInputProps={{ underlineColor: 'yellow' }}
						/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="star" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="quant_unit"
						value={this.state.itemQuantUnit}
						placeholder="Unit"
						onChangeText={(itemQuantUnit) => this.setState({ itemQuantUnit })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="eye" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="itemDescription"
						value={this.state.itemDescription}
						placeholder="Description"
						onChangeText={(itemDescription) => this.setState({ itemDescription })}
						maxLength={50}
					/>
				</View>
				<View style={styles.line} />

				
				<TouchableOpacity onPress={
					this.state.currentTime = new Date(),
					this.submitInfo,
					() => this.props.navigation.navigate("Scanner")
					}>
					<Text style={styles.submit}>Submit!</Text>
				</TouchableOpacity>

			</View>

		</View>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		//justifyContent: 'center',
		marginTop: 40,
		alignItems: 'center'
	},
	data: {
		width: 220,
		height: 23,
	},
	icon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	input: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	iconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	line: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	submit: {
		width: 100,
		height: 25,
		borderWidth: 2,
		marginTop: 10,
		textAlign: 'center',
		alignSelf: 'center',
	},
})

export default NewItem;