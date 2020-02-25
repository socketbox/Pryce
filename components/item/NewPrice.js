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
import * as Location from 'expo-location';

class NewPrice extends React.Component {
	state = {
        
		location: { 
            coords: { 
                latitude: 0, 
                longitude: 0 
            } 
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
        propsData: JSON.parse(this.props.navigation.state.params.item),
    };
    
	componentDidMount() {
        this._getLocationAsync();
	}




    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */

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
				code: this.state.propsData.code,
				brand: this.state.propsData.brand,
				name: this.state.propsData.name,
				quantity: this.state.propsData.quantity,
				quant_unit: this.state.propsData.quant_unit,
				description: this.state.propsData.description,
			}
        }
        console.log(this.state.propsData);

		fetch('http://pryce-cs467.appspot.com/prices', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then((response) => response.json())
		.then(responseData => {
			/** HANDLE DATA HERE  */
			Alert.alert("SERVER RESPONSE", JSON.stringify(responseData));
			console.log(JSON.stringify(responseData));
		})
	} 

    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	_getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
        this._getData();
    };

    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
	/**fetch data from server to retrieve location data for nearby stores */	
    _getData = async () => {
        let lat = this.state.location.coords.latitude;
        let lng = this.state.location.coords.longitude;
		let url = `https://pryce-cs467.appspot.com/stores/find?lat=${lat}&long=${lng}`
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
		this._getStores();
	};

    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
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


    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
    /**NEED TO REFACTOR THIS INTO FUNCTION SERVICE */
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
			label: 'Select a store...',
			value: '',
		};
		return (
		<View style={styles.container}>
			<View style={styles.data}>

				<View style={styles.iconRow}>
					<FeatherIcon name="box" style={styles.icon} />
					<TextInput
                        editable={false}
						style={styles.input}
						name="name"
						value={this.state.itemName}
						placeholder={this.state.propsData.name}
						onChangeText={(itemName) => this.setState({ itemName })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="dollar-sign" style={styles.icon} />
					<TextInput
						editable={true}
						style={styles.input}
						name="price"
						value={this.state.prices}
						placeholder="New Price"
						keyboardType="decimal-pad"
						onChangeText={(price) => this.setState({ price })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="zap" style={styles.icon} />
					<TextInput
                        editable={false}
						style={styles.input}
						name="brand"
						value={this.state.itemBrand}
						placeholder={this.state.propsData.brand}
						onChangeText={(itemBrand) => this.setState({ itemBrand })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="sun" style={styles.icon} />
					<TextInput
                        editable={false}
						style={styles.input}
						name="quantity"
						value={this.state.itemQuantity}
						placeholder={this.state.propsData.quantity}
						keyboardType='number-pad'
						onChangeText={(itemQuantity) => this.setState({ itemQuantity })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<RNPickerSelect
                        editable={false}
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
                        editable={false}
						style={styles.input}
						name="quant_unit"
						value={this.state.itemQuantUnit}
						placeholder={this.state.propsData.quant_unit}
						onChangeText={(itemQuantUnit) => this.setState({ itemQuantUnit })}
					/>
				</View>
				<View style={styles.line} />

				<View style={styles.iconRow}>
					<FeatherIcon name="eye" style={styles.icon} />
					<TextInput
                        editable={false}
						style={styles.input}
						name="itemDescription"
						value={this.state.itemDescription}
						placeholder={this.state.propsData.description}
						onChangeText={(itemDescription) => this.setState({ itemDescription })}
						maxLength={50}
					/>
				</View>
				<View style={styles.line} />

				
				<TouchableOpacity onPress={
					this.state.currentTime = new Date(),
					this.submitInfo
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

export default NewPrice;