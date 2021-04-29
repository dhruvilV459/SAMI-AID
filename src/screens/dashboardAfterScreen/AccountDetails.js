import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from '../../../Constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputField from '../../../components/TextInputField';
import Icon from 'react-native-vector-icons/Entypo';
import {Avatar, Button, ButtonGroup, Input} from 'react-native-elements';
import firebase from 'firebase';
import PhotoModal from '../../../components/PhotoModal';
import {ActivityIndicator} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [uid, setUid] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [uri, setUri] = useState();
  const [res, setRes] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUid(user.uid);
      firebase
        .storage()
        .ref(`/profileImages/${user.uid}/images/`)
        .getDownloadURL()
        .then((url) => setUri(url));

      firebase
        .database()
        .ref(`/user/${user.uid}/userDetails`)
        .on('child_added', (value) => {
          let data = value.val();

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setGender(data.gender);
          setDob(data.dob);

          setIsLoading(false);

          data.weight ? setWeight(data.weight) : null;

          data.height ? setHeightFt(data.height.split('.')[0]) : null;
          data.height ? setHeightIn(data.height.split('.')[1]) : null;
        });
    });
  }, []);

  const submitFormEntry = () => {
    let aa = firebase.database().ref(`/user/${uid}/userDetails/`).get();
    let bb = Object.keys(JSON.parse(JSON.stringify(aa['_W'])))[0];

    firebase
      .database()
      .ref(`/user/${uid}/userDetails/${bb}`)
      .update({
        weight: weight,
        height: heightFt + '.' + heightIn,
      });
  };

  const documentPicker = async () => {
    try {
      const resp = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setUri(resp.uri);
      setRes(resp);

      const responseUri = await fetch(resp.uri);
      const blob = await responseUri.blob();

      firebase
        .storage()
        .ref(`/profileImages/${uid}/images/${resp.name}`)
        .put(blob)
        .then((response) => {
          console.log('upload done successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user cancelled operation');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../../assets/shape.png')}
        style={styles.headerImg}>
        <Ionicons
          name="arrow-back"
          color="white"
          size={40}
          style={styles.backIcon}
          onPress={() => props.navigation.goBack()}
        />
      </ImageBackground>
      {console.log('inside return statement')}

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      ) : (
        <ScrollView style={styles.contentView}>
          <View style={styles.scrollViewMainView}>
            <Text style={styles.healthProfileTxt}>Health Profile</Text>
            {uri ? (
              <Avatar
                rounded
                source={{uri: uri}}
                containerStyle={styles.avatar}
                size={'xlarge'}
                avatarStyle={styles.avatarStyle}
              />
            ) : (
              <Svg height={'200'} width={'300'} style={{alignSelf: 'center'}}>
                <Circle
                  cx={150}
                  cy={100}
                  r={90}
                  stroke={'#e8e8e8'}
                  strokeWidth={5}
                  fill={Colors.primaryColor}
                  onPress={() => documentPicker()}
                />
                <MaterialCommunityIcons
                  name="camera"
                  size={65}
                  color={'white'}
                  style={{alignSelf: 'center', marginTop: hp('4%')}}
                />
                <Text style={styles.uploadTxt}>Upload Photo</Text>
              </Svg>
            )}

            <PhotoModal
              visible={visible}
              onClose={() => setVisible(!visible)}
            />

            <View style={styles.inputView}>
              <TextInputField
                label="First Name"
                placeholder="SAMIFIVE"
                value={firstName}
                borderStyle={{borderColor: Colors.primaryColor}}
                labelStyle={{fontFamily: 'FiraSans-SemiBold'}}
                dis={true}
              />
              <TextInputField
                label="Last Name"
                value={lastName}
                placeholder="PreFive"
                borderStyle={{borderColor: Colors.primaryColor}}
                labelStyle={{fontFamily: 'FiraSans-SemiBold'}}
                dis={true}
              />

              <Text style={styles.gender}>
                Gender <Icon name="star-outlined" color="red" size={9} />
              </Text>
              <ButtonGroup
                buttons={['MALE', 'FEMALE']}
                selectedIndex={gender === 'Male' ? 0 : 1}
                onPress={() => {}}
                containerStyle={{
                  height: 45,
                  borderRadius: 8,
                  marginTop: hp('2%'),
                  backgroundColor: 'white',
                  borderColor: Colors.primaryColor,
                }}
                selectedButtonStyle={{backgroundColor: Colors.primaryColor}}
                selectedTextStyle={{color: 'white'}}
                textStyle={{color: Colors.primaryColor, fontSize: 14}}
              />
              <TextInputField
                label="Date of Birth"
                placeholder="13-5-2000"
                value={dob}
                borderStyle={{borderColor: Colors.primaryColor}}
                labelStyle={{fontFamily: 'FiraSans-SemiBold'}}
                dis={true}
              />
              <Text style={{...styles.gender, marginBottom: 10}}>Height</Text>
              <View style={styles.heightView}>
                <Input
                  keyboardType={'decimal-pad'}
                  placeholder={'FT'}
                  containerStyle={{
                    flex: 1,
                    borderColor: Colors.primaryColor,
                    borderWidth: 1,
                    borderRadius: 7,
                    height: 50,
                    marginRight: 10,
                  }}
                  inputContainerStyle={{borderColor: 'transparent'}}
                  inputStyle={{fontSize: 15}}
                  value={heightFt}
                  onChangeText={setHeightFt}
                />
                <Input
                  keyboardType={'decimal-pad'}
                  placeholder={'IN'}
                  value={heightIn}
                  inputStyle={{fontSize: 15}}
                  onChangeText={setHeightIn}
                  containerStyle={{
                    flex: 1,
                    borderColor: Colors.primaryColor,
                    borderWidth: 1,
                    borderRadius: 7,
                    height: 50,
                  }}
                  inputContainerStyle={{borderColor: 'transparent'}}
                />
              </View>

              <View style={styles.weightView}>
                <Text style={{...styles.gender, marginBottom: 10}}>
                  Weight (lbs)
                </Text>
                <Input
                  keyboardType={'decimal-pad'}
                  containerStyle={{
                    borderColor: Colors.primaryColor,
                    borderWidth: 1,
                    borderRadius: 7,
                    height: 50,
                    width: '95%',
                    marginLeft: 10,
                  }}
                  inputContainerStyle={{borderColor: 'transparent'}}
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>

              <Button
                title={'SAVE'}
                titleStyle={{color: 'white', fontFamily: 'FiraSans-Medium'}}
                buttonStyle={{
                  backgroundColor: Colors.primaryColor,
                  padding: '3.2%',
                  borderRadius: 5,
                  marginHorizontal: wp('2%'),
                  marginVertical: hp('2%'),
                }}
                onPress={submitFormEntry}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: 'transparent',
    width: '10%',
    marginTop: 7,
  },
  avatar: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  weightView: {
    marginTop: hp('3%'),
  },
  heightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('2%'),
  },
  gender: {
    fontFamily: 'FiraSans-SemiBold',
    marginLeft: wp('2%'),
  },
  inputView: {
    marginTop: hp('1%'),
    marginHorizontal: wp('2%'),
  },
  uploadTxt: {
    alignSelf: 'center',
    marginTop: hp('1%'),
    fontSize: 16,
    color: 'white',
    fontFamily: 'FiraSans-Regular',
  },
  scrollViewMainView: {
    flex: 1,
    marginTop: hp('1%'),
  },
  contentView: {
    flex: 1,
  },
  healthProfileTxt: {
    fontSize: 22,
    fontFamily: 'FiraSans-SemiBold',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImg: {
    width: Dimensions.get('screen').width,
    height: hp('12%'),
    resizeMode: 'contain',
  },
});

export default AccountDetails;
