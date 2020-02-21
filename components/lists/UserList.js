import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Search extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>USER LIST!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Search;