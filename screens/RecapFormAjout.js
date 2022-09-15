import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import RecapFormAjoutTrajet from '../components/RecapFormAjoutTrajet';

export default function FormAjout(props) {
  if (props.route.params != null) {
    console.log(props.route.params.data)
  }

  return (
    <View>
      <RecapFormAjoutTrajet data={props.route.params == null ? '' : props.route.params.data} propsNavigate={props.navigation}></RecapFormAjoutTrajet>
    </View>
  )
}