import React from 'react';
import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	Keyboard,
	Animated,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
import { styles } from '../Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Button, TextField } from 'material-bread';

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
		selectedStore: '',
		prices: '',
		currency: 'USD',
		currentTime: '',
		storeName: '',
		storeLat: '',
		storeLng: '',
		storePID: '',
		itemName: '',
		itemCode: '',
		itemBrand: '',
		itemQuantity: '',
		itemQuantUnit: '',
		itemDescription: '',
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
		this.state.currentTime = new Date()


		let data = {
			price: this.state.prices,
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
			},
		};

		console.log(data);

		fetch('http://pryce-cs467.appspot.com/prices', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(async (response) => {
			return {
				status: response.status,
				json: await response.json()
			}
		})
		.then(responseData => {
			console.log(JSON.stringify(responseData.json));
			if (responseData.status == 200) {
				this.props.navigation.navigate('Rating', { addedPrice: responseData.json });
			} else {
				Alert.alert("Price Update Failed", JSON.stringify(responseData.json));
			}
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
		const placeholder = {
			label: 'Select a nearby store...',
			value: '',
			color: '#9EA0A4',
		};

		return (
			<View style={styles.searchContainer}>
				<Card>
					<Card.Title
						titleStyle={{ fontSize: 25 }}
						wrapperStyle={true}
						title="Add a new item!"
						subtitle="Provide information below"
					/>
					<Card.Content>
						<TextField
							style={{ width: '90%'}}
							label="Name"
							labelStyle={{ fontSize: 14 }}
							focusedLabelColor={'#3d3d3d'}
							value={this.state.itemName}
							editable={true}
							onChangeText={value => this.setState({ itemName: value })}
						/>
						<TextField
							style={{ width: '90%'}}
							label="Brand"
							labelStyle={{ fontSize: 14 }}
							focusedLabelColor={'#3d3d3d'}
							value={this.state.itemBrand}
							editable={true}
							onChangeText={value => this.setState({ itemBrand: value })}
						/>
						<TextField
							style={{ width: '90%'}}
							label="Price"
							labelStyle={{ fontSize: 14 }}
							focusedLabelColor={'#3d3d3d'}
							value={this.state.prices}
							editable={true}
							keyboardType="decimal-pad"
							onChangeText={value => this.setState({ prices: value })}
						/>
						<TextField
							style={{ width: '90%'}}
							label="Quantity"
							labelStyle={{ fontSize: 14 }}
							focusedLabelColor={'#3d3d3d'}
							value={this.state.itemQuantity}
							editable={true}
							keyboardType="decimal-pad"
							onChangeText={value => this.setState({ itemQuantity: value })}
						/>
						<TextField
							style={{ width: '90%'}}
							label="Units"
							labelStyle={{ fontSize: 14 }}
							focusedLabelColor={'#3d3d3d'}
							value={this.state.itemQuantUnit}
							editable={true}
							onChangeText={value => this.setState({ itemQuantUnit: value })}
						/>

						<Animated.View style={{ paddingBottom: this.keyboardHeight }}>
							<View>
								<TextField
									style={styles.newItemDescription}
									label="Description"
									labelStyle={{ fontSize: 14 }}
									focusedLabelColor={'#3d3d3d'}
									value={this.state.itemDescription}
									editable={true}
									onChangeText={value => this.setState({ itemDescription: value })}
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
				<Button 
						style={styles.button}
						text={'submit'} 
						type="outlined" 
						onPress={this.submitInfo}
					/>
			</View>
			
		);
	}
}

export default NewItem;
