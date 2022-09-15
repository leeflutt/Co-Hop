import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable, ScrollView, TextPropTypes, TouchableOpacity } from 'react-native';

import Campus from '../Campus';

export default function detTraj(props) {

    return (
        <View style={styles.container}>
            <Text>C'est le détail des trajets ou kwa</Text>
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        height: deviceHeight,
        width: deviceWidth
    }
})