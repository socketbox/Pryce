import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker
} from 'react-native';


export default class NewItem extends React.Component {
    state = {
        price: null,
        currency: 'USD',
        currentTime: null,
        storeName: null,
        storelat: null,
        storeLng: null,
        storePID: null,
        itemName: null,
        itemCode: null,
        itemBrand: null,
        itemQuantity: null,
        itemQuantUnit: null,
        itemDescription: null,
    };



  /**POST info to server for verification */
/**--------------------------------------------------------------*/
    submitInfo = () => {
        // console.log("Item Name: "+ this.state.itemName);
        // console.log("Brand: "+ this.state.itemBrand);
        // console.log("Quantity: "+ this.state.itemQuantity);
        // console.log("Quanity Units: "+ this.state.itemQuantUnit);
        // console.log("Store Name: "+ this.state.storeName);
        // console.log("Item Price: "+ this.state.price);
        // console.log("Item Description: "+ this.state.itemDescription);
        // console.log(" ");
        // console.log("Store PlaceID: "+ this.state.storePID);
        // console.log("Store Latitude: "+ this.state.storeLat);
        // console.log("Store Longitude: "+ this.state.storeLng);
        // console.log("Store Name: "+ this.state.storeName);

        let data = {
            //price: this.state.price,
            price: 1200.00,
            currency: this.state.currency,
            reported: this.state.currentTime, 
            store: {
                place_id: "ChIJi6C1MxquEmsR9-c-3O48ykI",
                lat: "-33.8585416",
                lng: "151.2100441",
                name: "Cruise Bar",
            },
            item: {
                // code: this.state.itemCode,
                // brand: this.state.itemBrand,
                // name: this.state.itemName,
                // quantity: this.state.itemQuantity,
                // quant_unit: this.state.itemQuantUnit,
                // description: this.state.itemDescription,
                code: 802552165,
                brand: 'Apple',
                name: 'MacBook',
                quantity: 1,
                quant_unit: 'unit',
                description: '13" Apple MacBook Pro for sale in aisle 14 for big discount use coupon code Am39B9xZs',
            }
        }

        console.log(JSON.stringify(data));

        // console.log("Store PlaceID: "+ this.state.storePID);
        // console.log("Store Latitude: "+ this.state.storeLat);
        // console.log("Store Longitude: "+ this.state.storeLng);
        // console.log("Store Name: "+ this.state.storeName);

        fetch('http://pryce-cs467.appspot.com/price', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then(responseData => {
            console.log(JSON.stringify(responseData.body));
        })
    } 
/**--------------------------------------------------------------*/

  render() {
      let date = '';
    return (
      <View>

        <TextInput
            name="name"
            editable={true}
            value={this.state.itemName}
            placeholder="Name"
            //onChangeText={this.handleItemNameChange}
            onChangeText={(itemName) => this.setState({ itemName })}
        />

        <TextInput
            value={this.state.itemBrand}
            placeholder="Brand Name..."
            editable={true}
            //onChangeText={this.handleBrandNameChange}
            onChangeText={(itemBrand) => this.setState({ itemBrand })}
        />

        <TextInput
            value={this.state.itemQuantity}
            placeholder="Quantity..."
            editable={true}
            keyboardType='numeric'
            //onChangeText={this.handleQuantityChange}
            onChangeText={(itemQuantity) => this.setState({ itemQuantity })}
        />

        <TextInput
            value={this.state.itemQuantUnit}
            placeholder="Quantity unit..."
            editable={true}
            //onChangeText={this.handleQuanUnitChange}
            onChangeText={(itemQuantUnit) => this.setState({ itemQuantUnit })}
        />

        {/* <Picker
            style={{height: 20, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({ store: { name: itemValue } })
            }>
            // TODO: for loop here to display the #(5 due to google api limitations)
            //        to select from nearby stores.
            <Picker.Item label="store1" value="store1" />
            <Picker.Item label="store2" value="store2" />
            <Picker.Item label="store3" value="store3" />
            <Picker.Item label="store4" value="store4" />
            <Picker.Item label="store5" value="store5" />
        </Picker> */}

        <TextInput
            value={this.state.price}
            placeholder="Price"
            keyboardType='numeric'
            editable={true}
            //onChangeText={this.handlePriceChange}
            onChangeText={(price) => this.setState({ price })}
        />
        <TextInput
            value={this.state.itemDescription}
            placeholder="Description"
            editable={true}
            //onChangeText={this.handleItemDescriptionChange}
            onChangeText={
                this.state.currentTime = new Date(),
                console.log(this.state.currentTime),
                (itemDescription) => this.setState({ itemDescription })}
            maxLength={50}
        />
        <TouchableOpacity onPress={this.submitInfo}>
            <Text>!!Submit!!</Text>
        </TouchableOpacity>

        <Text>DEBUGGING</Text>

        <TextInput
            value={this.state.itemName}
        />
        <TextInput
            value={this.state.itemBrand}
        />
        <TextInput
            value={this.state.itemQuantity}
        />
        <TextInput
            value={this.state.itemQuantUnit}
        />
        <TextInput
            value={this.state.price}
        />
        <TextInput
            value={this.state.itemDescription}
        />

      </View>
    );
  }
}
