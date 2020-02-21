import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


function Scanner(props) {
    state = {
        scannedInfo: null,
    }

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
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);

        // TODO: Handle request separate function
        const url = `https://pryce-cs467.appspot.com/items/${data}`;
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
                    "NewItem", { data } 
                );
                } else {
                    Alert.alert(
                    `TEST`,
                    `ADD OPTIONS TO ADD HERE`
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
        <View style={styles.container}>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

                style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}

        {/* <View style={styles.goBackButton}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AppNavigator')}>
                <Image
                source={require('../../assets/back.png')}
                style={styles.backStyle}
                />
            </TouchableOpacity>
        </View> */}

    </View>
    );
    
  onPress1 = () => {
    this.setState({ switchOn: !this.state.switchOn });
  }

}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    goBackButton: {
        flex: 1,
        marginLeft: 30,
        marginTop: 50,
    },
    backStyle: {
        width: 30,
        height: 30,
    }
    });

export default Scanner;