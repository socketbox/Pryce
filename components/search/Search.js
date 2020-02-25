import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight
} from 'react-native';
import ItemInfo from '../item/ItemInfo';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemName: '',
			error: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleChange(e) {
			this.setState({
				itemName: e.nativeEvent.text
			});
		}

		handleSubmit = async () => {
			console.log(this.state.itemName);
			const url = `https://pryce-cs467.appspot.com/items?name=${this.state.itemName}`;
			const response = await fetch(url, {
				method: 'GET',
			})
			.then(response => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch(error => console.error(error));
	}

	render() {

		return (
		<View style={styles.container}>
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
					style={styles.buttonText}>
					SEARCH
				</Text>
				</TouchableHighlight>
		</View>
		/**RETURN LIST OF ITEMS HERE */
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center'
	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor:'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});