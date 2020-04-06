import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Alert
} from 'react-native';
import {styles} from '../Styles'
import { Button } from 'material-bread';


export default class Rating extends Component {
    state = {
        rating: 0,
        comments: "",
        maxRating: 5,
        addedPrice: this.props.navigation.state.params.addedPrice,
        submitted: false
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
        if (this.state.rating == 0) {
            Alert.alert("Could Not Submit", "Please provide a rating to submit feedback.");
            return;
        }

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
                'Authorization': 'Bearer ' + this.state.authToken
			},
			body: JSON.stringify(requestData),
		})
		.then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                // todo: handle exceptions
                return;
            }
        })
		.then(responseData => {
            this.setState({submitted: true});
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

        const commentsForm = (
            <View style={styles.commentsForm}>
                <Text style={styles.textStyleSmall}>How was your shopping experience at {this.state.addedPrice.store.name}?</Text>
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
                <Button 
                    style={styles.button}
                    text={'Submit'} 
                    type="outlined" 
                    onPress={() => this.submitInfo()}
                />
            </View>
        );

        return (
            <View style={styles.ratingsContainer}>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>Price added!</Text>

                {this.state.submitted ? <Text style={styles.italic}>Thanks for submitting your comments</Text> : commentsForm }

                <Button 
                    style={styles.button}
                    text={'Scan More Items'} 
                    type="outlined" 
                    onPress={() => this.props.navigation.navigate('Scanner')}
                />
                <Button 
                    style={styles.button}
                    text={'Go to Item Page'} 
                    type="outlined" 
                    onPress={        
                        () => 
                        this.props.navigation.navigate('ItemInfo', 
                        {itemCode: this.state.addedPrice.item.code}
                    )}
                />

            </View>
        );
    }
}

