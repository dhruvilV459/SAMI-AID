// import React, { useRef, useState } from 'react';
// import { Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import EmptySelectBox from '../../components/EmptySelectBox';
// import SignupCard from '../../components/SignupCard';
// import { Colors } from '../../Constants/Colors';
// import { data, gender as gen, language, marital as marry, security } from '../../dummy/StateData';
// import DateTimePicker from '@react-native-community/datetimepicker'
// import { Button } from 'react-native-elements';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { onAddressChanged, onCellChanged, onCityChanged, onDobChanged, onFirstNameChanged, onGenderChanged, onLanguageChanged, onLastChanged, onMaritalChanged, onPasswordChanged, onSecurityAnswerChanged, onSecurityQuestionChanged, onSignup, onStateChanged, onSigupEmailChanged, onZipCodeChanged } from '../actions/AuthAction';
// import { isEmpty } from 'lodash';
// import validator from 'validator'
// import firebase from 'firebase'
// import { ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { CommonActions } from '@react-navigation/routers';

// const SignupScreen = (props) => {
//     const [date, setDate] = useState(new Date());
//     const [visiblePass, setVisiblePass] = useState(true)
//     const [confVisiblePass, setConfVisiblePass] = useState(true)
//     const [mode, setMode] = useState('date');
//     const [title, setTitle] = useState('SIGN UP')
//     const [show, setShow] = useState(false);
//     const [selectedData, setSelectedData] = useState('')
//     const [confirmPass, setConfirmPass] = useState('')
//     const [errFirstName, setErrFirstName] = useState('')
//     const [errLastName, setErrLastName] = useState('')
//     const [errEmail, setErrEmail] = useState('')
//     const [errPass, setErrPass] = useState('')
//     const [errConfPass, setErrConfPass] = useState('')
//     const [errAdd, setErrAdd] = useState('')
//     const [errCity, setErrCity] = useState('')
//     const [errState, setErrState] = useState(false)
//     const [errZip, setErrZip] = useState('')
//     const [errGender, setErrGender] = useState('')
//     const [errSecurityQues, setErrSecurityQues] = useState('')
//     const [errSecAns, setErrSecAns] = useState('')
//     const [errLang, setErrLang] = useState('')
//     const [errMarital, setErrMarital] = useState('')
//     const [errDob, setErrDob] = useState(false)
//     const [errCellPhn, setErrCellPhn] = useState('')
//     const [formIsValid, setFormIsValid] = useState(false);

//     React.useEffect(() => {
//         const unsubscribe = props.navigation.addListener('focus', () => {
//             setErrFirstName('')
//             setErrLastName('')
//             setErrEmail('')
//             setErrPass('')
//             setErrConfPass('')
//             setErrAdd('')
//             setErrCity('')
//             setErrState(false)
//             setErrZip('')
//             setErrGender('')
//             setErrSecurityQues('')
//             setErrSecAns('')
//             setErrLang('')
//             setErrMarital('')
//             setErrDob(false)
//             setErrCellPhn('')
//             console.log('jeeet is focusedsas')
//         })

//     }, [])

//     let regex = /^([A-Za-z0-9]{1,}\.?[A-Za-z0-9]{1,})\@([a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{ 1,}\.?[a-z0-9A-Z]{ 1,})$/g
//     const dataFromReduxStore = useSelector(state => state.signup)
//     const { first_name, last_name, email, password, address, city, zipcode, security_answer, cell_phn, gender, lang, marital, dob, stateName, security_question } = dataFromReduxStore

//     const actionFromReduxActions = useDispatch()

//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//         setSelectedData(moment(currentDate).format('MM-DD-YYYY'))
//         actionFromReduxActions(onDobChanged(moment(currentDate).format('MM-DD-YYYY')))
//     };

//     const showDatepicker = () => {
//         setShow(true);
//         setMode('date');
//     };

//     const formChangeHandler = () => {
//         if (first_name && last_name && validator.isEmail(email) && (password.length > 8) && address && city && (zipcode.length === 5) && security_answer && (cell_phn.length === 10)) {
//             setTitle(<ActivityIndicator size='large' color='white' />)
//             setFormIsValid(true);
//             firebase.auth().createUserWithEmailAndPassword(email, password)
//                 .then((res) => {
//                     // console.log(res.user)'
//                     const { currentUser } = firebase.auth()
//                     firebase.database().ref(`/user/${currentUser.uid}/userDetails/`)
//                         .push({
//                             firstName: first_name,
//                             lastName: last_name,
//                             email: email,
//                             address,
//                             city,
//                             state: stateName,
//                             zipcode,
//                             gender,
//                             security_question,
//                             security_answer,
//                             lang,
//                             maritalStatus: marital,
//                             dob,
//                             cellPhn: cell_phn
//                         })
//                         .then(() => {
//                             actionFromReduxActions(onSignup(res.user))
//                             SignUpUser()
//                         })

//                 })
//                 .catch(err => Alert.alert('Signup UnSuccessful', 'User Already Exist!!'))

//         }
//         else {
//             setFormIsValid(false)
//             if (!first_name) {
//                 setErrFirstName('First Name Is A Required Field')
//             }
//             if (!last_name) {
//                 setErrLastName('Last Name Is A Required Field')
//             }
//             if (!validator.isEmail(email)) {
//                 setErrEmail('Enter Proper Email Address')
//             }
//             if (password.length < 8) {
//                 setErrPass('Password Must be 8 characters long & must contain UpperCase, LowerCase & Numbers ')
//             }
//             if ((isEmpty(password) && isEmpty(confirmPass))) {
//                 setErrConfPass('Password Does Not Match')
//             }
//             if (address.length < 1) {
//                 setErrAdd('Address Is A Required Field')
//             }
//             if (city.length < 3) {
//                 setErrCity('Enter Proper City Name')
//             }
//             if (!stateName) {
//                 setErrState(true)
//             }
//             if (!zipcode) {
//                 setErrZip('Invalid Zipcode')
//             }
//             if (!gender) {
//                 setErrGender(true)
//             }
//             if (!security_question) {
//                 setErrSecurityQues(true)
//             }
//             if (!security_answer) {
//                 setErrSecAns('Enter Proper Answer')
//             }
//             if (!lang) {
//                 setErrLang(true)
//             }
//             if (!marital) {
//                 setErrMarital(true)
//             }
//             if (!cell_phn) {
//                 setErrCellPhn('Cell Phone Must Be of 10 Digits')
//             }
//             if (!dob) {
//                 setErrDob(true)
//             }
//             Alert.alert('Sign Up Not Done', 'Enter All Values')
//         }

//     }

//     const SignUpUser = () => {
//         // Alert.alert('Signup Done', 'Successfully Signed Up..')
//         props.navigation.dispatch(
//             CommonActions.reset({
//                 index: 1,
//                 routes: [{ name: 'Dashboard' }]
//             })
//         )

//     }

//     const lastNameRef = useRef()
//     const firstNameRef = useRef()
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const confPassRef = useRef()
//     const addRef = useRef()
//     const cityRef = useRef()
//     const stateRef = useRef()
//     const zipRef = useRef()
//     const genRef = useRef()
//     const secQuesRef = useRef()
//     const secAnsRef = useRef()
//     const langRef = useRef()
//     const maritalRef = useRef()
//     const cellRef = useRef()
//     const signupRef = useRef()

//     return (

//         <View style={styles.screen}>
//             <ImageBackground
//                 source={require('../../assets/signin_background.png')}
//                 style={styles.mainImg}
//             >
//                 <Image
//                     source={require('../../assets/sami_aid_logoWhite.png')}
//                     style={styles.logo}
//                 />

//                 <Text style={styles.signup}>SIGN UP</Text>

//             </ImageBackground>
//             <ScrollView style={{ marginTop: hp('-27%'), marginBottom: hp('5%'), backgroundColor: 'transparent' }} showsVerticalScrollIndicator={false}>

//                 <ScrollView showsVerticalScrollIndicator={false} style={{ elevation: 5, backgroundColor: 'white', marginHorizontal: wp('6.5%'), paddingTop: hp('1.5%'), paddingBottom: hp('1%') }}>

//                     <SignupCard
//                         ref={firstNameRef}
//                         label='First Name'
//                         placeholder='Enter First Name'
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => lastNameRef.current.focus()}
//                         value={first_name}
//                         onChangeText={(val) => actionFromReduxActions(onFirstNameChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errFirstName}
//                         onBlur={() => first_name.length < 1 ? setErrFirstName('First Name Is A Required Field') : setErrFirstName('')}
//                     />

//                     <SignupCard
//                         ref={lastNameRef}
//                         label='Last Name'
//                         placeholder='Enter Last Name'
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => emailRef.current.focus()}
//                         value={last_name}
//                         onChangeText={(val) => actionFromReduxActions(onLastChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errLastName}
//                         onBlur={() => last_name.length < 1 ? setErrLastName('Last Name Is A Required Field') : setErrLastName('')}
//                     />

//                     <SignupCard
//                         ref={emailRef}
//                         label='Email'
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => passwordRef.current.focus()}
//                         placeholder='Enter Email'
//                         keyboardType={'email-address'}
//                         value={email}
//                         onChangeText={(val) => actionFromReduxActions(onSigupEmailChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errEmail}
//                         onBlur={() => validator.isEmail(email) ? setErrEmail('') : setErrEmail('Enter Proper Email Address')}
//                     />

//                     <SignupCard
//                         ref={passwordRef}
//                         label='Password'
//                         placeholder='Enter Password'
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => confPassRef.current.focus()}
//                         secureTextEntry={visiblePass}
//                         rightIcon={visiblePass ? <Icon name='eye' color={Colors.primaryColor} size={20} onPress={() => setVisiblePass(!visiblePass)} /> : <Icon name='eye-slash' color={Colors.primaryColor} size={20} onPress={() => setVisiblePass(!visiblePass)} />}
//                         value={password}
//                         onChangeText={(val) => actionFromReduxActions(onPasswordChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errPass}
//                         onBlur={() => password.length < 8 ? setErrPass('Password Must be 8 characters long & must contain UpperCase, LowerCase & Numbers ') : setErrPass('')}
//                     />

//                     <SignupCard
//                         ref={confPassRef}
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => addRef.current.focus()}
//                         label='Confirm Password'
//                         placeholder='Enter Confirm Password'
//                         secureTextEntry={confVisiblePass}
//                         rightIcon={confVisiblePass ? <Icon name='eye' color={Colors.primaryColor} size={20} onPress={() => setConfVisiblePass(!confVisiblePass)} /> : <Icon name='eye-slash' color={Colors.primaryColor} size={20} onPress={() => setConfVisiblePass(!confVisiblePass)} />}
//                         value={confirmPass}
//                         onChangeText={(val) => setConfirmPass(val)}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errConfPass}
//                         onBlur={() => confirmPass === password ? setErrConfPass('') : setErrConfPass('Password Does Not Match')}
//                     />

//                     <SignupCard
//                         ref={addRef}
//                         returnKeyType={"next"}
//                         onSubmitEditing={() => cityRef.current.focus()}
//                         label='Address'
//                         placeholder='Enter Address'
//                         value={address}
//                         onChangeText={(val) => actionFromReduxActions(onAddressChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errAdd}
//                         onBlur={() => address.length < 1 ? setErrAdd('Address Is A Required Field') : setErrAdd('')}
//                     />

//                     <SignupCard
//                         ref={cityRef}
//                         returnKeyType={"next"}
//                         label='City'
//                         placeholder='Enter City'
//                         value={city}
//                         onChangeText={(val) => actionFromReduxActions(onCityChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errCity}
//                         onBlur={() => city.length < 3 ? setErrCity('Enter Proper City Name') : setErrCity('')}
//                     />

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, marginHorizontal: wp('2.5%'), backgroundColor: 'white', fontFamily: 'FiraSans-Regular' }}>State</Text>

//                     <EmptySelectBox
//                         ref={stateRef}
//                         values={data}
//                         onChange={(val) => {
//                             actionFromReduxActions(onStateChanged(val))
//                             setErrState(false)
//                         }}
//                         displayError={(val) => {
//                             !val ? setErrState(true) : setErrState(false)
//                         }}
//                     />
//                     {errState ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Proper State</Text> : null}

//                     <SignupCard
//                         ref={zipRef}
//                         returnKeyType={"next"}
//                         label='ZipCode'
//                         placeholder='Enter Zipcode'
//                         keyboardType={'number-pad'}
//                         value={zipcode}
//                         maxLength={5}
//                         onChangeText={(val) => actionFromReduxActions(onZipCodeChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errZip}
//                         onBlur={() => zipcode.length === 5 ? setErrZip('') : setErrZip('Invalid Zipcode')}
//                     />

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', marginHorizontal: wp('2.5%'), backgroundColor: 'white' }}>Gender</Text>

//                     <EmptySelectBox
//                         ref={genRef}
//                         values={gen}
//                         onChange={(val) => {
//                             actionFromReduxActions(onGenderChanged(val))
//                             setErrGender(false)
//                         }}
//                         displayError={(val) => {
//                             !val ? setErrGender(true) : setErrGender(false)
//                         }}
//                     />
//                     {errGender ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Proper Gender</Text> : null}

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', marginHorizontal: wp('2.5%'), backgroundColor: 'white' }}>Security Question</Text>

//                     <EmptySelectBox
//                         ref={secQuesRef}
//                         values={security}
//                         onChange={(val) => {
//                             actionFromReduxActions(onSecurityQuestionChanged(val))
//                             setErrSecurityQues(false)
//                             secAnsRef.current.focus()
//                         }}
//                         displayError={(val) => {
//                             !val ? setErrSecurityQues(true) : setErrSecurityQues(false)
//                         }}
//                     />
//                     {errSecurityQues ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Proper Security Question</Text> : null}

//                     <SignupCard
//                         ref={secAnsRef}
//                         label='Answer'
//                         returnKeyType={'next'}
//                         placeholder='Enter Answer'
//                         value={security_answer}
//                         onChangeText={(val) => actionFromReduxActions(onSecurityAnswerChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errSecAns}
//                         onBlur={() => security_answer.length < 1 ? setErrSecAns('Enter Proper Answer') : setErrSecAns('')}
//                     />

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', marginHorizontal: wp('2.5%'), backgroundColor: 'white' }}>Language</Text>

//                     <EmptySelectBox
//                         ref={langRef}
//                         values={language}
//                         onChange={(val) => {
//                             actionFromReduxActions(onLanguageChanged(val))
//                             setErrLang(false)
//                         }}
//                         displayError={(val) => !val ? setErrLang(true) : setErrLang(false)}
//                     />
//                     {errLang ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Proper Language</Text> : null}

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', marginHorizontal: wp('2.5%'), backgroundColor: 'white' }}>Marital Status</Text>

//                     <EmptySelectBox
//                         ref={maritalRef}
//                         values={marry}
//                         onChange={(val) => {
//                             actionFromReduxActions(onMaritalChanged(val))
//                             setErrMarital(false)
//                         }}
//                         displayError={(val) => !val ? setErrMarital(true) : setErrMarital(false)}
//                     />
//                     {errMarital ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Proper Marital Status</Text> : null}

//                     <Text style={{ color: Colors.primaryColor, fontSize: 16, fontFamily: 'FiraSans-Regular', marginHorizontal: wp('2.5%'), backgroundColor: 'white' }}>Date of Birth</Text>

//                     <TouchableOpacity onPress={showDatepicker} style={{ backgroundColor: 'white', }}>
//                         <View style={styles.dummy1}>
//                             <Text numberOfLines={1} style={{ color: Colors.primaryColor, width: '95%', fontSize: 16, backgroundColor: 'white', }}>{selectedData}</Text>
//                             <AntDesign name='down' size={20} style={{ justifyContent: 'center', alignSelf: 'center' }} color={Colors.primaryColor} />
//                         </View>
//                     </TouchableOpacity>

//                     {show && (
//                         <DateTimePicker
//                             value={date}
//                             mode={mode}
//                             display="default"
//                             onChange={onChange}
//                         />
//                     )}

//                     {errDob && !selectedData ? <Text style={{ marginTop: hp('-2%'), fontSize: 12, fontFamily: 'FiraSans-Regular', marginLeft: wp('4%'), color: 'red', marginBottom: hp('1%') }}>Select Date of Birth</Text> : null}

//                     <SignupCard
//                         ref={cellRef}
//                         returnKeyType={'done'}
//                         onSubmitEditing={() => formChangeHandler()}
//                         label='Cell Phone'
//                         placeholder='Cell Phone'
//                         keyboardType={'number-pad'}
//                         value={cell_phn}
//                         maxLength={10}
//                         onChangeText={(val) => actionFromReduxActions(onCellChanged(val))}
//                         errorStyle={{ color: 'red', fontFamily: 'FiraSans-Regular' }}
//                         errorMessage={errCellPhn}
//                         onBlur={() => cell_phn.length === 10 ? setErrCellPhn('') : setErrCellPhn('Cell Phone Must Be of 10 Digits')}
//                     />

//                     <Button
//                         ref={signupRef}
//                         title={title}
//                         titleStyle={{ color: 'white', fontFamily: 'FiraSans-Medium' }}
//                         buttonStyle={{ backgroundColor: Colors.primaryColor, padding: '3.2%', borderRadius: 5, marginHorizontal: wp('5%'), marginVertical: hp('1%') }}
//                         onPress={formChangeHandler}
//                     />

//                 </ScrollView>

//                 <View style={styles.bottomScrollView}>
//                     <Text style={{ fontFamily: 'FiraSans-SemiBold' }}>Existing User? <Text style={{ textDecorationLine: 'underline', color: '#1565C0' }} onPress={() => props.navigation.navigate('Signin')}>Sign In</Text></Text>
//                 </View>

//             </ScrollView>

//         </View >
//     );
// }

// const styles = StyleSheet.create({
//     bottomScrollView: {
//         // marginBottom: hp('7%'),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: hp('3%'),
//     },
//     signup: {
//         color: 'white',
//         fontSize: wp('7.5%'),
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: hp('1%'),
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
//     dummy1: {
//         borderColor: Colors.primaryColor,
//         borderWidth: 1,
//         borderRadius: 7,
//         padding: '4%',
//         marginTop: '3%',
//         flexDirection: 'row',
//         marginBottom: hp('2.8%'),
//         marginHorizontal: wp('2.5%')
//     }
// });

// export default SignupScreen;
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptySelectBox from '../../components/EmptySelectBox';
import SignupCard from '../../components/SignupCard';
import {Colors} from '../../Constants/Colors';
import {
  data,
  gender as gen,
  language,
  marital as marry,
  security,
} from '../../dummy/StateData';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  onAddressChanged,
  onCellChanged,
  onCityChanged,
  onDobChanged,
  onFirstNameChanged,
  onGenderChanged,
  onLanguageChanged,
  onLastChanged,
  onMaritalChanged,
  onPasswordChanged,
  onSecurityAnswerChanged,
  onSecurityQuestionChanged,
  onSignup,
  onStateChanged,
  onSigupEmailChanged,
  onZipCodeChanged,
} from '../actions/AuthAction';
import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import validator from 'validator';
import firebase from 'firebase';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CommonActions} from '@react-navigation/routers';
import * as Animatable from 'react-native-animatable';

const SignupScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [visiblePass, setVisiblePass] = useState(true);
  const [confVisiblePass, setConfVisiblePass] = useState(true);
  const [mode, setMode] = useState('date');
  const [title, setTitle] = useState('SIGN UP');
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errFirstName, setErrFirstName] = useState('');
  const [errLastName, setErrLastName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPass, setErrPass] = useState('');
  const [errConfPass, setErrConfPass] = useState('');
  const [errAdd, setErrAdd] = useState('');
  const [errCity, setErrCity] = useState('');
  const [errState, setErrState] = useState(false);
  const [errZip, setErrZip] = useState('');
  const [errGender, setErrGender] = useState('');
  const [errSecurityQues, setErrSecurityQues] = useState('');
  const [errSecAns, setErrSecAns] = useState('');
  const [errLang, setErrLang] = useState('');
  const [errMarital, setErrMarital] = useState('');
  const [errDob, setErrDob] = useState(false);
  const [errCellPhn, setErrCellPhn] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setErrFirstName('');
      setErrLastName('');
      setErrEmail('');
      setErrPass('');
      setErrConfPass('');
      setErrAdd('');
      setErrCity('');
      setErrState(false);
      setErrZip('');
      setErrGender('');
      setErrSecurityQues('');
      setErrSecAns('');
      setErrLang('');
      setErrMarital('');
      setErrDob(false);
      setErrCellPhn('');
      console.log('u r in signupForm');
    });
  }, []);

  let regex = /^([A-Za-z0-9]{1,}\.?[A-Za-z0-9]{1,})\@([a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{ 1,}\.?[a-z0-9A-Z]{ 1,})$/g;
  const dataFromReduxStore = useSelector((state) => state.signup);
  const {
    first_name,
    last_name,
    email,
    password,
    address,
    city,
    zipcode,
    security_answer,
    cell_phn,
    gender,
    lang,
    marital,
    dob,
    stateName,
    security_question,
  } = dataFromReduxStore;

  const actionFromReduxActions = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedData(moment(currentDate).format('MM-DD-YYYY'));
    actionFromReduxActions(
      onDobChanged(moment(currentDate).format('MM-DD-YYYY')),
    );
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const formChangeHandler = () => {
    if (
      first_name &&
      last_name &&
      validator.isEmail(email) &&
      password.length > 8 &&
      address &&
      city &&
      zipcode.length === 5 &&
      security_answer &&
      cell_phn.length === 10
    ) {
      setTitle(<ActivityIndicator size="large" color="white" />);
      setFormIsValid(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // console.log(res.user)'
          const {currentUser} = firebase.auth();
          firebase
            .database()
            .ref(`/user/${currentUser.uid}/userDetails/`)
            .push({
              firstName: first_name,
              lastName: last_name,
              email: email,
              address,
              city,
              state: stateName,
              zipcode,
              gender,
              security_question,
              security_answer,
              lang,
              maritalStatus: marital,
              dob,
              cellPhn: cell_phn,
            })
            .then(() => {
              actionFromReduxActions(onSignup(res.user));
              SignUpUser();
            });
        })
        .catch((err) =>
          Alert.alert('Signup UnSuccessful', 'User Already Exist!!'),
        );
    } else {
      setFormIsValid(false);
      if (!first_name) {
        setErrFirstName('First Name Is A Required Field');
      }
      if (!last_name) {
        setErrLastName('Last Name Is A Required Field');
      }
      if (!validator.isEmail(email)) {
        setErrEmail('Enter Proper Email Address');
      }
      if (password.length < 8) {
        setErrPass(
          'Password Must be 8 characters long & must contain UpperCase, LowerCase & Numbers ',
        );
      }
      if (isEmpty(password) && isEmpty(confirmPass)) {
        setErrConfPass('Password Does Not Match');
      }
      if (address.length < 1) {
        setErrAdd('Address Is A Required Field');
      }
      if (city.length < 3) {
        setErrCity('Enter Proper City Name');
      }
      if (!stateName) {
        setErrState(true);
      }
      if (!zipcode) {
        setErrZip('Invalid Zipcode');
      }
      if (!gender) {
        setErrGender(true);
      }
      if (!security_question) {
        setErrSecurityQues(true);
      }
      if (!security_answer) {
        setErrSecAns('Enter Proper Answer');
      }
      if (!lang) {
        setErrLang(true);
      }
      if (!marital) {
        setErrMarital(true);
      }
      if (!cell_phn) {
        setErrCellPhn('Cell Phone Must Be of 10 Digits');
      }
      if (!dob) {
        setErrDob(true);
      }
      Alert.alert('Sign Up Not Done', 'Enter All Values');
    }
  };

  const SignUpUser = () => {
    // Alert.alert('Signup Done', 'Successfully Signed Up..')
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Dashboard'}],
      }),
    );
  };

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPassRef = useRef();
  const addRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const genRef = useRef();
  const secQuesRef = useRef();
  const secAnsRef = useRef();
  const langRef = useRef();
  const maritalRef = useRef();
  const cellRef = useRef();
  const signupRef = useRef();

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../assets/signin_background.png')}
        style={styles.mainImg}>
        <Image
          source={require('../../assets/sami_aid_logoWhite.png')}
          style={styles.logo}
        />

        <Text style={styles.signup}>SIGN UP</Text>
      </ImageBackground>
      <ScrollView
        style={{
          marginTop: hp('-27%'),
          marginBottom: hp('5%'),
          backgroundColor: 'transparent',
        }}
        showsVerticalScrollIndicator={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            elevation: 5,
            backgroundColor: 'white',
            marginHorizontal: wp('6.5%'),
            paddingTop: hp('1.5%'),
            paddingBottom: hp('1%'),
            borderRadius: 10,
          }}>
          <Animatable.View animation="lightSpeedIn" duration={1000}>
            <Animatable.View animation="slideInDown" duration={4000}>
              <SignupCard
                ref={firstNameRef}
                label="First Name"
                placeholder="Enter First Name"
                returnKeyType={'next'}
                onSubmitEditing={() => lastNameRef.current.focus()}
                value={first_name}
                onChangeText={(val) =>
                  actionFromReduxActions(onFirstNameChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errFirstName}
                onBlur={() =>
                  first_name.length < 1
                    ? setErrFirstName('First Name Is A Required Field')
                    : setErrFirstName('')
                }
              />

              <SignupCard
                ref={lastNameRef}
                label="Last Name"
                placeholder="Enter Last Name"
                returnKeyType={'next'}
                onSubmitEditing={() => emailRef.current.focus()}
                value={last_name}
                onChangeText={(val) =>
                  actionFromReduxActions(onLastChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errLastName}
                onBlur={() =>
                  last_name.length < 1
                    ? setErrLastName('Last Name Is A Required Field')
                    : setErrLastName('')
                }
              />

              <SignupCard
                ref={emailRef}
                label="Email"
                returnKeyType={'next'}
                onSubmitEditing={() => passwordRef.current.focus()}
                placeholder="Enter Email"
                keyboardType={'email-address'}
                value={email}
                onChangeText={(val) =>
                  actionFromReduxActions(onSigupEmailChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errEmail}
                onBlur={() =>
                  validator.isEmail(email)
                    ? setErrEmail('')
                    : setErrEmail('Enter Proper Email Address')
                }
              />

              <SignupCard
                ref={passwordRef}
                label="Password"
                placeholder="Enter Password"
                returnKeyType={'next'}
                onSubmitEditing={() => confPassRef.current.focus()}
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
                value={password}
                onChangeText={(val) =>
                  actionFromReduxActions(onPasswordChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errPass}
                onBlur={() =>
                  password.length < 8
                    ? setErrPass(
                        'Password Must be 8 characters long & must contain UpperCase, LowerCase & Numbers ',
                      )
                    : setErrPass('')
                }
              />

              <SignupCard
                ref={confPassRef}
                returnKeyType={'next'}
                onSubmitEditing={() => addRef.current.focus()}
                label="Confirm Password"
                placeholder="Enter Confirm Password"
                secureTextEntry={confVisiblePass}
                rightIcon={
                  confVisiblePass ? (
                    <Icon
                      name="eye"
                      color={Colors.primaryColor}
                      size={20}
                      onPress={() => setConfVisiblePass(!confVisiblePass)}
                    />
                  ) : (
                    <Icon
                      name="eye-slash"
                      color={Colors.primaryColor}
                      size={20}
                      onPress={() => setConfVisiblePass(!confVisiblePass)}
                    />
                  )
                }
                value={confirmPass}
                onChangeText={(val) => setConfirmPass(val)}
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errConfPass}
                onBlur={() =>
                  confirmPass === password
                    ? setErrConfPass('')
                    : setErrConfPass('Password Does Not Match')
                }
              />

              <SignupCard
                ref={addRef}
                returnKeyType={'next'}
                onSubmitEditing={() => cityRef.current.focus()}
                label="Address"
                placeholder="Enter Address"
                value={address}
                onChangeText={(val) =>
                  actionFromReduxActions(onAddressChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errAdd}
                onBlur={() =>
                  address.length < 1
                    ? setErrAdd('Address Is A Required Field')
                    : setErrAdd('')
                }
              />

              <SignupCard
                ref={cityRef}
                returnKeyType={'next'}
                label="City"
                placeholder="Enter City"
                value={city}
                onChangeText={(val) =>
                  actionFromReduxActions(onCityChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errCity}
                onBlur={() =>
                  city.length < 3
                    ? setErrCity('Enter Proper City Name')
                    : setErrCity('')
                }
              />

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                  fontFamily: 'FiraSans-Regular',
                }}>
                State
              </Text>

              <EmptySelectBox
                ref={stateRef}
                values={data}
                onChange={(val) => {
                  actionFromReduxActions(onStateChanged(val));
                  setErrState(false);
                }}
                displayError={(val) => {
                  !val ? setErrState(true) : setErrState(false);
                }}
              />
              {errState ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Proper State
                </Text>
              ) : null}

              <SignupCard
                ref={zipRef}
                returnKeyType={'next'}
                label="ZipCode"
                placeholder="Enter Zipcode"
                keyboardType={'number-pad'}
                value={zipcode}
                maxLength={5}
                onChangeText={(val) =>
                  actionFromReduxActions(onZipCodeChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errZip}
                onBlur={() =>
                  zipcode.length === 5
                    ? setErrZip('')
                    : setErrZip('Invalid Zipcode')
                }
              />

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontFamily: 'FiraSans-Regular',
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                }}>
                Gender
              </Text>

              <EmptySelectBox
                ref={genRef}
                values={gen}
                onChange={(val) => {
                  actionFromReduxActions(onGenderChanged(val));
                  setErrGender(false);
                }}
                displayError={(val) => {
                  !val ? setErrGender(true) : setErrGender(false);
                }}
              />
              {errGender ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Proper Gender
                </Text>
              ) : null}

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontFamily: 'FiraSans-Regular',
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                }}>
                Security Question
              </Text>

              <EmptySelectBox
                ref={secQuesRef}
                values={security}
                onChange={(val) => {
                  actionFromReduxActions(onSecurityQuestionChanged(val));
                  setErrSecurityQues(false);
                  secAnsRef.current.focus();
                }}
                displayError={(val) => {
                  !val ? setErrSecurityQues(true) : setErrSecurityQues(false);
                }}
              />
              {errSecurityQues ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Proper Security Question
                </Text>
              ) : null}

              <SignupCard
                ref={secAnsRef}
                label="Answer"
                returnKeyType={'next'}
                placeholder="Enter Answer"
                value={security_answer}
                onChangeText={(val) =>
                  actionFromReduxActions(onSecurityAnswerChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errSecAns}
                onBlur={() =>
                  security_answer.length < 1
                    ? setErrSecAns('Enter Proper Answer')
                    : setErrSecAns('')
                }
              />

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontFamily: 'FiraSans-Regular',
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                }}>
                Language
              </Text>

              <EmptySelectBox
                ref={langRef}
                values={language}
                onChange={(val) => {
                  actionFromReduxActions(onLanguageChanged(val));
                  setErrLang(false);
                }}
                displayError={(val) =>
                  !val ? setErrLang(true) : setErrLang(false)
                }
              />
              {errLang ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Proper Language
                </Text>
              ) : null}

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontFamily: 'FiraSans-Regular',
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                }}>
                Marital Status
              </Text>

              <EmptySelectBox
                ref={maritalRef}
                values={marry}
                onChange={(val) => {
                  actionFromReduxActions(onMaritalChanged(val));
                  setErrMarital(false);
                }}
                displayError={(val) =>
                  !val ? setErrMarital(true) : setErrMarital(false)
                }
              />
              {errMarital ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Proper Marital Status
                </Text>
              ) : null}

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontFamily: 'FiraSans-Regular',
                  marginHorizontal: wp('2.5%'),
                  backgroundColor: 'white',
                }}>
                Date of Birth
              </Text>

              <TouchableOpacity
                onPress={showDatepicker}
                style={{backgroundColor: 'white'}}>
                <View style={styles.dummy1}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.primaryColor,
                      width: '95%',
                      fontSize: 16,
                      backgroundColor: 'white',
                    }}>
                    {selectedData}
                  </Text>
                  <AntDesign
                    name="down"
                    size={20}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                    color={Colors.primaryColor}
                  />
                </View>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}

              {errDob && !selectedData ? (
                <Text
                  style={{
                    marginTop: hp('-2%'),
                    fontSize: 12,
                    fontFamily: 'FiraSans-Regular',
                    marginLeft: wp('4%'),
                    color: 'red',
                    marginBottom: hp('1%'),
                  }}>
                  Select Date of Birth
                </Text>
              ) : null}

              <SignupCard
                ref={cellRef}
                returnKeyType={'done'}
                onSubmitEditing={() => formChangeHandler()}
                label="Cell Phone"
                placeholder="Cell Phone"
                keyboardType={'number-pad'}
                value={cell_phn}
                maxLength={10}
                onChangeText={(val) =>
                  actionFromReduxActions(onCellChanged(val))
                }
                errorStyle={{color: 'red', fontFamily: 'FiraSans-Regular'}}
                errorMessage={errCellPhn}
                onBlur={() =>
                  cell_phn.length === 10
                    ? setErrCellPhn('')
                    : setErrCellPhn('Cell Phone Must Be of 10 Digits')
                }
              />

              <Button
                ref={signupRef}
                title={title}
                titleStyle={{color: 'white', fontFamily: 'FiraSans-Medium'}}
                buttonStyle={{
                  backgroundColor: Colors.primaryColor,
                  padding: '3.2%',
                  borderRadius: 5,
                  marginHorizontal: wp('5%'),
                  marginVertical: hp('1%'),
                }}
                onPress={formChangeHandler}
              />
            </Animatable.View>
          </Animatable.View>
        </ScrollView>

        <View style={styles.bottomScrollView}>
          <Text style={{fontFamily: 'FiraSans-SemiBold'}}>
            Existing User?{' '}
            <Text
              style={{textDecorationLine: 'underline', color: '#1565C0'}}
              onPress={() => props.navigation.navigate('Signin')}>
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomScrollView: {
    // marginBottom: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  signup: {
    color: 'white',
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('1%'),
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
    width: '60%',
    height: Dimensions.get('window').height / 9.2,
    resizeMode: 'contain',
    marginHorizontal: wp('20%'),
    marginTop: hp('4%'),
  },
  dummy1: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 7,
    padding: '4%',
    marginTop: '3%',
    flexDirection: 'row',
    marginBottom: hp('2.8%'),
    marginHorizontal: wp('2.5%'),
  },
});

export default SignupScreen;
