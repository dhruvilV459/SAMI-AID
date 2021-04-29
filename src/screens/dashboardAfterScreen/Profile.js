import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../../components/Card';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/routers';

const Profile = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground
                source={require('../../../assets/shape.png')}
                style={styles.shapeImg}
            >
                <Image
                    source={require('../../../assets/logo_sami_aid_white.png')}
                    style={styles.logoImg}
                />
            </ImageBackground>

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.mainView}>
                    <Text style={styles.health}>My Health</Text>
                    <Card text={'Account Details'} subText={'View and Edit your Personal Details'} onPress={() => props.navigation.navigate('AccountDetails')} />
                    <Card text={'Personal Health History'} subText={'View and Edit your Personal Health History here'} onPress={() => props.navigation.navigate('Personal')} />
                    <Card text={'Logout'} subText={'Logout from SAMI-Aid'} onPress={() => {

                        AsyncStorage.clear().then(res => {
                            firebase.auth().signOut()
                            AsyncStorage.removeItem('user').then(res => {
                                props.navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [{ name: 'InitialPath' }]
                                    })
                                )
                            })

                        })

                    }} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    health: {
        marginBottom: hp('3%'),
        fontSize: 18,
        fontFamily: 'FiraSans-SemiBold'
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    logoImg: {
        width: wp('40%'),
        height: hp('7%'),
        resizeMode: 'contain',
        marginLeft: wp('2%')
    },
    shapeImg: {
        width: Dimensions.get('window').width,
        height: hp('12%'),
        resizeMode: 'contain'
    }
});

export default Profile;
