import React, { Component } from 'react';
    import {
    View,
    StyleSheet,
    Image
} from 'react-native';

export default class Item extends Component {
    render() {
    return (
        <View style={styles.container}>
            <Image source={{uri: this.props.item.image}} style={styles.image} />
        </View>
    )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350
    }
});