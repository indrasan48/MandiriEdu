import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    sks: {
        fontSize: 15,
        color: '#000',
    },
    text: {
        fontSize: 15,
        color: '#000',
    },
});

const Customrow = ({ hari, tgl, mulai, selesai, jenis, kuliah, materi, ruang, }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.description}>
                {hari + ', ' + tgl}
            </Text>
            <Text style={styles.sks}>
                {mulai + ' - ' + selesai}
            </Text>
            <Text style={styles.text}>
                {'Kuliah : ' + kuliah}
            </Text>
            <Text style={styles.text}>
                {'Materi : ' + materi}
            </Text>
            <Text style={styles.text}>
                {'Ruang : ' + ruang}
            </Text>
        </View>

    </View>
);

export default Customrow;