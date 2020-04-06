import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../assets/mapStyle.json'
import {styles} from '../Styles'

class Map extends React.Component {

    state = {
        location: { 
            coords: { 
                latitude: 0, 
                longitude: 0 
            } 
        },
        stores: [],
        data: [],
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
      
        this._getData();
    };

    _getData = async () => {
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
			    data: responseJson
            });
        })
        .catch(error => console.error(error));

        this._getStores();
    };
    
    	/**Function to retrieve and store store name and place_id */
	_getStores() {
        let i = 0;
        let tempName = '';
        let tempArr = [];
        let tempLat = '';
        let tempLng = '';
        let tempAddress = '';
    
        for (i = 0; i < this.state.data.results.length; i++) {
            tempName = this.state.data.results[i].name;
            tempAddress = this.state.data.results[i].vicinity;
            tempLat = this.state.data.results[i].geometry.location.lat;
            tempLng = this.state.data.results[i].geometry.location.lng;
            // console.log(tempName + " " + tempPlaceID)
            tempArr.push({
                name: tempName,
                address: tempAddress,
                coordinates: {
                    latitude: tempLat,
                    longitude: tempLng,
                }
            });
        }
        this.setState({ stores: tempArr });

        console.log(this.state.stores);
        this._setMarkers();

    }

    _setMarkers() {

    }
        /**--------------------------------------------------------------*/


    render() {
        return (
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    style={styles.mapDisplay}
                    showsUserLocation={true}
                    followUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    scrollEnabled={false}
                    region={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}>
                    {this.state.stores.map((store, index) => (
                        <Marker
                            key={index}
                            coordinate={store.coordinates}
                            title={store.name}
                            description={store.address}
                        />
                    ))}
                </MapView>
            </View>
        );
    }
}

export default Map;
