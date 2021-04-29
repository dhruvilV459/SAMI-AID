import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../Constants/Colors';

const Card = (props) => {
    return (
        <TouchableOpacity style={styles.parentView} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
            <Text style={styles.subText}>{props.subText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    subText: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'FiraSans-Regular'
    },
    text: {
        color: Colors.primaryColor,
        fontFamily: 'FiraSans-SemiBold',
        fontSize: 15.5,
        lineHeight: 30
    },
    parentView: {
        backgroundColor: 'white',
        elevation: 10,
        width: wp('93%'),
        padding: 15,
        marginBottom: wp('4%'),
        borderRadius: 7
    }
});

export default Card;
