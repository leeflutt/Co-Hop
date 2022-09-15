import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, Alert, TouchableOpacity, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from './RadioButton';

import Trajet from '../Trajet';
import Campus from '../Campus';


export default function FormAjoutTrajet(props) {
    let tabMois = ['0', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [isSelected, setSelection] = useState();
    const [formDepart, setDepart] = useState();
    const [formArrivee, setArrivee] = useState();
    const [nbPlaces, setNbPlaces] = useState(1);
    const [IDcampusDep, setIDCampusDep] = useState();
    const [IDcampusArr, setIDCampusArr] = useState();
    const [listeCampus, setListeCampus] = useState([]);

    const dataRadioButton = [
        { value: 'Direction Campus' },
        { value: 'Direction Maison' },
    ];

    const [datetime, setDateTimePicker] = useState(new Date())
    const [datetime2, setDateTimePicker2] = useState(new Date())
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [showT, setShowT] = useState(false);
    const [showD, setShowD] = useState(false);

    const getCampus = () => {
        const url = `http://exilieloan.fr/APICoHop/public/api/campus`; //l'URL de la ressource
        let fetchOptions = { method: "GET" }; // les options de l'API fetch
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
                let tabArret = [];
                dataJSON.map((campus) => {
                    let nArret = new Campus(campus)
                    tabArret.push(nArret)
                })
                setListeCampus(tabArret)
                console.log(listeCampus)
            });
    };

    useEffect(() => {
        getCampus()
    }, []);

    let heureActuelle = 0;
    if ((new Date().getMinutes()) < 10) {
        heureActuelle = `${new Date().getHours()} : 0${new Date().getMinutes()}`
    } else {
        heureActuelle = `${new Date().getHours()} : ${new Date().getMinutes()}`
    }

    const dateActuelle = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`

    const onChange = (event, selectedTime) => {
        let cdc = new String(selectedTime)
        let heureC = cdc[16] + cdc[17] + cdc[18] + cdc[19] + cdc[20]
        const currentTime = heureC || time;
        setShowT(Platform.OS === 'ios');
        setTime(currentTime);
        if (selectedTime != null) {
            setDateTimePicker(selectedTime)
        }
    };

    const onChangeD = (event, selectedDate) => {
        if (selectedDate == undefined) {
            setShowD(false);
        } else {
            let cdc = selectedDate.toString()
            let splitting = cdc.split(' ')
            let numMois = tabMois.indexOf(splitting[1])
            if (numMois < 10) {
                numMois = `0${numMois}`
            }
            let dateC = `${splitting[2]}-${numMois}-${splitting[3]}`
            const currentDate = dateC || date;
            setShowD(false);
            setDate(currentDate);
            if (selectedDate != null) {
                setDateTimePicker2(selectedDate)
            }
        }
    };

    const showTimepicker = () => {
        showModeT('time');
    };

    const showDatepicker = () => {
        showModeD('date');
    };

    const showModeT = (mode) => {
        setShowT(true);
    };

    const showModeD = (mode) => {
        setShowD(true);
    };

    let verifTrajet = new Trajet(isSelected, IDcampusDep, IDcampusArr, nbPlaces, date, time)
    let phraseVerif = `${verifTrajet.dir} ${verifTrajet.depart} ${verifTrajet.arrivee} ${verifTrajet.nbPlaces} ${verifTrajet.time} ${verifTrajet.date}`
    console.log(phraseVerif)
    const regex = /undefined/g
    let verif = phraseVerif.match(regex)
    console.log(verif)
    let ok = false

    if (verif.length > 1) {
        ok = false
        console.log('blabla')
    } else {
        ok = true
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.h1}>Proposer {"\n"}un trajet... 🚗</Text>

            {/* Mise en page page formulaire */}
            <View style={styles.formulaire}>
                <View>
                    <Text style={styles.label}>Type de trajet</Text>
                    <RadioButton data={dataRadioButton} onSelect={(value) => {
                        setSelection(value)
                        if (isSelected == 'Direction Campus') {
                            setDepart(undefined)
                        }
                        if (isSelected == 'Direction Maison') {
                            setArrivee(undefined)
                        }
                    }} />

                </View>
                <View style={styles.depArr} >
                    <Text style={styles.label}>Départ</Text>
                    {isSelected === 'Direction Maison' ?
                        <Picker style={styles.pickerCampus}
                            selectedValue={IDcampusDep}
                            onValueChange={(itemValue, itemIndex) => {
                                setIDCampusDep(itemValue)
                            }
                            }>
                            <Picker.Item label="" value={undefined} />
                            {listeCampus.map(item => {
                                return (
                                    <Picker.Item key={item.id_campus} label={(item.nom).toString()} value={item.id_campus} />
                                )
                            })}
                        </Picker>
                        :
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <TextInput
                                width={deviceWidth / 1.2}
                                style={isSelected === "Direction Campus" ? styles.inputDisabled : styles.inputDisabled}
                                onChangeText={setDepart}
                                placeholder={isSelected === "Direction Campus" ? "Mon adresse" : "Rechercher..."}
                                value={isSelected === "Direction Campus" ? "" : formDepart}
                                editable={isSelected === "Direction Campus" ? false : false} />
                        </TouchableWithoutFeedback>
                    }


                    <Text style={styles.label}>Arrivée</Text>
                    {isSelected === 'Direction Campus' ?
                        <Picker style={styles.pickerCampus}
                            selectedValue={IDcampusArr}
                            onValueChange={(itemValue, itemIndex) =>
                                setIDCampusArr(itemValue)
                            }>
                            <Picker.Item label="" value={undefined} />
                            {listeCampus.map(item => {
                                return (
                                    <Picker.Item key={item.id_campus} label={(item.nom).toString()} value={item.id_campus} />
                                )
                            })}
                        </Picker>
                        :
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <TextInput
                                width={deviceWidth / 1.2}
                                style={isSelected === "Direction Maison" ? styles.inputDisabled : styles.inputDisabled}
                                onChangeText={setArrivee}
                                placeholder={isSelected === "Direction Maison" ? "Mon adresse" : "Rechercher..."}
                                value={isSelected === "Direction Maison" ? "" : formArrivee}
                                editable={isSelected === "Direction Maison" ? false : false} />
                        </TouchableWithoutFeedback>
                    }
                </View>
                <View style={styles.divPlaceHeure}>
                    <View>
                        <Text style={styles.label}>Places</Text>
                        <Picker style={styles.picker}
                            selectedValue={nbPlaces}
                            onValueChange={(itemValue, itemIndex) =>
                                setNbPlaces(itemValue)
                            }>
                            <Picker.Item label="1" value="1" style={styles.picker} />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.label}>Heure de départ</Text>
                        <View>
                            <Pressable width={210} style={styles.button} onPress={showTimepicker}>
                                <Text style={styles.textButton}>{time == undefined ? heureActuelle : time}</Text>
                            </Pressable>
                        </View>
                        {showT && (
                            <DateTimePicker
                                testID="timePicker"
                                mode={'time'}
                                value={datetime}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.divDate}>
                    <Text style={styles.label}>Date</Text>
                    <View>
                        <Pressable width={deviceWidth / 1.2} style={styles.button} onPress={showDatepicker}>
                            <Text style={styles.textButton}>{date == undefined ? dateActuelle : date}</Text>
                        </Pressable>
                    </View>
                    {showD && (
                        <DateTimePicker
                            testID="datePicker"
                            mode={'date'}
                            value={datetime2}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeD}
                        />
                    )}
                </View>
                <View>
                    <Pressable disabled={ok == true ? false : true} backgroundColor={ok == true ? '#429e5b' : '#ebebeb'} style={styles.submit} onPress={() => {
                        let newTraj
                        if (isSelected == 'Direction Campus') {
                            newTraj = new Trajet(isSelected, IDcampusDep, IDcampusArr, nbPlaces, date, time)
                        } else {
                            newTraj = new Trajet(isSelected, IDcampusDep, IDcampusArr, nbPlaces, date, time)
                        }
                        props.handleS(newTraj)
                        props.propsNavigation.navigate('RecapFormAjout', { data: newTraj })
                    }}>
                        <Text style={styles.textButton}>Valider le trajet</Text>
                    </Pressable>
                </View>
            </View>
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
        backgroundColor: '#9ED6AD',
        height: deviceHeight,
        width: deviceWidth,
    },
    h1: {
        fontSize: 35,
        textTransform: 'uppercase'
    },
    label: {
        fontSize: 18,
        marginBottom: 7
    },
    formulaire: {
        paddingTop: 20,
    },
    icons: {
        fontSize: 50,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 10,
        marginBottom: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputDisabled: {
        height: 40,
        backgroundColor: '#c4c4c4',
        borderRadius: 18,
        padding: 10,
        marginBottom: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    divPlaceHeure: {
        display: 'flex',
        flexDirection: 'row'
    },
    picker: {
        width: 100,
        marginRight: 20,
        height: 40,
        borderRadius: 18,
        backgroundColor: 'white'
    },
    pickerCampus: {
        height: 40,
        borderRadius: 18,
        backgroundColor: 'white',
        marginBottom: 5
    },
    depArr: {
        marginBottom: 20
    },
    button: {
        backgroundColor: 'white',
        textAlign: 'center',
        color: 'red',
        height: 40,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',


        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    divDate: {
        marginTop: 20
    },
    textButton: {
        color: 'grey'
    },
    submit: {
        height: 40,
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
    }
});