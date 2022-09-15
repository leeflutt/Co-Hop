import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
// Elements pour la carte
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';


export default function Accueil(props) {
    const [locUser, setLocUser] = useState() // position de l'utilisateur
    const [region, setRegion] = useState({
        latitude: 43.621350,
        longitude: 2.261258,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })


    
    const _getLocationAsync = () => { // Fonction qui récupère les données de localisation de l'utilisateur
        Location.requestForegroundPermissionsAsync()
            .then(response => {
                if (response.status !== 'granted') {
                    console.log({ errorMessage: 'Permission to access location was denied' });
                    setLocUser(region)
                }
                else {
                    Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (location) => {
                        setLocUser({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        })
                    })
                }
            })
    }

    useEffect(() => {
        _getLocationAsync()
    }, [])

    const [inputRecher, setInputRecher] = useState();

    return (
        <View style={styles.container}>
            <View style={styles.divInput}>
                <TextInput
                    width={deviceWidth / 1.2}
                    style={styles.input}
                    onChangeText={setInputRecher}
                    value={inputRecher}
                    placeholder="Rechercher..."
                />
            </View>
            <MapView
                style={styles.mapStyle}
                region={region}>
                {/* <Marker coordinate={props.locUser} title="Vous êtes ici !" /> */}
            {/* <Pressable onPress={() => { _getLocationAsync() }} style={styles.retourRegion}><Text style={styles.retourRegionText}>🎯</Text></Pressable> */}
            </MapView>
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        minHeight: 10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1
    },
    marker: {
        width: 40,
        height: 40
    },
    text: {
        color: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    divInput: {
        zIndex: 10,
        position: 'absolute',
        top: 50
    },
    retourRegion: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 80,
        bottom: 30,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    retourRegionText: {
        fontSize: 40,
    },
});