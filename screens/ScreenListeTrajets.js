import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ListeTrajets from '../components/ListeTrajets';

export default function FormAjout(props) {

    return (
        <View>
            <ListeTrajets propsNavigation = {props.navigation}></ListeTrajets>
        </View>
    )
}