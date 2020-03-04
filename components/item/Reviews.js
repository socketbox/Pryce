import React, { Component } from "react";
import { View, Text } from "react-native";
import {styles} from '../Styles'

class Review extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.itemName1}>&lt;Item Name&gt;</Text>
              <Text style={styles.xXx3}>Original Price: {"\n"}$x.xx</Text>
              <View style={styles.group1}>
                  <Text style={styles.reviews}>Reviews</Text>
                  <Text style={styles.description2}>
                  lorem ipsum kjash dfkjhas dlkjfh alksj dflorem ipsum kjash df
                  </Text>
              </View>
              <View style={styles.xXx7Row}>
                  <Text style={styles.xXx7}>$X.XX</Text>
                  <Text style={styles.store}>Store</Text>
              </View>
            </View>
        );
    }
}


export default Review;
