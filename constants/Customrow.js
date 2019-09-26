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
        backgroundColor: '#F2F2F2',
        elevation: 2,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#BFBFBF',
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
        fontSize: 18,
        color: '#000',
    },
});

const Customrow = ({ title, description, color }) => (
    <View style={color % 2 === 0 ? styles.container : styles.container2}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>

    </View>
);

export default Customrow;