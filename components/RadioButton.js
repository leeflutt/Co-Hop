import { React, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect }) {
    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };
    return (
        <View>
            {data.map((item, index) => {
                return (
                    <View key={index} style={styles.radioButtons}>
                        <Pressable
                            style={
                                item.value === userOption ? styles.selected : styles.unselected
                            }
                            onPress={() => selectHandler(item.value)}>

                        </Pressable>
                        <Pressable
                            onPress={() => selectHandler(item.value)}>
                            <Text style={styles.option}> {item.value}</Text>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    unselected: {
        margin: 6,
        padding: 10,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'white',
    },
    selected: {
        backgroundColor: 'white',
        margin: 6,
        padding: 10,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'white',
    },
    radioButtons: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },
});