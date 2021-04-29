import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
import { ActivityIndicator } from 'react-native';
import { Colors } from '../Constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stripe from 'tipsi-stripe'
import CardFormScreen from '../src/scenes/CardFormScreen';
import CustomCardScreen from '../src/scenes/CustomCardScreen';
import AndroidPayScreen from '../src/scenes/AndroidPayScreen';
import { number } from 'card-validator';
// import { Button as StripeButton } from '../src/components/Button'



stripe.setOptions({
    publishableKey: 'pk_test_51Ig3ecSFM4BoE4ohqwDH53VlzhLNzczaBYSxuLmPtrtuVOmmLZHudeh5nCusMFRHNVv6rNhoRSQ2nvP3SCu6G47h00y9RHSTuf'
})

const MapModal = (props) => {
    const [coordiantes, setCoordinates] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const getLocationUser = () => {
        // console.log('jeet function')
        Geolocation.watchPosition(pos => {
            // console.log('jeet insiede')
            // console.log(pos)
            setCoordinates({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
            setIsLoading(false)

        }, err => console.log(err, 'jeet err'), { enableHighAccuracy: true, fastestInterval: 2000, })
    };

    useEffect(() => {

        const checkStatus = async () => {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Location Permission',
                message: 'This App needs to access your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK'

            })
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                // console.log('granted')
                getLocationUser()
            }
            else {
                console.log('permission denied')
            }
        }

        checkStatus()





    }, [isLoading])

    const checkCard = () => {
        let cc = number('4377')
        console.log(cc)
    }


    const getMapRegion = () => ({
        latitude: coordiantes.latitude,
        longitude: coordiantes.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })

    const onPressHandler = () => {
        setIsVisible(true)
        // console.log('jeet press handler')
        props.onPress()
    }


    if (props.visible) {
        return (
            <Overlay isVisible={props.visible} onBackdropPress={props.onPress}
                overlayStyle={styles.modal}
            >
                {isLoading ? <ActivityIndicator size={'large'} color={Colors.primaryColor} /> : <View style={styles.modalMap}>
                    <MapView
                        style={{ height: 300, width: '100%', flex: 1, marginTop: !isLoading ? 1 : 0 }}
                        provider={'google'}
                        showsUserLocation
                        showsMyLocationButton={true}
                        followsUserLocation
                        // loadingEnabled
                        region={getMapRegion()}
                    />
                    <Button
                        title={'NEXT'}
                        buttonStyle={styles.buttonStyleClearSearch}
                        containerStyle={styles.containerStyle}
                        onPress={onPressHandler}
                    />
                </View>}

            </Overlay>
        )
    }

    if (isVisible) {
        return (
            <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}
                overlayStyle={styles.payment}
            >
                {/* <StripeButton/> */}

                <CardFormScreen />

                {/* <CustomCardScreen /> */}

                {/* <Button onPress={() => { checkCard() }} title={'press'} /> */}




            </Overlay>
        )
    }


    return (
        <View></View>
    )

};

const styles = StyleSheet.create({
    payment: {
        width: '100%',
        height: '100%',
    },
    containerStyle: {
        width: '100%'
    },
    buttonStyleClearSearch: {
        backgroundColor: Colors.primaryColor,
        padding: 15,
        marginHorizontal: wp('2%'),
        borderRadius: 7,
        marginTop: '4%',
        marginBottom: '2%',
    },
    modal: {
        flex: 1,
        width: '90%',
        height: '100%',
        // alignItems: 'center'
    },
    modalMap: {
        flex: 1,
        alignItems: 'center'
    }
});

export default MapModal;
