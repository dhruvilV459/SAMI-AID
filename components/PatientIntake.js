import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../Constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   onClearAllDataAssessment,
//   onFeel,
//   onNoticeProblem,
//   onOtherChange,
//   onSymptomsChange,
// } from '../../actions/PatientAssessmentAction';
// import {
//   onCardHolderNameChanged,
//   onCardNumberChanged,
//   onClearAllData,
//   onEmailAddressChanged,
//   onExpirationDateChanged,
//   onNotAvailableChanged,
//   onPhoneNumberChanged,
//   onPrimaryCarePhysicianChanged,
//   onSecurityCodeChanged,
// } from '../../actions/PatientConnectivityAction';

import firebase from 'firebase';

const PatientIntake = ({route, navigation}) => {
  console.log(route.params);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [currentUser, setCurrentUser] = useState();

  const dataFromReduxStore = useSelector((state) => state.assessment);
  // const {notice_problem, feel, symptoms, other} = dataFromReduxStore;

  const dataFromReduxStoreConnectivity = useSelector(
    (state) => state.connectivity,
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('logged in')
      }
    });
    setCurrentUser(firebase.auth().currentUser.uid);
    firebase
      .database()
      .ref(`/user/${currentUser}/userDetails`)
      .on('child_added', (value) => {
        let data = value.val();
        // console.log(data.val())
        setName(data.firstName);
        setSurname(data.lastName);
      });
  });

  const NxtPageRedirection = () => {
    console.log('inside ');
    if (route.params.value === 'nr') {
      navigation.navigate('Nurse', {value: 'nr'});
    } else if (route.params.value === 'dr') {
      navigation.navigate('Nurse', {value: 'dr'});
    } else if (route.params.value === 'bh') {
      navigation.navigate('Nurse', {value: 'bh'});
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../assets/shape.png')}
        style={styles.mainImg}
      />

      <Image
        source={require('../assets/logo_sami_aid_white.png')}
        style={styles.imgLogo}
      />

      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: hp('1%')}}>
          <Text
            style={{
              color: Colors.primaryColor,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: hp('2%'),
            }}>
            Patient Intake
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: hp('3%'),
            }}>
            Who needs help today?
          </Text>

          <View style={styles.outerViewCircle}>
            <View style={styles.circle}>
              <Text style={{textAlign: 'center', fontSize: 22, color: 'white'}}>
                {name.charAt(0)} {surname.charAt(0)}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: hp('3%'),
              fontSize: 16,
            }}>
            {name} {surname}
          </Text>

          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginHorizontal: wp('3%'),
              fontSize: 13,
              marginTop: hp('4%'),
            }}>
            When you click "Continue" you will be asked to enter your payment
            information.
          </Text>

          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginHorizontal: wp('3%'),
              fontSize: 13,
            }}>
            You don't need to pay if you have an incomplete appointment.
          </Text>
          <View style={{marginTop: hp('3%')}}>
            <Button
              title="Back"
              buttonStyle={{
                backgroundColor: Colors.primaryColor,
                marginHorizontal: wp('3%'),
              }}
              onPress={() => navigation.goBack()}
            />

            <Button
              title="Continue"
              buttonStyle={{
                backgroundColor: Colors.primaryColor,
                marginHorizontal: wp('3%'),
                marginTop: hp('2%'),
              }}
              onPress={NxtPageRedirection}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerViewCircle: {
    elevation: 8,
    height: hp('21%'),
    width: wp('45%'),
    borderRadius: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: hp('2%'),
    borderWidth: 4,
    borderColor: 'white',
  },
  circle: {
    height: hp('20%'),
    width: wp('43%'),
    borderRadius: 90,
    backgroundColor: '#75d8d5',
    alignSelf: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  imgLogo: {
    width: wp('40%'),
    height: hp('7%'),
    resizeMode: 'contain',
    position: 'absolute',
    marginLeft: wp('2%'),
  },
  mainImg: {
    width: wp('100%'),
    height: hp('12%'),
  },
});

export default PatientIntake;
