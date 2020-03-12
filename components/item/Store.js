import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView
} from 'react-native';
import {styles} from '../Styles';
import {
	Card,
} from 'material-bread';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../assets/mapStyle.json'



export default class Store extends Component {
    state = {
        storeId: this.props.navigation ? this.props.navigation.state.params.storeId : this.props.storeId,
        detailsOnly: this.props.detailsOnly ? true : false,
        storeDetails: {
            name: '',
            place_id: '',
            address: ''
        },
        storeLocation: {
            latitude: 1,
            longitude: 1
        },
        storeRating: 0.00,
        storeComments: [],
        page: 0,
        perPage: 10,
        commentsLoaded: false
    };

    componentDidMount() {
        this.getStoreComments();
        this.getStoreDetails();
    }

    getStoreComments = async () => {
        if (this.state.storeId == null) {
            Alert.alert("Could Not Load", "Error, no store ID to load!");
            return;
        }

		fetch('https://pryce-cs467.appspot.com/stores/' + this.state.storeId + '/comments', {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		}).then(async (response) => {
            return {
                status: response.status,
                json: await response.json()
            }
        }).then(response => {
            // console.log(JSON.stringify(response));
            if (response.status == 200) {
                this.setState({
                    storeRating: response.json.avg_rating,
                    storeComments: response.json.comments
                });
            }
        });
    } 
    
    getStoreDetails = async () => {
        if (this.state.storeId == null) {
            Alert.alert("Could Not Load", "Error, no store ID to load!");
            return;
        }

		fetch('https://pryce-cs467.appspot.com/stores/' + this.state.storeId, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		}).then(async (response) => {
            return {
                status: response.status,
                json: await response.json()
            }
        }).then(async (response) => {
            if (response.status == 200) {
                this.setState({
                    storeDetails: {
                        name: response.json.name,
                        place_id: response.json.place_id,
                        address: response.json.address
                    },
                    storeLocation: {
                        latitude: response.json.lat,
                        longitude: response.json.lng
                    },
                });
            }
        });
	} 
    
    render() {
        return (
            <View>
                {this.state.detailsOnly ?
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20}}>{this.state.storeDetails.name}</Text>
                        <Text>
                            {this.state.storeComments.length == 0 ? 'Not yet rated.' : 'Rating: ' + this.state.storeRating.toFixed(2) + ' out of 5'}
                            {this.state.detailsOnly && this.state.storeComments.length > 0 ? ' (' + this.state.storeComments.length + ' reviews)' : ''}
                        </Text>
                        <Text>Address:</Text>
                        <Text>{this.state.storeDetails.address}</Text>

                        <Text></Text>

                        <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{width:'100%', height: 150}}
                        showsUserLocation={true}
                        followUserLocation={false}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        scrollEnabled={true}
                        region={{
                            latitude: this.state.storeLocation.latitude,
                            longitude: this.state.storeLocation.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}>
                            <Marker coordinate={this.state.storeLocation} title={this.state.storeDetails.name} />
                        </MapView>
                    </View>
                  : 
                    <ScrollView style={{width: '100%', padding: 10}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Reviews for {this.state.storeDetails.name} ({this.state.storeComments.length}):</Text>
                        {this.state.storeComments.map(comment => {
                            return (
                                <View key={comment.comment_id} style={{}}>
                                    <Card radius={1} shadow={4} style={{ marginBottom: 10, padding: 5}}>
                                        <Text><Text style={{fontWeight: 'bold'}}>User:</Text> {comment.appuser.username}</Text>
                                        <Text><Text style={{fontWeight: 'bold'}}>Rating:</Text> {comment.rating}</Text>
                                        <Text><Text style={{fontWeight: 'bold'}}>Comment:</Text> {comment.content}</Text>
                                    </Card>
                                </View>
                            )
                        })}
                    </ScrollView>
                }
            </View>
        );
    }
}

