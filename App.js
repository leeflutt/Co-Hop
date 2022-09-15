import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navigation entre les vues
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import FormAjout from './screens/FormAjout';
import RecapFormAjout from './screens/RecapFormAjout';
import Accueil from './screens/ScreenAccueil';
import ListeTrajets from './screens/ScreenListeTrajets';
import ScreenProfil from './screens/ScreenProfil';
import ScreenDetTraj from './screens/ScreenDetTraj';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator()

const MyTheme = {
  colors: {
    background: 'white',
  },
};

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      // shifting={true} // Activer l'animation
      // sceneAnimationEnabled={true} // Animation
      activeColor="#9cc0f9"
      inactiveColor="#fff"
      barStyle={{ backgroundColor: '#ffff' }}>

      <Tab.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: '',
          style: {},
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons
              name="home"
              color={'#fde293'}
              size={26}
              style={{

              }} />
          ),
        }} />

      <Tab.Screen
        name="ListeTrajets"
        component={ListeTrajets}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="road-variant" color={'#fde293'} size={26} />
          ),
        }} />

      <Tab.Screen
        name="FormAjout"
        component={FormAjout}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="plus" color={'#fde293'} size={26} />
          ),
        }} />

      <Tab.Screen
        name="ScreenProfil"
        component={ScreenProfil}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="account" color={'#fde293'} size={26} />
          ),
        }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen name="RecapFormAjout" component={RecapFormAjout} options={{ title: 'Récapitulatif de votre trajet' }} />
        <Stack.Screen name="DetTraj" component={ScreenDetTraj} options={{ title: 'Détail du trajet' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigator: {
    backgroundColor: '#fff',
  },
  navTop: {
    display: 'none'
  }
});
