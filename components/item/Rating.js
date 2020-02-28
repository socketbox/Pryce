import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';

export default class Rating extends Component {
    state = {
        rating: 0,
        comments: "",
        maxRating: 5,
        addedPrice: this.props.navigation.state.params.addedPrice
    };

    updateRating(key) {
        this.setState({ rating: key });
    }

    async componentDidMount() {
        // get auth token
        const loggedInUser = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(loggedInUser);
        if (loggedInUser) {
            this.setState({ authToken: loggedInUser.authToken });
            console.log(loggedInUser.authToken);
        }
    }

    submitInfo = () => {

		let requestData = {
            "item_id": this.state.addedPrice.item_id,
            "rating": this.state.rating,
            "content": this.state.comments.trim()
		}

		fetch('https://pryce-cs467.appspot.com/stores/' + this.state.addedPrice.store_id + '/comments', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
                'Content-Type': 'application/json',
                // todo: get token from state
                'Authorization': 'Bearer ' + this.state.authToken
			},
			body: JSON.stringify(requestData),
		})
		.then((response) => {
            console.log(JSON.stringify(response));
            if (response.status == 200) {
                return response.json();
            } else {
                // todo: handle exceptions
                return;
            }
        })
		.then(responseData => {
			/** HANDLE DATA HERE  */
			alert("Thanks for adding your comments!", JSON.stringify(responseData));
			console.log(JSON.stringify(responseData));
		})
	} 
    
    render() {
        let ratingBar = [];
        for (var i = 1; i <= this.state.maxRating; i++) {
            ratingBar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.updateRating.bind(this, i)}>
                    <Image
                        style={styles.starImage}
                        source={ 
                            i <= this.state.rating ? 
                            require('../../assets/star-filled.png')  : 
                            require('../../assets/star.png')
                        }
                    />
                </TouchableOpacity>
            );
        }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyleSmall}>How was your shopping experience at {this.state.addedPrice.store.name}? (optional)</Text>

            {/*View to hold our Stars*/}
            <View style={styles.childView}>{ratingBar}</View>

            <TextInput
                multiline
                numberOfLines={4}
                placeholderTextColor="#e6e6e6"
                editable={true}
                style={styles.textarea}
                name="comments"
                value={this.state.comments}
                placeholder="Comments"
                onChangeText={(comments) => this.setState({ comments })}
                maxLength={140}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => this.submitInfo()}>
                {/**Submit to ITEM_ID rating ** need to discuss*/}
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#d3d3d3',
    },
    starImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,

        color: '#000',
        marginTop: 15,
    },
    textarea: {
		width: '80%',
		color: '#121212',
        textAlign: 'left',
        marginTop: 30,
        padding: 5,
        borderRadius: 2,
        borderColor: "#ccc",
        borderWidth: 1
	}
});