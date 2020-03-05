import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	Animated,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
import googleAPIsearch from '../../assets/find.json';
import { styles } from '../Styles';

class NewItem extends React.Component {
	state = {
		location: {
		coords: {
			latitude: 0,
			longitude: 0,
		},
		},
		data: [],
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
		this.keyboardHeight = new Animated.Value(0);
		this._getLocationAsync();
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
			this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	componentWillUnmount() {
			this.keyboardDidShowSub.remove();
			this.keyboardDidHideSub.remove();
		}

	keyboardDidShow = (event) => {
			Animated.parallel([
				Animated.timing(this.keyboardHeight, {
					duration: event.duration,
					toValue: event.endCoordinates.height,
				})
			]).start();
		};

		keyboardDidHide = (event) => {
			Animated.parallel([
				Animated.timing(this.keyboardHeight, {
					duration: event.duration,
					toValue: 0,
				})
			]).start();
		};


	/**POST info to server for verification */
	/**--------------------------------------------------------------*/
	submitInfo = () => {
		this.setState({
		currentTime: new Date(),
		});

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
			code: this.props.navigation.state.params.itemCode,
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
		},
		};

		fetch('http://pryce-cs467.appspot.com/prices', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => {
			if (response.status == 200) {
			return response.json();
			} else {
			// todo: handle other responses
			return;
			}
		})
		.then(responseData => {
			//Alert.alert("SERVER RESPONSE", JSON.stringify(responseData));
			console.log(JSON.stringify(responseData));
			this.props.navigation.navigate('Rating', { addedPrice: responseData });
		});
	};

	_getLocationAsync = async () => {
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
		this._getData();
	};

	/**fetch data from server to retrieve location data for nearby stores */

	_getData = async () => {
		let lat = this.state.location.coords.latitude;
		let lng = this.state.location.coords.longitude;
		let url = `https://pryce-cs467.appspot.com/stores/find?lat=${lat}&long=${lng}`;
		const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(responseJson => {
			this.setState({
			data: responseJson,
			});
		})
		.catch(error => console.error(error));
		this._getStores();
	};

	/**Function to retrieve and store store name and place_id */
	_getStores() {
		let i = 0;
		let tempName = '';
		let tempPlaceID = '';
		let tempArr = [];
		let tempLat = '';
		let tempLng = '';

		for (i = 0; i < this.state.data.results.length; i++) {
		tempName = this.state.data.results[i].name;
		tempPlaceID = this.state.data.results[i].place_id;
		tempLat = this.state.data.results[i].geometry.location.lat;
		tempLng = this.state.data.results[i].geometry.location.lng;
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
		label: 'Select a nearby store...',
		value: '',
		color: '#9EA0A4',
		};
		return (
		<View style={styles.mainContainer}>
			<Card>
			<Card.Title
				titleStyle={{ fontSize: 25 }}
				wrapperStyle={true}
				title="Add a new item!"
				subtitle="Provide information below"
			/>
			<Card.Content>
				<View style={styles.inputRow}>
				<FeatherIcon name="box" style={styles.icon} />
				<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.inputField}
					name="name"
					value={this.state.itemName}
					placeholder="Name"
					onChangeText={itemName => this.setState({ itemName })}
				/>
				</View>
				<View style={styles.inputRow}>
				<FeatherIcon name="dollar-sign" style={styles.icon} />
				<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.inputField}
					name="price"
					value={this.state.prices}
					placeholder="Price"
					keyboardType="decimal-pad"
					onChangeText={price => this.setState({ price })}
				/>
				</View>

				<View style={styles.inputRow}>
				<FeatherIcon name="zap" style={styles.icon} />
				<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.inputField}
					name="brand"
					value={this.state.itemBrand}
					placeholder="Brand"
					onChangeText={itemBrand => this.setState({ itemBrand })}
				/>
				</View>

				<View style={styles.inputRow}>
				<FeatherIcon name="sun" style={styles.icon} />
				<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.inputField}
					name="quantity"
					value={this.state.itemQuantity}
					placeholder="Quantity"
					keyboardType="number-pad"
					onChangeText={itemQuantity => this.setState({ itemQuantity })}
				/>
				</View>

				<View style={styles.inputRow}>
				<FeatherIcon name="star" style={styles.icon} />
				<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.inputField}
					name="quant_unit"
					value={this.state.itemQuantUnit}
					placeholder="Unit"
					onChangeText={itemQuantUnit => this.setState({ itemQuantUnit })}
				/>
				</View>

				<Animated.View style={{ paddingBottom: this.keyboardHeight }}>
				<View>
					<Text style={{fontSize: 18}}>Description:</Text>
					<TextInput
					placeholderTextColor="#e6e6e6"
					editable={true}
					style={styles.newItemDescription}
					name="itemDescription"
					value={this.state.itemDescription}
					placeholder="Enter description here..."
					onChangeText={itemDescription =>
						this.setState({ itemDescription })
					}
					maxLength={50}
					/>
				</View>
				</Animated.View>

				<View style={styles.inputRow}>
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
					this.setStoreInfo(index - 1);
					}}
					style={styles.storeSelect}
					value={this.state.selectedStore}
					useNativeAndroidPickerStyle={false}
					textInputProps={{ underlineColor: 'red' }}
				/>
				</View>
			</Card.Content>
			</Card>
			<TouchableOpacity onPress={this.submitInfo} style={styles.button}>
			<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
		);
	}
}

export default NewItem;
