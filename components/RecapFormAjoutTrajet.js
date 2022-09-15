import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable, ScrollView } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function RecapFormAjoutTrajet(props) {
    const tabArrets = ['Arrêt 1', 'Arrêt 2', 'Arrêt 3', 'Arrêt 4', 'Arrêt 5', 'Arrêt 6']

    const handlerAddTrajet = (idDep, idArr, nbPlaces, time, date, dir) => {
        const url = "http://exilieloan.fr/APICoHop/public/api/trajet";
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const fetchOptions = {
            method: "POST", // --> POST = ajout
            body: JSON.stringify({ depart: idDep, arrivee: idArr, nbPlaces: nbPlaces, time: time, date: date, dir: dir }),
            headers: myHeaders
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.text();
            })
            .then((responseData) => {
                console.log(responseData)
            })
            .then((dataJSON) => {

            });
    };

    // console.log(props.data)

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titre1}>✅Récap de ton trajet</Text>
            <LinearGradient
                colors={['#FDE293', '#9ED6AD']}
                style={styles.bar}
                start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}>
                <Text></Text>
            </LinearGradient>

            <View style={styles.div2}>
                <View style={styles.div2G}>
                    <View style={styles.c1}></View>
                    <View style={styles.cercles}></View>
                    <View style={styles.cercles}></View>
                    <View style={styles.cercles}></View>
                    <Text style={styles.titre}>📍</Text>
                </View>
                <View position={'relative'}>
                    <View>
                        <Text style={styles.depArr}>{props.data.dir == 'Direction Campus' ? 'Adresse utilisateur' : props.data.depart}</Text>
                        <View style={styles.souligne}></View>
                    </View>

                    <View style={styles.bottom}>
                        <Text style={styles.depArr}>{props.data.dir == 'Direction Maison' ? 'Adresse utilisateur' : props.data.arrivee}</Text>
                        <View style={styles.souligne}></View>
                    </View>
                </View>
            </View>

            <View style={styles.div3}>
                <View marginLeft={-30} marginRight={10} >
                    <Text style={styles.titre}>⏲️</Text>
                </View>
                <View>
                    <Text style={styles.infos}>De <Text style={styles.special}>{props.data.time}</Text> à <Text style={styles.special}>...</Text></Text>
                    <Text style={styles.infos}>Le <Text style={styles.special}>{props.data.date}</Text></Text>
                </View>
            </View>

            <View style={styles.div3}>
                <View marginRight={10}>
                    <Text style={styles.titre}>🛣️</Text>
                </View>
                <View>
                    <FlatList
                        style={styles.flatlist}
                        data={tabArrets}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.item}>
                                    <Text style={styles.textItem}>{item}</Text>
                                    <View style={styles.separItem}></View>
                                </View>
                            )
                        }}></FlatList>
                </View>
            </View>

            <View style={styles.div3}>
                <View marginRight={10}>
                    <Text style={styles.titre}>🚗</Text>
                </View>
                <View>
                    <Text style={styles.infosPlaces}>Places : <Text style={styles.special}>{props.data.nbPlaces}</Text></Text>
                    <View style={styles.souligne}></View>
                </View>
            </View>

            <Pressable style={styles.submit} onPress={() => {
                props.propsNavigate.navigate('Accueil')
                handlerAddTrajet(props.data.depart, props.data.arrivee, props.data.nbPlaces, props.data.date, props.data.time, props.data.dir)
            }}>
                <Text style={styles.textButton}>Valider le trajet</Text>
            </Pressable>
        </ScrollView>
    )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        height: deviceHeight,
        width: deviceWidth
    },
    titre1: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 30,
        color: '#9ED6AD',
        marginBottom: 7
    },
    titre: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 30,
        color: '#9ED6AD'
    },
    bar: {
        height: 4,
        paddingLeft: 130,
        paddingRight: 130,
        borderRadius: 2,
    },
    div2: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    div2G: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginRight: 10
    },
    c1: {
        height: 22,
        width: 22,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#9ED6AD',
        backgroundColor: 'transparent',
        marginBottom: 9,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    cercles: {
        height: 10,
        width: 10,
        borderRadius: 20,
        backgroundColor: '#D0D0D0',
        marginBottom: 8,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    depArr: {
        color: '#4E4E4E',
        fontSize: 17,
        marginBottom: 3
    },
    souligne: {
        width: 180,
        height: 3,
        backgroundColor: '#9ED6AD',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    bottom: {
        position: 'absolute',
        bottom: 0
    },
    div3: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    infos: {
        fontSize: 20,
        color: '#4E4E4E',
        marginBottom: 8
    },
    special: {
        color: '#FDE293'
    },
    flatlist: {
        width: 180,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    item: {
        marginBottom: 10
    },
    textItem: {
        textAlign: 'left',
        fontSize: 19
    },
    separItem: {
        width: 160,
        height: 2,
        backgroundColor: '#9ED6AD',
    },
    infosPlaces: {
        fontSize: 20,
        marginBottom: 4
    },
    submit: {
        height: 40,
        backgroundColor: '#52B76D',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 100,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    textButton: {
        color: 'grey'
    },
})