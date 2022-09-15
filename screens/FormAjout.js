import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import FormAjoutTrajet from '../components/FormAjoutTrajet';

export default function FormAjout(props) {
  const [dataTrajet, setData] = useState({})

  const handleSubmit = (data) => {
    
  }

  return (
    <View>
      <FormAjoutTrajet handleS={handleSubmit} propsNavigation = {props.navigation}></FormAjoutTrajet>
    </View>
  );
}