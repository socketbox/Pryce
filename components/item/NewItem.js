import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

class NewItem extends React.Component {
	state = {
		prices: null,
		currency: 'USD',
		currentTime: null,
		storeName: null,
		storelat: null,
		storeLng: null,
		storePID: null,
		itemName: null,
		itemCode: null, //this.props.navigation.getParam(data, defaultValue), //`${props.navigation.state.params.state.itemCode}`,
		itemBrand: null,
		itemQuantity: null,
		itemQuantUnit: null,
		itemDescription: null,
	};

	/**POST info to server for verification */
	/**--------------------------------------------------------------*/
	submitInfo = () => {

		let data = {
			price: this.state.price,
			currency: this.state.currency,
			reported: this.state.currentTime, 
			store: {
				place_id: "zChIJ34Pec1lZNIgRC9XDhWPZlnc",
				lat: 40.4464055,
				lng: -80.183559,
				name: "Target",
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

		console.log(data);

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
			console.log(JSON.stringify(responseData));
		})
	} 
	/**--------------------------------------------------------------*/

	render() {
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
					<FeatherIcon name="home" style={styles.icon} />
					<TextInput
						placeholderTextColor="#e6e6e6"
						editable={true}
						style={styles.input}
						name="store"
						value={this.state.itemQuantUnit}
						placeholder="Store Location"
						onChangeText={(storePID) => this.setState({ storePID })}
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