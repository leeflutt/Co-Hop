import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';

import Accueil from '../components/Accueil';

// Elements pour récupérer la position de l'utilisateur
import * as Location from 'expo-location';

export default function ScreenAccueil(props) {

    return (
        <Accueil></Accueil>
    );
}