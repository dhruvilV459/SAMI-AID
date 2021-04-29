import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';

import ForgetPasswordForm from '../../components/ForgetPasswordForm';
// import Color from '../constants/Color';
import {Colors} from '../../Constants/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ForgetPasswordScreen = (props) => {
  return (
    <KeyboardAwareScrollView style={styles.main}>
      {/* <View> */}
      <ImageBackground
        style={styles.image}
        source={require('../../assets/signin_background.png')}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo_sami_aid_white.png')}
        />
        <Text style={styles.header}>FORGOT PASSWORD</Text>
      </ImageBackground>
      <ForgetPasswordForm signIn={() => props.navigation.replace('Signin')} />
      {/* <View style={styles.signInBlock}></View> */}
      {/* </View> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    flex: 1,
    //     width: Width,
    height: Height * 0.5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  logo: {
    marginTop: '18%',
    width: '80%',
    height: Height * 0.0955,
  },
  header: {
    marginTop: '20%',
    marginBottom: '9%',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  signInBlock: {
    flexDirection: 'row',
    paddingTop: Height * 0.29,
  },
});

export default ForgetPasswordScreen;
