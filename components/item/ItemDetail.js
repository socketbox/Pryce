import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles';
import {
	DataTablePagination,
	TextField,
	Icon,
	IconButton,
	CardHeader,
} from 'material-bread';

export default class ItemDetail extends React.Component {
    state = {
        priceID: this.props.navigation.getParam('item', 'null'),
        itemData: this.props.navigation.getParam('itemData', 'null'),
    }

    _goToStore(storeInfo) {
        // add store to search stack index for this to work!
        console.log("pressed");
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
                        <Text style={styles.textStyleSmall}>Located at: </Text>
                        <TouchableOpacity onPress={() => this._goToStore(storeInfo)} style={styles.button}>
                            <Text style={styles.buttonText, {fontSize: 25}}>{this.state.priceID.store.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._addToList} style={styles.button}>
                            <Text style={styles.buttonText, {fontSize: 25}}>Add item to list!</Text>
                        </TouchableOpacity>
                        <Text style={styles.textStyleSmall}>Price: {this.state.priceID.price}</Text>
                    </Card.Content>
                </Card>
            </View>
        );
    }
}
