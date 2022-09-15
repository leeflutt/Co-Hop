import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profil(props) {

    return (
        <View style={styles.container}>
            <Image
                style={styles.imgProfil}
                source={require('../assets/profil.jpg')}
            />
            <Text style={styles.textProfil}>Mariotto Ugo</Text>
            <Text style={styles.subTextProfil}>Driver</Text>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>9</Text>
                    <Text style={styles.statDesc}>Hop'ers transportés</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statDesc}>Arrêts</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statDesc}>Trajets</Text>
                </View>
            </View>
            <LinearGradient
                colors={['#FDE293', '#9ED6AD']}
                style={styles.bar}
                start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}>
                <Text></Text>
            </LinearGradient>
            <View style={styles.edit}>
                <TouchableOpacity>
                    <Text style={styles.editText}>🖊 Modifier mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.editText}>📋 Mes trajets</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.editText}>⏳ Mes anciens trajets</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.editText}>🚫 Signaler un problème</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
        alignItems: 'center',
    },
    imgProfil: {
        marginTop: 30,
        marginBottom: 10,
        width: '56%',
        height: '33%',
        borderRadius: 100,
    },
    textProfil: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    subTextProfil: {
        fontStyle: 'italic',
        color: '#9ED6AD',
        marginBottom: 30,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    stat: {
        width: '25%',
        alignItems: 'center',
    },
    statNumber: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#9ED6AD',
    },
    statDesc: {
        color: '#9ED6AD',
        textAlign: 'center',
    },
    bar: {
        height: 4,
        paddingLeft: 130,
        paddingRight: 130,
        borderRadius: 2,
        marginBottom: 40,
    },
    edit: {
        textAlign: 'left',
        // marginLeft: -50,
    },
    editText: {
        marginBottom: 20,
        color: '#FDE293',
        fontWeight: 'bold',
        fontSize: 18,
    },
});