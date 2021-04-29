// import React, { useEffect, useRef, useState } from 'react';
// import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, Dimensions,ActivityIndicator,Alert } from 'react-native';
// import { Button, CheckBox } from 'react-native-elements';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import SignupCard from '../../components/SignupCard';
// import { Colors } from '../../Constants/Colors';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useDispatch, useSelector } from 'react-redux';
// import { EMAIL_CHANGED, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, PASSWORD_CHANGED, REMEMBER_USER, TOUCH_ID } from '../actions/types';
// import firebase from 'firebase'
// import { onPasswordChanged, onSiginEmailChanged, onSignin, onUserNameChanged } from '../actions/AuthAction';
// import validator from 'validator';
// import { CommonActions } from '@react-navigation/routers';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SigninScreen = (props) => {
//     const [visiblePass, setVisiblePass] = useState(true);
//     const [title, setTitle] = useState('SIGN IN')
//     const [errorUserName, setErrorUserName] = useState('')
//     const [errorPass, setErrorPass] = useState('')
//     let regex = /^([A-Za-z0-9]{1,}\.?[A-Za-z0-9]{1,})\@([a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{1,})$/g

//     const dataFromReduxStore = useSelector(state => state.signin)
//     const { email, password, rememberUsername, enableTouchID } = dataFromReduxStore

//     const actionsFromRedux = useDispatch()

//     const onEmailChange = (val) => {
//         actionsFromRedux(onSiginEmailChanged(val))
//     }

//     const onPasswordChange = (pass) => {
//         actionsFromRedux(onPasswordChanged(pass))
//     }

//     const onSignIn = async () => {
//         setTitle(<ActivityIndicator size='large' color='white' />)

//         if (validator.isEmail(email) && password.length > 4) {
//             firebase.auth().signInWithEmailAndPassword(email, password)
//                 .then(res => {
//                     AsyncStorage.setItem('user', JSON.stringify(res.user))
//                         .then(resUser => {
//                             actionsFromRedux(onSignin(res.user))
//                             setTitle('SIGN IN')

//                             // console.log(res.stsTokenManager)

//                             props.navigation.dispatch(
//                                 CommonActions.reset({
//                                     index: 1,
//                                     routes: [{ name: 'OnWardsFlow' }]
//                                 })
//                             )
//                         }).catch(err => console.log(err))

//                     // console.log(res.user)

//                 })
//                 .catch(err => {
//                     Alert.alert('Invalid Credentials', 'Enter Proper Credentials');
//                     setTitle('SIGN IN')
//                     actionsFromRedux({ type: LOGIN_USER_FAIL })
//                 })
//         } else {
//             if (email.length < 6) {
//                 if (password.length < 5) {
//                     setErrorPass('Enter Proper Password')
//                 }
//                 setErrorUserName('Enter Proper Email ID')
//             }
//             Alert.alert('Invalid Credentials', 'Enter Proper Credentials')
//             setTitle('SIGN IN')
//             actionsFromRedux({ type: LOGIN_USER_FAIL })
//         }

//     }

//     const email_ref = useRef()
//     const pass_ref = useRef()

//     return (
//         <View style={styles.screen} >

//             <ImageBackground
//                 source={require('../../assets/signin_background.png')}
//                 style={styles.mainImg}
//             >
//                 <Image
//                     source={require('../../assets/sami_aid_logoWhite.png')}
//                     style={styles.logo}
//                 />

//                 <Text style={styles.login}>LOGIN</Text>

//             </ImageBackground>
//             <ScrollView style={{ marginTop: hp('-27%'), borderRadius: 7, marginBottom: hp('1%'), }} showsVerticalScrollIndicator={false}>
//                 <View style={{ elevation: 5, backgroundColor: 'white', marginHorizontal: wp('4%'), paddingTop: hp('1.5%') }}>
//                     <SignupCard
//                         ref={email_ref}
//                         returnKeyType={'next'}
//                         onSubmitEditing={() => pass_ref.current.focus()}
//                         label={'Username'}
//                         title='Username'
//                         placeholder='Enter Email'
//                         // autoFocus={true}
//                         // returnKeyType={"next"}
//                         // onSubmitEditing={() => ref_input2.current.focus()}
//                         value={email}
//                         onChangeText={onEmailChange}
//                         errorStyle={{ color: 'red' }}
//                         errorMessage={errorUserName}
//                         onBlur={() => validator.isEmail(email) ? setErrorUserName('') : setErrorUserName('Enter Proper Email ID')}
//                     />

//                     <SignupCard
//                         ref={pass_ref}
//                         returnKeyType={'done'}
//                         label={'Password'}
//                         title='Password'
//                         placeholder='Enter Password'
//                         secureTextEntry={visiblePass}
//                         rightIcon={visiblePass ? <Icon name='eye' color={Colors.primaryColor} size={20} onPress={() => setVisiblePass(!visiblePass)} /> : <Icon name='eye-slash' color={Colors.primaryColor} size={20} onPress={() => setVisiblePass(!visiblePass)} />}
//                         onChangeText={onPasswordChange}
//                         value={password}
//                         errorStyle={{ color: 'red' }}
//                         errorMessage={errorPass}
//                         onBlur={() => password.length < 5 ? setErrorPass('Enter Proper Password') : setErrorPass('')}
//                     />

//                     <Text style={{ textAlign: 'right', marginRight: wp('3%'), color: '#1565C0', fontFamily: 'FiraSans-Regular' }}>Forgot Password ?</Text>

//                     <CheckBox
//                         title='Remember Username'
//                         checked={rememberUsername}
//                         onPress={() => actionsFromRedux({ type: REMEMBER_USER, payload: !rememberUsername })}
//                         textStyle={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', fontWeight: 'normal' }}
//                         containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
//                         checkedColor={Colors.primaryColor}
//                         activeOpacity={.5}
//                         size={30}
//                         uncheckedColor={Colors.primaryColor}
//                     />

//                     <CheckBox
//                         title='Enable Touch ID'
//                         checked={enableTouchID}
//                         onPress={() => actionsFromRedux({ type: TOUCH_ID, payload: !enableTouchID })}
//                         textStyle={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', fontWeight: 'normal' }}
//                         containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
//                         checkedColor={Colors.primaryColor}
//                         activeOpacity={.5}
//                         size={30}
//                         uncheckedColor={Colors.primaryColor}
//                     />

//                     <Button
//                         title={title}
//                         titleStyle={{ color: 'white', fontFamily: 'FiraSans-Medium' }}
//                         buttonStyle={{ backgroundColor: Colors.primaryColor, padding: '3.2%', borderRadius: 5, marginHorizontal: wp('2.5%'), marginBottom: hp('2%') }}
//                         onPress={onSignIn}
//                     />

//                 </View>

//                 <View style={styles.bottomScrollView}>
//                     <Text style={{ fontFamily: 'FiraSans-SemiBold' }}>New User? <Text style={{ textDecorationLine: 'underline', color: '#1565C0' }} onPress={() => props.navigation.navigate('Signup')}>Create an account</Text></Text>
//                 </View>

//             </ScrollView>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     bottomScrollView: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: hp('3%'),
//     },
//     login: {
//         color: 'white',
//         fontSize: wp('7.5%'),
//         textAlign: 'center',
//         marginTop: hp('1%'),
//         fontFamily: 'FiraSans-Medium'
//     },
//     screen: {
//         paddingTop: useSafeAreaInsets.top,
//         paddingBottom: useSafeAreaInsets.bottom,
//         flex: 1,
//         minHeight: '100%',
//         backgroundColor: 'white'
//     },
//     mainImg: {
//         width: '100%',
//         height: Dimensions.get('window').height / 2,
//         resizeMode: 'stretch',
//     },
//     logo: {
//         width: '60%',
//         height: Dimensions.get('window').height / 9.2,
//         resizeMode: 'contain',
//         marginHorizontal: wp('20%'),
//         marginTop: hp('4%'),
//     },
// });

// export default SigninScreen;

import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SignupCard from '../../components/SignupCard';
import {Colors} from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  EMAIL_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  PASSWORD_CHANGED,
  REMEMBER_USER,
  TOUCH_ID,
} from '../actions/types';
import firebase from 'firebase';
import {ActivityIndicator} from 'react-native';
import {Alert} from 'react-native';
import {
  onPasswordChanged,
  onSiginEmailChanged,
  onSignin,
  onUserNameChanged,
} from '../actions/AuthAction';
import validator from 'validator';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const SigninScreen = (props) => {
  const [visiblePass, setVisiblePass] = useState(true);
  const [title, setTitle] = useState('SIGN IN');
  const [errorUserName, setErrorUserName] = useState('');
  const [errorPass, setErrorPass] = useState('');
  let regex = /^([A-Za-z0-9]{1,}\.?[A-Za-z0-9]{1,})\@([a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{1,})$/g;

  const dataFromReduxStore = useSelector((state) => state.signin);
  const {email, password, rememberUsername, enableTouchID} = dataFromReduxStore;

  const actionsFromRedux = useDispatch();

  const onEmailChange = (val) => {
    actionsFromRedux(onSiginEmailChanged(val));
  };

  const onPasswordChange = (pass) => {
    actionsFromRedux(onPasswordChanged(pass));
  };

  const onSignIn = async () => {
    setTitle(<ActivityIndicator size="large" color="white" />);

    if (validator.isEmail(email) && password.length > 4) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          AsyncStorage.setItem('user', JSON.stringify(res.user))
            .then((resUser) => {
              actionsFromRedux(onSignin(res.user));
              setTitle('SIGN IN');

              // console.log(res.stsTokenManager)

              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'OnWardsFlow'}],
                }),
              );
            })
            .catch((err) => console.log(err));

          // console.log(res.user)
        })
        .catch((err) => {
          Alert.alert('Invalid Credentials', 'Enter Proper Credentials');
          setTitle('SIGN IN');
          actionsFromRedux({type: LOGIN_USER_FAIL});
        });
    } else {
      if (email.length < 6) {
        if (password.length < 5) {
          setErrorPass('Enter Proper Password');
        }
        setErrorUserName('Enter Proper Email ID');
      }
      Alert.alert('Invalid Credentials', 'Enter Proper Credentials');
      setTitle('SIGN IN');
      actionsFromRedux({type: LOGIN_USER_FAIL});
    }
  };

  const email_ref = useRef();
  const pass_ref = useRef();

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../assets/signin_background.png')}
        style={styles.mainImg}>
        <Image
          source={require('../../assets/sami_aid_logoWhite.png')}
          style={styles.logo}
        />

        <Text style={styles.login}>LOGIN</Text>
      </ImageBackground>
      <ScrollView
        style={{marginTop: hp('-17%'), borderRadius: 7, marginBottom: hp('1%')}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            elevation: 5,
            backgroundColor: 'white',
            marginHorizontal: wp('4%'),
            paddingTop: hp('1.5%'),
            borderRadius: 10,
          }}>
          <Animatable.View animation="slideInDown" duration={4000}>
            <SignupCard
              ref={email_ref}
              returnKeyType={'next'}
              onSubmitEditing={() => pass_ref.current.focus()}
              label={'Username'}
              title="Username"
              placeholder="Enter Email"
              // autoFocus={true}
              // returnKeyType={"next"}
              // onSubmitEditing={() => ref_input2.current.focus()}
              value={email}
              onChangeText={onEmailChange}
              errorStyle={{color: 'red'}}
              errorMessage={errorUserName}
              onBlur={() =>
                validator.isEmail(email)
                  ? setErrorUserName('')
                  : setErrorUserName('Enter Proper Email ID')
              }
            />

            <SignupCard
              ref={pass_ref}
              returnKeyType={'done'}
              label={'Password'}
              title="Password"
              placeholder="Enter Password"
              secureTextEntry={visiblePass}
              rightIcon={
                visiblePass ? (
                  <Icon
                    name="eye"
                    color={Colors.primaryColor}
                    size={20}
                    onPress={() => setVisiblePass(!visiblePass)}
                  />
                ) : (
                  <Icon
                    name="eye-slash"
                    color={Colors.primaryColor}
                    size={20}
                    onPress={() => setVisiblePass(!visiblePass)}
                  />
                )
              }
              onChangeText={onPasswordChange}
              value={password}
              errorStyle={{color: 'red'}}
              errorMessage={errorPass}
              onBlur={() =>
                password.length < 5
                  ? setErrorPass('Enter Proper Password')
                  : setErrorPass('')
              }
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Forget')}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: wp('3%'),
                  color: '#1565C0',
                  fontFamily: 'FiraSans-Regular',
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            <CheckBox
              title="Remember Username"
              checked={rememberUsername}
              onPress={() =>
                actionsFromRedux({
                  type: REMEMBER_USER,
                  payload: !rememberUsername,
                })
              }
              textStyle={{
                color: Colors.primaryColor,
                fontSize: 16,
                fontFamily: 'FiraSans-Regular',
                fontWeight: 'normal',
              }}
              containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
              checkedColor={Colors.primaryColor}
              activeOpacity={0.5}
              size={30}
              uncheckedColor={Colors.primaryColor}
            />

            <CheckBox
              title="Enable Touch ID"
              checked={enableTouchID}
              onPress={() =>
                actionsFromRedux({type: TOUCH_ID, payload: !enableTouchID})
              }
              textStyle={{
                color: Colors.primaryColor,
                fontSize: 16,
                fontFamily: 'FiraSans-Regular',
                fontWeight: 'normal',
              }}
              containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
              checkedColor={Colors.primaryColor}
              activeOpacity={0.5}
              size={30}
              uncheckedColor={Colors.primaryColor}
            />

            <Button
              title={title}
              titleStyle={{color: 'white', fontFamily: 'FiraSans-Medium'}}
              buttonStyle={{
                backgroundColor: Colors.primaryColor,
                padding: '3.2%',
                borderRadius: 5,
                marginHorizontal: wp('2.5%'),
                marginBottom: hp('2%'),
              }}
              onPress={onSignIn}
            />
          </Animatable.View>
        </View>

        <View style={styles.bottomScrollView}>
          <Text style={{fontFamily: 'FiraSans-SemiBold'}}>
            New User?{' '}
            <Text
              style={{textDecorationLine: 'underline', color: '#1565C0'}}
              onPress={() => props.navigation.navigate('Signup')}>
              Create an account
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  login: {
    color: 'white',
    fontSize: wp('7.5%'),
    textAlign: 'center',
    marginTop: hp('4%'),
    fontFamily: 'FiraSans-Medium',
  },
  screen: {
    paddingTop: useSafeAreaInsets.top,
    paddingBottom: useSafeAreaInsets.bottom,
    flex: 1,
    minHeight: '100%',
    backgroundColor: 'white',
  },
  mainImg: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    resizeMode: 'stretch',
  },
  logo: {
    width: '70%',
    height: Dimensions.get('window').height / 9.2,
    resizeMode: 'contain',
    marginHorizontal: wp('15%'),
    marginTop: hp('10%'),
  },
});

export default SigninScreen;
