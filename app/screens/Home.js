import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class Home extends React.Component {

    state = {
        location: { 
            coords: { 
                latitude: 0, 
                longitude: 0 
            } 
        },
        markers: {

        },
    };
    


    componentDidMount() {
        this._getLocationAsync();
    }

    searchNearby = async () => {};

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
        this.setState({
            locationResult: 'Permission to access location was denied',
        });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    const apiKey = '---NULL---';
    //const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=store&inputtype=textquery&fields=formatted_address,name&locationbias=circle:10000@${this.state.location.coords.latitude},${this.state.location.coords.longitude}&key=${apiKey}` 
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&radius=1500&type=retail&key=${apiKey}`

    await fetch(url)
        .then(results => {
            return results.json();
        })
        .then(responseJson => {
            let i = 0;
            for(i; i < responseJson.results.length; i++) {
                console.log(responseJson.results[i].place_id);
                console.log(responseJson.results[i].geometry.location.lat);
                console.log(responseJson.results[i].geometry.location.lng);
                console.log(responseJson.results[i].name);
            }
            //console.log(responseJson.results[0].name);
        })
    };

    render() {
    return (
    <View style={styles.mapContainer}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContainer}
        showsUserLocation={true}
        followUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }}>
        </MapView>
    </View>
    );
    }
    }

    const styles = StyleSheet.create({
    mapContainer: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 40,
    },
    });

    export default Home;
