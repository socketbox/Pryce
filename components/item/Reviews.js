import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemName1: {
    width: 286,
    height: 49,
    color: "#121212",
    fontSize: 40,
    textAlign: "center",
    marginTop: 76,
    alignSelf: "center"
  },
  xXx3: {
    width: 95,
    height: 27,
    color: "rgba(113,113,113,1)",
    fontSize: 15,
    textAlign: "center",
    marginTop: 46,
    marginLeft: 74
  },
  group1: {
    width: 297,
    height: 164,
    marginTop: 44,
    alignSelf: "center"
  },
  reviews: {
    width: 297,
    height: 25,
    color: "#121212",
    fontSize: 20,
  },
  description2: {
    width: 297,
    height: 434,
    color: "#121212",
    fontSize: 20,
  },
  xXx7: {
    width: 131,
    height: 29,
    color: "#121212",
    fontSize: 30,
    textAlign: "center"
  },
  store: {
    width: 131,
    height: 29,
    color: "#121212",
    fontSize: 30,
    textAlign: "center"
  },
  xXx7Row: {
    height: 29,
    flexDirection: "row",
    marginTop: -275,
    marginLeft: 57,
    marginRight: 56
  }
});

export default Review;
