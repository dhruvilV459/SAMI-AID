import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, ScrollView } from 'react-native';
import { Dimensions, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EmptySelectBox from '../../../components/EmptySelectBox';
import ModalWithPagination from '../../../components/ModalWithPagination';
import SignupCard from '../../../components/SignupCard';
import { Colors } from '../../../Constants/Colors';
import { City, Procedure, Provider, Specialty, Type } from '../../../dummy/StateData';
import MapView from 'react-native-maps'
import { ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import MapModal from '../../../components/MapModal';

const IntelliPhysician = () => {

    const [zipcode, setZipcode] = useState();
    const [maxDistance, setMaxDistance] = useState()
    const [maxOfficePrice, setMaxOfficePrice] = useState()
    
    const [visible, setVisible] = useState(false)


    

    return (
        <View style={styles.screen}>
            <ImageBackground
                source={require('../../../assets/shape.png')}
                style={styles.headerImg}
            >
                <Image
                    source={require('../../../assets/logo_sami_aid_white.png')}
                    style={styles.logoImg}
                />
            </ImageBackground>

            <ScrollView>

                <View style={styles.contentView}>
                    <Text style={styles.contentHeader}>Search for Medical Provider:{'\n'}</Text>
                    <Text style={styles.content}>Select the appropritate Specialty or Procedure to find a primary care physician, specialist, urgent care, lab, or medical procedure. You can also filter your results by location and price. If you choose not to select any filters, all available results will be displayed.</Text>

                    <Text style={styles.contentTxt}>Specialty</Text>
                    <EmptySelectBox
                        values={Specialty}
                        onChange={(val) => { }}
                        displayError={(val) => { }}
                    />

                    <Text style={styles.contentTxt}>Procedure</Text>
                    <EmptySelectBox
                        values={Procedure}
                        onChange={(val) => { }}
                        displayError={(val) => { }}
                    />

                    <Text style={styles.contentTxt}>Type</Text>
                    <EmptySelectBox
                        values={Type}
                        onChange={(val) => { }}
                        displayError={(val) => { }}
                    />

                    <Text style={styles.contentTxt}>Provider</Text>
                    <ModalWithPagination
                        values={Provider}
                        onChange={(val) => { }}
                        displayError={(val) => { }}

                    />

                    <Text style={styles.contentTxt}>City</Text>
                    <ModalWithPagination
                        values={City}
                        onChange={(val) => { }}
                        displayError={(val) => { }}

                    />

                    <Text style={styles.contentTxt}>Zip Code</Text>
                    <Input
                        value={zipcode}
                        onChangeText={setZipcode}
                        containerStyle={{ marginBottom: -9 }}
                        inputContainerStyle={styles.inputContainerStyleZipCode}
                        inputStyle={styles.inputStyleZipCode}
                    />

                    <Text style={styles.contentTxt}>Max Distance</Text>
                    <Input
                        value={maxDistance}
                        containerStyle={{ marginBottom: -9 }}
                        onChangeText={setMaxDistance}
                        inputContainerStyle={styles.inputContainerStyleZipCode}
                        inputStyle={styles.inputStyleZipCode}
                    />

                    <Button
                        title={'SEARCH'}
                        buttonStyle={styles.buttonStyleSearch}
                        onPress={() => setVisible(!visible)}
                    />

                    <Button
                        title={'CLEAR SEARCH'}
                        buttonStyle={styles.buttonStyleClearSearch}
                    />

                    <MapModal 
                    visible={visible}
                    onPress={() => setVisible(!visible)}
                    />

                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyleClearSearch: {
        backgroundColor: Colors.primaryColor,
        padding: 15,
        marginHorizontal: wp('2%'),
        borderRadius: 7,
        marginTop: '4%',
        marginBottom: '2%'
    },
    buttonStyleSearch: {
        backgroundColor: Colors.primaryColor,
        padding: 15,
        marginHorizontal: wp('2%'),
        borderRadius: 7,
        marginTop: '3%'
    },
    inputStyleZipCode: {
        color: Colors.primaryColor,
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
    },
    inputContainerStyleZipCode: {
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 7,
        padding: '.75%',
        marginTop: '3%',
    },
    contentTxt: {
        marginHorizontal: wp('2%'),
        marginTop: hp('2%'),
        fontFamily: 'FiraSans-SemiBold',
        fontSize: 16
    },
    contentHeader: {
        fontFamily: 'FiraSans-SemiBold',
        fontSize: 16,
        marginHorizontal: wp('2%'),
    },
    content: {
        fontFamily: 'FiraSans-Regular',
        color: Colors.primaryColor,
        fontSize: 15,
        marginHorizontal: wp('2%'),
    },
    contentView: {
        marginHorizontal: wp('2%'),
        marginTop: hp('5%'),

    },
    logoImg: {
        width: wp('40%'),
        height: hp('7%'),
        resizeMode: 'contain',
        marginLeft: wp('2%')
    },
    headerImg: {
        width: Dimensions.get('window').width,
        height: hp('12%'),
        resizeMode: 'contain'
    },
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default IntelliPhysician;
