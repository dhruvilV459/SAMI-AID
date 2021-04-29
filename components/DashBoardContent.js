import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DashBoardContent = (props) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={.3} onPress={props.onPress}>
            <ImageBackground
                source={props.image}
                style={styles.homeImg}
            />
            <Text style={styles.placeholderText}>{props.placeholder}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    placeholderText: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'FiraSans-SemiBold'
    },
    container: {
        marginVertical: hp('2%'),
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 120,
        width: Dimensions.get('window').width / 2.5,
        elevation: 6,
        justifyContent: 'center',
        borderRadius: 13,
        padding: 10, 
        marginEnd: wp('3%'),
        marginStart: wp('3.8%')
    },
    homeImg: {
        height: 40,
        width: 40
    }
});

export default DashBoardContent;
