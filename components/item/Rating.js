import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ItemRating extends Component {
    constructor() {
        super();
        this.state = {
            rating: 2,
            maxRating: 5,
        };
    }
    updateRating(key) {
        this.setState({ rating: key });
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
            <Text style={styles.textStyleSmall}>Please Rate This Transaction</Text>

            {/*View to hold our Stars*/}
            <View style={styles.childView}>{ratingBar}</View>

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => alert(this.state.rating)}>
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
});