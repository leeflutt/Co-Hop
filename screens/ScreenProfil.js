import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Profil from '../components/Profil';

export default function ScreenProfil(props) {
    if (props.route.params != null) {
        console.log(props.route.params.data)
    }

    return (
        <Profil data={props.route.params == null ? '' : props.route.params.data} propsNavigate={props.navigation}></Profil>
    )
}