import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import googleAPIsearch from '../../assets/find.json'


class Map extends React.Component {

    state = {
        location: { 
            coords: { 
                latitude: 0, 
                longitude: 0 
            } 
        },
        nearbyLocations: [],
        apiResponse: [],
    };

    componentDidMount() {
        this._getLocationAsync();
    }

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
        
        //const apiKey = 'AIzaSyAtOqdR0mFwseeMd9LJb7nBJQIBJYfhTZ4';
        //const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&radius=1500&type=retail&key=${apiKey}`
                /**fetch data from server to retrieve location data for nearby stores */	
        this._getData();
    };

    _getData = async () => {
	// TODO: get this from location data ~ create map location service 
        //const apiKey = AIzaSyAtOqdR0mFwseeMd9LJb7nBJQIBJYfhTZ4;
        let lat = this.state.location.coords.latitude;
        let lng = this.state.location.coords.longitude;
		let url = `https://pryce-cs467.appspot.com/stores/find?lat=${lat}&long=${lng}`
		const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(responseJson => {
            this.setState({
			    apiResponse: responseJson
			});
        })
        .catch(error => console.error(error));
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

export default Map;
