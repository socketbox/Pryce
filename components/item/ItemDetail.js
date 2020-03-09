import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';
import { Divider, Button } from 'material-bread';
import Store from './Store';

export default class ItemDetail extends React.Component {
    state = {
        priceID: this.props.navigation.getParam('item', 'null'),
        itemData: this.props.navigation.getParam('itemData', 'null'),
        pryceListId: this.props.navigation.getParam('pryceListId', 'null'),
    }

    _goToStore(storeId) {
        this.props.navigation.navigate('Store', { storeId: storeId });
    }

    _addToList(itemData, priceID, plid){
        this.props.navigation.navigate('ListDetails', {
            routeFrom: 'ItemDetail',
            pryceListId: plid, 
            addedItem: {
                item_name: itemData.name,
                price: priceID.price,
                store_name: priceID.store.name,
                reported: itemData.reported,
                item_id: itemData.item_id
            }
        })
    }

    render() {
        let title = this.state.itemData.brand;
        let subtitle = this.state.itemData.name;
        let storeId = this.state.priceID.store.store_id;
        console.log(JSON.stringify(this.state.priceID));
        return (
            <View style={styles.mainContainer}>
                <Card>
                    <Card.Title
                        titleStyle={{ fontSize: 25 }}
                        wrapperStyle={true}
                        title={subtitle}
                        subtitle={title}
                    />
                    <Card.Content>
                        <Divider marginVertical={5} subheader="Price:" />
                        <Text>${this.state.priceID.price}</Text>
                        <Divider marginVertical={5} subheader="Located at:" />
                        <Store storeId={storeId} detailsOnly />
                        <TouchableOpacity 
                            onPress={() => this._goToStore(storeId)} >
                            <Text style={{fontSize: 14, color: '#147efb'}}>See all shopping experience reviews...</Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
                <View 
                    style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'space-around', 
                        flexWrap: 'wrap'
                    }}>
                    <Button 
                        style={styles.button}
                        text={'Back'} 
                        type="text" 
                        onPress={() => this.props.navigation.goBack()} 
                    />
                    <Button 
                        style={styles.button}
                        text={'Add item to list'} 
                        type="outlined" 
                        onPress={() => this._addToList(this.state.itemData, this.state.priceID, this.state.pryceListId)} 
                    />
                </View>
            </View>
        );
    }
}
