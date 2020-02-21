import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants';
import { Card } from 'react-native-paper'
import { SearchBar } from 'react-native-elements'


function Item({title}) {
	return (
		<View style={styles.item}>
		<Text style={styles.title}>{title}</Text>
		</View>
	)
}

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		search: '',
		data: [],
		};
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		
	}

	updateSearch = search => {
		console.log(search);
		this.setState({search});
	}

  //TODO: need to have three columns here fix me por favor
	render() {
		//console.log(this.state.data);
		const {search} = this.state;

		return (
		<View style={styles.container}>
			<SearchBar
			placeholder="Enter search here..."
			onChangeText={this.updateSearch}
			value={search}
			/>
			<Card>
	
			</Card>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
	item: {
		backgroundColor: 'white',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 12,
	},
});