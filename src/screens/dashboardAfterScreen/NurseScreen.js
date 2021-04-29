import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Colors} from '../../../Constants/Colors';
import {
  checkboxDetails,
  diffCat,
  diseaseDetails,
  patient,
  patientFeel,
} from '../../../dummy/StateData';
import {Button, ButtonGroup, CheckBox, Input} from 'react-native-elements';
import DiseaseButtonGroup from '../../../components/DiseaseButtonGroup';
import PatientAssessmentForm from '../../../components/PatientAssessmentForm';
import Checkboxs from '../../../components/Checkboxs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputField from '../../../components/TextInputField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  onClearAllDataAssessment,
  onFeel,
  onNoticeProblem,
  onOtherChange,
  onSymptomsChange,
} from '../../actions/PatientAssessmentAction';
import {
  onCardHolderNameChanged,
  onCardNumberChanged,
  onClearAllData,
  onEmailAddressChanged,
  onExpirationDateChanged,
  onNotAvailableChanged,
  onPhoneNumberChanged,
  onPrimaryCarePhysicianChanged,
  onSecurityCodeChanged,
} from '../../actions/PatientConnectivityAction';
import firebase from 'firebase';
import validator from 'validator';

const NurseScreen = (props) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [value, setValue] = useState('');
  const [levels, setLevels] = useState(0);
  const [checked, setChecked] = useState();
  const [payloadToNextPage, setPayloadToNextPage] = useState();
  const [visibility, setVisibility] = useState(false);
  const [billingCheckBoxValue, setBillingCheckBoxValue] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [zip, setZip] = useState();
  const [cityName, setCityName] = useState('');
  const [state, setState] = useState('');
  const [payemail, setPayEmail] = useState('');
  const buttons = ['YES', 'NO'];
  const [index, setIndex] = useState(0);
  const [finalNextLabel, setFinalNextLabel] = useState('NEXT');

  const [noticeProblemErr, setNoticeProblemErr] = useState('');
  const [feelErr, setFeelErr] = useState('');
  const [symptomErr, setSymptomErr] = useState('');
  const [phnErr, setPhnErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [cardNameErr, setCardNameErr] = useState('');
  const [cardNumberErr, setCardNumberErr] = useState('');
  const [cardExpirationErr, setCardExpirationErr] = useState('');
  const [securityCodeErr, setSecurityCodeErr] = useState('');
  const [aidNotAvailableErr, setAidNotAvailableErr] = useState('');
  const [termsErr, setTermsErr] = useState('');
  const [number, setNumber] = useState('');
  const [expiration, setExpiration] = useState('');

  const onHandleChangeText = (val) => {
    setNumber(
      val
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };

  const onHandleExpiration = (val) => {
    setExpiration(
      val
        .replace(/\/?/g, '')
        .replace(/(\d{2})/g, '$1/')
        .trim(),
    );
  };

  const per =
    props.route.params.value === 'nr'
      ? 'nurse'
      : props.route.params.value === 'dr'
      ? 'doctor'
      : 'psychiatrist';
  const [currentUser, setCurrentUser] = useState();

  const dataFromReduxStore = useSelector((state) => state.assessment);
  const {notice_problem, feel, symptoms, other} = dataFromReduxStore;

  const dataFromReduxStoreConnectivity = useSelector(
    (state) => state.connectivity,
  );
  const {
    phone_number,
    email,
    cardHolderName,
    cardNumber,
    expirationDate,
    securityCode,
    primaryCarePhysician,
    notAvailable,
    firstName,
    lastName,
    zipcode,
    city,
    stateName,
    billingEmail,
  } = dataFromReduxStoreConnectivity;

  const actionsFromReduxStore = useDispatch();

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
        setZip(data.zipcode);
        setCityName(data.city);
        setState(data.state);
        setPayEmail(data.email);
      });
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../../assets/shape.png')}
        style={styles.mainImg}>
        <Ionicons
          name="arrow-back"
          color={'white'}
          size={35}
          style={{
            marginTop: hp('1.5%'),
            marginLeft: wp('1.5%'),
            width: wp('8%'),
          }}
          onPress={() => props.navigation.goBack()}
        />
      </ImageBackground>
      <View style={{flex: 1}}>
        <ProgressSteps
          activeLabelColor={'orange'}
          activeStepIconBorderColor={'orange'}
          activeStep={activeStepIndex}
          topOffset={10}>
          <ProgressStep label="Patient Intake" removeBtnRow={true}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                elevation: 5,
                backgroundColor: '#edfffe',
                marginHorizontal: wp('4%'),
                borderRadius: 7,
                marginBottom: hp('3%'),
                marginTop: hp('1%'),
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, marginTop: hp('2%')}}>
                Who needs help today?
              </Text>
              <Text style={{fontSize: 12, marginTop: hp('2%')}}>
                Choose one of the following or search below
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: hp('2%'),
                  color: Colors.primaryColor,
                }}>
                I am not feeling well because I have{' '}
              </Text>
              <View style={{flex: 1, width: wp('82%')}}>
                <FlatList
                  data={patient}
                  // keyExtractor={(item, index) => index}
                  renderItem={({item}) => {
                    return (
                      <View style={{marginVertical: hp('1%'), borderRadius: 5}}>
                        <Button
                          title={item.label}
                          buttonStyle={{
                            backgroundColor: Colors.primaryColor,
                            padding: 30,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            setValue(item.value);
                            setActiveStepIndex(activeStepIndex + 1);
                          }}
                        />
                      </View>
                    );
                  }}
                />
              </View>

              <Text
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: wp('4%'),
                  marginTop: hp('3%'),
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Other Ailment
              </Text>

              <TextInput
                multiline={true}
                style={styles.textInput}
                numberOfLines={4}
                placeholder={'Please enter other ailment...'}
                maxLength={100}
              />
              <Text
                style={{
                  marginTop: hp('-1%'),
                  alignSelf: 'flex-start',
                  marginLeft: wp('4%'),
                  fontSize: 10,
                  marginBottom: hp('1%'),
                  color: 'black',
                }}>
                Ailment must be less than 100 characters.
              </Text>
            </View>
          </ProgressStep>

          <ProgressStep label="Patient Assessment" removeBtnRow={true}>
            {levels === 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <Text style={styles.dataText}>
                  {diseaseDetails.map((data) =>
                    data.label === value ? data.value : null,
                  )}
                </Text>
                <DiseaseButtonGroup
                  placeholder={value}
                  nxt={props.navigation}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setActiveStepIndex(activeStepIndex - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels + 1)}
                  />
                </View>
              </View>
            ) : levels === 1 ? (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: wp('4%'),
                      marginTop: hp('3%'),
                      paddingRight: wp('2%'),
                      height: 14,
                      width: 14,
                      borderRadius: 7,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      textAlign: 'center',
                      marginTop: hp('2.5%'),
                      fontSize: 15,
                    }}>
                    When did you notice your problem?
                  </Text>
                </View>

                <PatientAssessmentForm
                  dataProps={checkboxDetails}
                  onPress={(val) => {
                    setNoticeProblemErr('');
                    actionsFromReduxStore(onNoticeProblem(val));
                  }}
                />

                {noticeProblemErr ? (
                  <Text
                    style={{
                      marginHorizontal: wp('4%'),
                      fontFamily: 'FiraSans-Regular',
                      fontSize: 13,
                      color: 'red',
                    }}>
                    {noticeProblemErr}
                  </Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      if (notice_problem) {
                        setNoticeProblemErr('');
                        setLevels(levels + 1);
                      } else {
                        setNoticeProblemErr(
                          'Please Select Appropriate Option..',
                        );
                      }
                    }}
                  />
                </View>
              </View>
            ) : levels === 2 ? (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: wp('4%'),
                      marginTop: hp('3%'),
                      paddingRight: wp('2%'),
                      height: 14,
                      width: 14,
                      borderRadius: 7,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      textAlign: 'center',
                      marginTop: hp('2.5%'),
                      fontSize: 15,
                    }}>
                    How do you feel?
                  </Text>
                </View>

                <PatientAssessmentForm
                  dataProps={patientFeel}
                  onPress={(val) => {
                    setFeelErr('');
                    actionsFromReduxStore(onFeel(val));
                  }}
                />

                {feelErr ? (
                  <Text
                    style={{
                      marginHorizontal: wp('4%'),
                      fontFamily: 'FiraSans-Regular',
                      fontSize: 13,
                      color: 'red',
                    }}>
                    {feelErr}
                  </Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      if (feel) {
                        setFeelErr('');
                        setLevels(levels + 1);
                      } else {
                        setFeelErr('Please Select Appropriate Option..');
                      }
                    }}
                  />
                </View>
              </View>
            ) : levels === 3 ? (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: wp('4%'),
                      marginTop: hp('3%'),
                      paddingRight: wp('2%'),
                      height: 14,
                      width: 14,
                      borderRadius: 7,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      marginTop: hp('2.5%'),
                      fontSize: 15,
                    }}>
                    What are your symptoms like (select all that apply)?
                  </Text>
                </View>

                <FlatList
                  data={diffCat.filter((values) =>
                    values.label === value ? values.value : null,
                  )}
                  renderItem={({item}) => {
                    return (
                      <View>
                        {Object.values(
                          item.value.map((data) => (
                            <Checkboxs
                              state={data.radioButton}
                              title={data.key}
                              values={data}
                              onPress={(val) => {
                                val.radioButton = !val.radioButton;
                                setPayloadToNextPage(item);
                                actionsFromReduxStore(onSymptomsChange(val));
                                setSymptomErr('');
                              }}
                            />
                          )),
                        )}
                      </View>
                    );
                  }}
                />

                {symptomErr ? (
                  <Text
                    style={{
                      marginHorizontal: wp('4%'),
                      fontFamily: 'FiraSans-Regular',
                      fontSize: 13,
                      color: 'red',
                    }}>
                    {symptomErr}
                  </Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      if (symptoms.length > 0) {
                        setSymptomErr('');
                        setLevels(levels + 1);
                      } else {
                        setSymptomErr('Please Appropriate Option..');
                      }
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: wp('4%'),
                      marginTop: hp('3%'),
                      paddingRight: wp('2%'),
                      height: 14,
                      width: 14,
                      borderRadius: 7,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      marginTop: hp('2.5%'),
                      fontSize: 15,
                      flexShrink: 1,
                    }}>
                    Is there any other information you would like to share with
                    your {per} ?
                  </Text>
                </View>

                <TextInput
                  multiline={true}
                  style={{
                    ...styles.textInput,
                    width: wp('84%'),
                    marginTop: hp('2%'),
                    backgroundColor: 'white',
                    height: hp('10%'),
                  }}
                  numberOfLines={3}
                  maxLength={100}
                  onChangeText={(val) =>
                    actionsFromReduxStore(onOtherChange(val))
                  }
                />

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => setActiveStepIndex(activeStepIndex + 1)}
                  />
                </View>
              </View>
            )}
          </ProgressStep>

          <ProgressStep label="Patient Connectivity" removeBtnRow={true}>
            {levels === 4 ? (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: 'white',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <Text
                  style={{
                    marginLeft: wp('2%'),
                    marginTop: hp('2.5%'),
                    fontSize: 17.5,
                    flexShrink: 1,
                    lineHeight: hp('3%'),
                    fontFamily: 'FiraSans-SemiBold',
                  }}>
                  {name}, let's get you taken care of:{'\n'}You're almost to the{' '}
                  {per}'s office
                </Text>

                <View style={styles.callView}>
                  <View style={styles.outerViewCircle}>
                    <View style={styles.circle}>
                      <Text style={{textAlign: 'center', fontSize: 22}}>
                        <Feather name="phone-call" size={39} color={'white'} />
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setVisibility(!visibility)}>
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      marginTop: hp('1%'),
                      color: Colors.primaryColor,
                    }}>
                    <FontAwesome
                      name="tag"
                      color={Colors.primaryColor}
                      size={20}
                    />{' '}
                    Have a Promo Code?
                  </Text>
                </TouchableOpacity>

                {visibility ? (
                  <View
                    style={{marginHorizontal: wp('2%'), marginTop: hp('1.5%')}}>
                    <TextInput
                      placeholder={'ENTER PROMO CODE HERE'}
                      style={{
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderRadius: 4,
                        fontSize: 15,
                        padding: 10,
                      }}
                    />
                  </View>
                ) : null}

                <View style={styles.detailsEnteringView}>
                  <Text>
                    What's the best number to reach at you during your visit?
                  </Text>

                  <TextInputField
                    label="Phone Number"
                    keyboardType={'number-pad'}
                    placeholder="5826367778"
                    onChangeText={(val) => {
                      setPhnErr('');
                      actionsFromReduxStore(onPhoneNumberChanged(val));
                    }}
                    maxLength={10}
                    errorMessage={phnErr}
                    value={phone_number}
                    onBlur={() =>
                      phone_number.length === 10
                        ? setPhnErr('')
                        : setPhnErr('Enter Proper Phone Number...')
                    }
                  />

                  <TextInputField
                    label={'Email Address'}
                    keyboardType={'email-address'}
                    placeholder="samipre@mailinator.com"
                    icon={<AntDesign name="star" />}
                    onChangeText={(val) => {
                      setEmailErr('');
                      actionsFromReduxStore(onEmailAddressChanged(val));
                    }}
                    errorMessage={emailErr}
                    value={email}
                    onBlur={() =>
                      validator.isEmail(email)
                        ? setEmailErr('')
                        : setEmailErr('Enter Proper email...')
                    }
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setActiveStepIndex(activeStepIndex - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      if (
                        !(emailErr || phnErr) &&
                        email.length > 4 &&
                        phone_number.length === 10
                      ) {
                        setLevels(levels + 1);
                      } else {
                        if (!(email.length > 4)) {
                          setEmailErr('Enter Proper email...');
                        }
                        if (!(phone_number.length === 10)) {
                          setPhnErr('Enter Proper Phone Number...');
                        }
                      }
                    }}
                  />
                </View>
              </View>
            ) : levels === 5 ? (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <Text
                  style={{
                    marginLeft: wp('4%'),
                    marginTop: hp('2.5%'),
                    fontSize: 17.5,
                    flexShrink: 1,
                    lineHeight: hp('3%'),
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Payment Information
                </Text>

                <View style={styles.billingView}>
                  <View
                    style={{
                      marginHorizontal: wp('2.5%'),
                      marginTop: hp('2%'),
                      marginBottom: hp('1%'),
                    }}>
                    <Text
                      style={{fontSize: 16, fontFamily: 'FiraSans-Regular'}}>
                      Billing Details
                    </Text>
                    <View style={{marginTop: hp('1%')}}>
                      <TextInputField
                        label={'First Name'}
                        placeholder="samipre"
                        dis={true}
                        value={name}
                      />

                      <TextInputField
                        label={'Last Name'}
                        dis={true}
                        value={surname}
                      />

                      <TextInputField
                        label={'Zip Code'}
                        dis={true}
                        value={zip}
                      />

                      <TextInputField
                        label={'City'}
                        dis={true}
                        value={cityName}
                      />

                      <TextInputField
                        label={'State'}
                        dis={true}
                        value={state}
                      />

                      <TextInputField
                        label={'Billing Email'}
                        dis={true}
                        value={payemail}
                      />

                      <CheckBox
                        title={'Billing Address same as Profile Address'}
                        textStyle={{
                          fontFamily: 'FiraSans-Medium',
                          fontWeight: '300',
                        }}
                        checked={true}
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          marginLeft: wp('-2%'),
                          marginBottom: 0,
                        }}
                        checkedColor={Colors.primaryColor}
                      />

                      <CheckBox
                        title={
                          'By clicking Continue, I agree to the Terms & Conditions set out by this site.'
                        }
                        textStyle={{
                          fontFamily: 'FiraSans-Medium',
                          fontWeight: '300',
                        }}
                        checked={billingCheckBoxValue}
                        onPress={() => {
                          setTermsErr('');
                          setBillingCheckBoxValue(!billingCheckBoxValue);
                        }}
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          marginLeft: wp('-2%'),
                        }}
                        checkedColor={Colors.primaryColor}
                      />

                      {termsErr ? (
                        <Text
                          style={{
                            marginHorizontal: wp('4%'),
                            fontFamily: 'FiraSans-Regular',
                            fontSize: 13,
                            color: 'red',
                          }}>
                          {termsErr}
                        </Text>
                      ) : null}

                      <TextInputField
                        label={'Card Holder Name'}
                        placeholder="Enter Card Holder Name"
                        onChangeText={(val) => {
                          setCardNameErr('');
                          actionsFromReduxStore(onCardHolderNameChanged(val));
                        }}
                        value={cardHolderName}
                        errorMessage={cardNameErr}
                        onBlur={() =>
                          cardHolderName.length > 1
                            ? setCardNameErr('')
                            : setCardNameErr('Enter Proper Card Holder Name..')
                        }
                      />

                      <TextInputField
                        label={'Card Number'}
                        autoCapitalize={'none'}
                        keyboardType={'number-pad'}
                        autoCorrect={false}
                        maxLength={19}
                        placeholder={'1234 5678 9012 3456'}
                        onChangeText={(val) => {
                          setCardNumberErr('');
                          actionsFromReduxStore(onCardNumberChanged(val));
                          onHandleChangeText(val);
                        }}
                        value={number}
                        errorMessage={cardNumberErr}
                        onBlur={() =>
                          number.length > 15
                            ? setCardNumberErr('')
                            : setCardNumberErr('Enter Proper Card Number..')
                        }
                      />

                      <TextInputField
                        label={'Expiration Date'}
                        autoCapitalize={'none'}
                        keyboardType={'number-pad'}
                        autoCorrect={false}
                        maxLength={5}
                        placeholder={'MM/YY'}
                        onChangeText={(val) => {
                          setCardExpirationErr('');
                          actionsFromReduxStore(onExpirationDateChanged(val));
                          securityCode;
                          onHandleExpiration(val);
                        }}
                        value={expiration}
                        errorMessage={cardExpirationErr}
                        onBlur={() =>
                          expiration.length > 4
                            ? setCardExpirationErr('')
                            : setCardExpirationErr(
                                'Enter Proper Expiration Date..',
                              )
                        }
                      />

                      <TextInputField
                        label={'Security Code'}
                        placeholder="CVV"
                        keyboardType={'number-pad'}
                        pass={true}
                        onChangeText={(val) => {
                          actionsFromReduxStore(onSecurityCodeChanged(val));
                        }}
                        value={securityCode}
                        maxLength={3}
                        errorMessage={securityCodeErr}
                        onBlur={() =>
                          securityCode.length === 3
                            ? setSecurityCodeErr('')
                            : setSecurityCodeErr('Enter Proper Security Code..')
                        }
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={'NEXT'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      if (
                        !(
                          cardNameErr ||
                          cardNumberErr ||
                          cardExpirationErr ||
                          securityCodeErr
                        ) &&
                        cardHolderName.length > 0 &&
                        number.length >= 15 &&
                        expiration.length >= 3 &&
                        securityCode.length === 3 &&
                        billingCheckBoxValue
                      ) {
                        setLevels(levels + 1);
                      } else {
                        if (!(cardHolderName.length > 0)) {
                          setCardNameErr('Enter Proper Card Holder Name..');
                        }
                        if (!(number.length >= 4)) {
                          setCardNumberErr('Enter Proper Card Number..');
                        }
                        if (!(expiration.length >= 3)) {
                          setCardExpirationErr(
                            'Enter Proper Expiration Date..',
                          );
                        }
                        if (!(securityCode.length === 3)) {
                          setSecurityCodeErr('Enter Proper Security Code..');
                        }
                        if (!billingCheckBoxValue) {
                          setTermsErr('Please Agree to Terms & Conditions..');
                        }
                      }
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <Text
                  style={{
                    marginLeft: wp('4%'),
                    marginTop: hp('2.5%'),
                    fontSize: 17.5,
                    flexShrink: 1,
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  Confirmation
                </Text>

                <View style={styles.billingView}>
                  <View
                    style={{
                      marginHorizontal: wp('2.5%'),
                      marginTop: hp('2%'),
                      marginBottom: hp('1%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        flexShrink: 1,
                        fontFamily: 'OpenSans-Bold',
                      }}>
                      Please confirm your session details
                    </Text>
                    <View style={{marginTop: hp('1%')}}>
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: 'lightgray',
                          padding: hp('2%'),
                          marginRight: wp('2.5%'),
                          marginBottom: hp('1%'),
                          marginTop: hp('2%'),
                        }}>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Provider:
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Provider on Call{'\n'}
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Provider Type:
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          General Practice{'\n'}
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Reason for Visit:
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          {value}
                          {'\n'}
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Consulting Method
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Phone{'\n'}
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          Payment Amount
                        </Text>
                        <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                          <Feather name="dollar-sign" />
                          20.99
                        </Text>
                      </View>
                      <TextInputField
                        label={
                          'If SAMI-AID was not available, where would have you gone?'
                        }
                        onChangeText={(val) => {
                          setAidNotAvailableErr('');
                          actionsFromReduxStore(onNotAvailableChanged(val));
                        }}
                        value={notAvailable}
                        errorMessage={aidNotAvailableErr}
                        onBlur={() =>
                          notAvailable.length > 0
                            ? setAidNotAvailableErr('')
                            : setAidNotAvailableErr('Enter Proper Details..')
                        }
                      />

                      <View>
                        <View style={{marginTop: hp('2%')}}>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Do you have a Primary Care Physician?
                          </Text>
                          <ButtonGroup
                            buttons={buttons}
                            selectedIndex={index}
                            onPress={(selected) => {
                              selected === 1
                                ? actionsFromReduxStore(
                                    onPrimaryCarePhysicianChanged('NO'),
                                  )
                                : actionsFromReduxStore(
                                    onPrimaryCarePhysicianChanged('YES'),
                                  );
                              setIndex(selected);
                            }}
                            containerStyle={{
                              height: hp('5.5%'),
                              backgroundColor: 'transparent',
                              marginTop: hp('4%'),
                              borderColor: Colors.primaryColor,
                              marginBottom: hp('2%'),
                            }}
                            selectedButtonStyle={{
                              backgroundColor: Colors.primaryColor,
                            }}
                            textStyle={{color: 'black'}}
                            selectedTextStyle={{color: 'black'}}
                          />
                        </View>
                      </View>

                      <CheckBox
                        title={
                          "By clicking here, I acknowledge that I accept and agree to SAMI-Aid's Terms & Conditions and Privacy Policy"
                        }
                        checked={billingCheckBoxValue}
                        onPress={() => {
                          setTermsErr('');
                          setBillingCheckBoxValue(!billingCheckBoxValue);
                        }}
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          marginLeft: wp('-2%'),
                        }}
                        checkedColor={Colors.primaryColor}
                      />
                      {termsErr ? (
                        <Text
                          style={{
                            marginHorizontal: wp('4%'),
                            fontFamily: 'FiraSans-Regular',
                            fontSize: 13,
                            color: 'red',
                          }}>
                          {termsErr}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('88%'),
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginTop: hp('5%'),
                  }}>
                  <Button
                    title={'BACK'}
                    titleStyle={{color: '#bababa'}}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: '#bababa',
                      backgroundColor: 'transparent',
                      alignContent: 'space-between',
                      width: wp('40%'),
                    }}
                    onPress={() => setLevels(levels - 1)}
                  />
                  <Button
                    title={finalNextLabel}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                      backgroundColor: Colors.primaryColor,
                      width: wp('40%'),
                    }}
                    onPress={() => {
                      setFinalNextLabel(
                        <ActivityIndicator size="small" color="white" />,
                      );
                      if (
                        !(termsErr || aidNotAvailableErr) &&
                        notAvailable.length > 0 &&
                        billingCheckBoxValue
                      ) {
                        firebase
                          .database()
                          .ref(`/patientSymptomsDetail/${currentUser}/`)
                          .push({
                            DiseaseName: value,
                            WhenDidYouNoticeYourProblem: notice_problem,
                            HowDoYouFeel: feel,
                            AnySymptoms: symptoms,
                            OtherInfo: other,
                            PhoneNumber: phone_number,
                            email,
                            FirstName: name,
                            LastName: surname,
                            ZipCode: zip,
                            City: cityName,
                            State: state,
                            BillingEmail: payemail,
                            CardHolderName: cardHolderName,
                            CardNumber: cardNumber,
                            ExpirationDate: expirationDate,
                            SecurityCode: securityCode,
                            SAMINotAvailable: notAvailable,
                            PrimaryCarePhysician: primaryCarePhysician,
                          })
                          .then((res) => {
                            setFinalNextLabel('NEXT');
                            setActiveStepIndex(activeStepIndex + 1);
                          })
                          .catch((err) => {
                            Alert.alert(
                              'Something Went Wrong...',
                              'Please Try Again...',
                            );
                            setFinalNextLabel('NEXT');
                          });
                      } else {
                        if (!(notAvailable.length > 0)) {
                          setAidNotAvailableErr('Enter Proper Details...');
                        }
                        if (!billingCheckBoxValue) {
                          setTermsErr('Please Agree to Terms & Conditions..');
                        }
                      }
                    }}
                  />
                </View>
              </View>
            )}
          </ProgressStep>

          <ProgressStep label="Patient Connect" removeBtnRow={true}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                  elevation: 5,
                  backgroundColor: '#edfffe',
                  marginHorizontal: wp('4%'),
                  borderRadius: 7,
                  marginBottom: hp('3%'),
                  marginTop: hp('1%'),
                }}>
                <Text
                  style={{
                    marginLeft: wp('4%'),
                    marginTop: hp('2.5%'),
                    fontSize: 17.5,
                    flexShrink: 1,
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  Your {per} will be calling you shortly.
                </Text>

                <View style={{...styles.callView, height: hp('35%')}}>
                  <View style={styles.outerViewCircle}>
                    <View style={styles.circle}>
                      <Text style={{textAlign: 'center', fontSize: 22}}>
                        <Feather name="phone-call" size={39} color={'white'} />
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: hp('4%'),
                      color: 'gray',
                    }}>
                    Estimated Provider callback time
                  </Text>

                  <View
                    style={{alignItems: 'center', marginVertical: hp('2%')}}>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingVertical: 15,
                        backgroundColor: 'white',
                        borderRadius: 7,
                        borderColor: 'lightgray',
                        borderWidth: 1,
                        paddingHorizontal: 30,
                      }}>
                      About 30 min
                    </Text>
                  </View>
                </View>

                <View style={{marginHorizontal: wp('2%'), marginTop: hp('2%')}}>
                  <Text style={{lineHeight: 30, fontSize: 15}}>
                    During the visit with your {per}, they will need to ask a
                    few more questions to fully understand your situation.
                    Please be in a quiet place without distractions to optimize
                    the time with them.
                  </Text>
                </View>

                <View style={{marginHorizontal: wp('2%'), marginTop: hp('2%')}}>
                  <Text style={{lineHeight: 30, fontSize: 16}}>
                    We will send updates to your email
                  </Text>
                  <Input
                    value={payemail}
                    disabled
                    inputContainerStyle={{marginHorizontal: wp('-2%')}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: hp('4%'),
                    alignSelf: 'flex-start',
                    marginHorizontal: wp('2%'),
                  }}>
                  <Button
                    title={'HOME SCREEN'}
                    titleStyle={{color: 'white'}}
                    buttonStyle={{backgroundColor: Colors.primaryColor}}
                    onPress={() => {
                      // actionsFromReduxStore(onClearAllData)
                      // actionsFromReduxStore(onClearAllDataAssessment)
                      props.navigation.navigate('Dashboard');
                    }}
                    containerStyle={{width: '100%'}}
                  />
                </View>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  billingView: {
    marginTop: hp('3%'),
    backgroundColor: 'white',
    marginHorizontal: wp('4%'),
    borderRadius: 5,
    elevation: 5,
  },
  detailsEnteringView: {
    marginHorizontal: wp('2%'),
    marginTop: hp('3%'),
  },
  callView: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    height: hp('20%'),
    marginHorizontal: wp('2%'),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: hp('2%'),
  },
  outerViewCircle: {
    elevation: 8,
    height: hp('12%'),
    width: wp('25%'),
    borderRadius: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  dataText: {
    marginVertical: hp('3%'),
    lineHeight: hp('3%'),
    marginHorizontal: wp('3%'),
    fontSize: 12,
  },
  textInput: {
    height: hp('12%'),
    width: wp('65%'),
    alignSelf: 'flex-start',
    marginLeft: wp('4%'),
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical: 'top',
    borderRadius: 9,
    marginBottom: hp('2%'),
  },
  mainImg: {
    width: wp('100%'),
    height: hp('12%'),
  },
});

export default NurseScreen;
