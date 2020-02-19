import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


class Map extends React.Component {

    state = {
        location: { 
            coords: { 
                latitude: 0, 
                longitude: 0 
            } 
        },
        nearbyLocations: [],

        apiResponse: null,
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

        
        
        const apiKey = '';
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&radius=1500&type=retail&key=${apiKey}`

        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                let i = 0;
                for(i; i < responseJson.results.length; i++) {
                    console.log("-----------------------------");
                    this.setState({
                        // nearbyLocations: { name: responseJson.results[i].name },
                        // nearbyLocations: { place_id: responseJson.results[i].place_id },
                        // nearbyLocations: { lat: responseJson.results[i].geometry.location.lat },
                        // nearbyLocations: { lng: responseJson.results[i].geometry.location.lng },
                        apiResponse: responseJson.results
                    })
                }
            })
            //     let myItems = [];
            //     let result = Object.entries(responseJson.results).map(([k, v] ) => ({ [k]: v }));
            //     result.forEach((item) => {
            //         var key = Object.keys(item)[0];
            //         item[key].forEach((sub) => {
            //             console.log("test")
            //         // //     myItems.push( {
            //         // //         name: sub.name,
            //         // //         place_id: sub.place_id,
            //         // //         lat: sub.geometry.lat,
            //         // //         lng: sub.geometry.lng,
            //         // //     })
            //         })
            //     })
            // })
            //     let i = 0;
            //     for(i; i < responseJson.results.length; i++) {
            //         console.log("-----------------------------");
            //         // console.log(responseJson.results[i]);
            //         // console.log(responseJson.results[i].name);
            //         // console.log(responseJson.results[i].place_id);
            //         // console.log(responseJson.results[i].geometry.location.lat);
            //         // console.log(responseJson.results[i].geometry.location.lng);               
            //     }
            // })

            console.log(this.state.nearbyLocations);
            
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
