import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable, ScrollView, TextPropTypes, TouchableOpacity } from 'react-native';

import Campus from '../Campus';

export default function RecapFormAjoutTrajet(props) {
    const [listeTrajets, setListeTrajets] = useState([]);
    const [listeCampus, setListeCampus] = useState([]);

    const getTrajets = () => {
        const url = `http://exilieloan.fr/APICoHop/public/api/trajet`; //l'URL de la ressource
        let fetchOptions = { method: "GET" }; // les options de l'API fetch
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let tabTrajets = [];
                dataJSON.map((trajet) => {

                    let dateHeureDep = trajet.HEURE_DEP.toString().split(' ')

                    let heureSplitDep = dateHeureDep[1].split(':')
                    let heureDep = `${heureSplitDep[0]}:${heureSplitDep[1]}`

                    let dateSplitDep = dateHeureDep[0].split('-')
                    let dateDep = `${dateSplitDep[2]}-${dateSplitDep[1]}-${dateSplitDep[0]}`


                    if (trajet.HEURE_ARR == null) {
                        trajet.HEURE_ARR = "2022-12-31 00:00:00"
                    } else {
                        trajet.HEURE_ARR = trajet.HEURE_ARR
                    }
                    let dateHeureArr = trajet.HEURE_ARR.toString().split(' ')

                    let heureSplitArr = dateHeureArr[1].split(':')
                    let heureArr = `${heureSplitArr[0]}:${heureSplitArr[1]}`

                    let dateSplitArr = dateHeureArr[0].split('-')
                    let dateArr = `${dateSplitArr[2]}-${dateSplitArr[1]}-${dateSplitArr[0]}`

                    let ntrajet = {
                        idTraj: trajet.ID_TRAJET,
                        dateDep: dateDep,
                        heureDep: heureDep,
                        heureArr: heureArr,
                        lieuDep: trajet.ID_CAMPUS_DEPART,
                        lieuArr: trajet.ID_CAMPUS_ARRIVEE,
                        nbPlaces: trajet.NB_PLACES
                    }
                    tabTrajets.push(ntrajet)
                })
                setListeTrajets(tabTrajets)
            });
    };

    const getCampus = () => {
        const url = `http://exilieloan.fr/APICoHop/public/api/campus`; //l'URL de la ressource
        let fetchOptions = { method: "GET" }; // les options de l'API fetch
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let tabArret = [];
                dataJSON.map((campus) => {
                    let nArret = new Campus(campus)
                    tabArret.push(nArret)
                })
                setListeCampus(tabArret)
            });
    };

    useEffect(() => {
        getCampus()
    }, []);

    useEffect(() => {
        getTrajets()
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titre1}>Trajets disponibles</Text>
            <View style={styles.separateur}></View>

            <View style={styles.div2}>
                <Text style={styles.titre}>Trajets depuis Campus</Text>
                <FlatList
                    data={listeTrajets}
                    keyExtractor={(item) => item.idTraj.toString()}
                    renderItem={({ item }) => {
                        if (item.lieuDep !== null) {
                            let nomCampusItem = item.lieuDep
                            let nomCampus
                            listeCampus.map((campus) => {
                                if (campus.id_campus == nomCampusItem) {
                                    nomCampus = campus.nom
                                }
                            })
                            return (
                                <TouchableOpacity onPress={() => props.propsNavigation.navigate('DetTraj')}>
                                    <View style={styles.trajCard}>
                                        <View style={styles.divHeures}>
                                            <View>
                                                <Text style={styles.heures}>{item.heureDep}</Text>
                                                <Text style={styles.heures}>{item.heureArr}</Text>
                                            </View>
                                            <View marginLeft={10} marginTop={3}>
                                                <Text style={styles.lieux}>{nomCampus}</Text>
                                                <Text style={styles.lieux}>Adresse du conducteur</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.txtCard}>{item.dateDep}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }}></FlatList>

                <Text style={styles.titre}>Trajets vers Campus</Text>
                <FlatList
                    data={listeTrajets}
                    keyExtractor={(item) => item.idTraj.toString()}
                    renderItem={({ item }) => {
                        if (item.lieuArr !== null) {
                            let nomCampusItem = item.lieuArr
                            let nomCampus
                            listeCampus.map((campus) => {
                                if (campus.id_campus == nomCampusItem) {
                                    nomCampus = campus.nom
                                }
                            })
                            return (
                                <View style={styles.trajCard}>
                                    <View style={styles.divHeures}>
                                        <View>
                                            <Text style={styles.heures}>{item.heureDep}</Text>
                                            <Text style={styles.heures}>{item.heureArr}</Text>
                                        </View>
                                        <View marginLeft={10} marginTop={3}>
                                            <Text style={styles.lieux}>Adresse du conducteur</Text>
                                            <Text style={styles.lieux}>{nomCampus}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.txtCard}>{item.dateDep}</Text>
                                </View>
                            )
                        }
                    }}></FlatList>
            </View >
        </ScrollView>
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
    },
    titre1: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 30,
        color: '#9ED6AD',
        marginBottom: 7
    },
    titre: {
        fontSize: 20,
        color: '#9CC0F9',
        marginBottom: 7
    },
    separateur: {
        width: deviceWidth / 1.8,
        height: 3,
        backgroundColor: '#FDE293',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    div2: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: deviceHeight / 10
    },
    trajCard: {
        backgroundColor: '#ebebeb',
        height: 100,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginLeft: 2,
        marginRight: 2
    },
    txtCard: {
        fontSize: 18,
        color: '#9CC0F9'
    },
    divHeures: {
        flex: 1,
        flexDirection: 'row'
    },
    heures: {
        fontSize: 25,
        color: '#9ED6AD',
        fontWeight: 'bold'
    },
    lieux: {
        marginTop: 2,
        fontSize: 20,
        color: '#9ED6AD',
    },
})