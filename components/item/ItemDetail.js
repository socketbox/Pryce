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

export default class ItemDetail extends React.Component {
    state = {
        priceID: this.props.navigation.getParam('item', 'null'),
        itemData: this.props.navigation.getParam('itemData', 'null'),
    }

    _goToStore(storeInfo) {
        // add store to search stack index for this to work!
        this.props.navigation.navigate('Store', { storeInfo })
    }

    _addToList(){

    }

    render() {
        let title = this.state.itemData.brand;
        let subtitle = this.state.itemData.name;
        let storeInfo = this.state.priceID.store;
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
                        <TouchableOpacity 
                            onPress={() => this._goToStore(storeInfo)} >
                            <Text style={{fontSize: 20}}>{this.state.priceID.store.name}</Text>
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
                        onPress={() => this._addToList()} 
                    />
                </View>
            </View>
        );
    }
}
