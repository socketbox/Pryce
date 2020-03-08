import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {styles} from '../Styles'

function Scanner(props) {


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    // Check Permissions of camera and wait
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Handle scanned item - need to review
    const handleBarCodeScanned = ({ item }) => {
        setScanned(true);

        // TODO: Handle request separate function
        const url = `https://pryce-cs467.appspot.com/items/${item}`;
        fetch(url, {
            method: 'GET',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok === false) {
                props.navigation.navigate(
                    "NewItem", { item } 
                );
            } else if (response.ok === true) {
                // Alert.alert(
                //     `TEST`,
                //     `ADD OPTIONS TO ADD HERE`
                // );
                props.navigation.navigate(
                    "ItemInfo", { item } 
                );
            }
            // console.log(JSON.stringify(response.ok));
        })
        .catch(error => {
            console.log(error);
        });
    };

    // Request and response for camera access
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={styles.scannerContainer}>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

                style={styles.scanner}
            />

            {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}

        <Text style={styles.textStyleSmall}>Scan a code in the window above!</Text>

    </View>
    );
}

export default Scanner;