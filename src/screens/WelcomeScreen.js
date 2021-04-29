// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CommonActions } from '@react-navigation/routers';
// import React, { useState } from 'react';
// import { Text, View, StyleSheet ,ImageBackground,Dimensions } from 'react-native';
// import { Button, Image } from 'react-native-elements';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import DashBoardScreen from './DashBoardScreen';

// const WelcomeScreen = (props) => {
//     // const [validUser, setValidUser] = useState(false)

//     // AsyncStorage.getItem('user').then(res => {
//     //     if (JSON.parse(res)) {
//     //         setValidUser(true)
//     //     } else {
//     //         setValidUser(false)
//     //     }
//     // }).catch(err => {
//     //     setValidUser(false)
//     // })
//     // console.log(validUser)
//     // if (validUser) {
//     //     return (
//     //         <DashBoardScreen {...props} />
//     //     )
//     // } else {

//     // }

//     return (
//         <View style={{ backgroundColor: 'white' }}>
//             <View>
//                 <ImageBackground source={require('../../assets/welcomeimg.png')} style={styles.welImg} >
//                     <View style={styles.secImgView}>
//                         <Image source={require('../../assets/sami_aid_logoWhite.png')}
//                             style={styles.samiLogo}
//                         />
//                     </View>
//                 </ImageBackground>
//             </View>

//             <View style={styles.descriptionView}>
//                 <Text style={{ ...styles.text, fontFamily: 'FiraSans-SemiBold', fontSize: 21, }}>WELCOME TO SAMI-AID</Text>
//                 <Text style={{ ...styles.text, color: '#777777' }}>{'\n'}Need to see a doctor? Don't worry about mystery pricing, because you have SAMI-AID!</Text>
//                 <View style={styles.button}>
//                     <Button
//                         title="CREATE ACCOUNT"
//                         titleStyle={{ fontFamily: 'FiraSans-SemiBold' }}
//                         buttonStyle={{ backgroundColor: '#59C6C3', padding: '3.2%' }}
//                         onPress={() => props.navigation.navigate('Signup')}
//                     />
//                 </View>
//                 <View style={{ marginTop: '3.5%' }}>
//                     <Text style={{ ...styles.text, }}>Already have an account? <Text style={{ color: '#59c6c3', textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('Signin')} >Sign In</Text></Text>
//                 </View>
//             </View>
//         </View>
//     );

// }

// const styles = StyleSheet.create({
//     button: {
//         width: wp('93.4%'),
//         marginTop: hp('5%')
//     },
//     text: {
//         textAlign: 'center',
//         marginHorizontal: '2.6%',
//         fontFamily: 'FiraSans-Regular'
//     },
//     descriptionView: {
//         position: 'absolute',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: hp('63%'),
//         padding: 0
//     },
//     secImgView: {
//         justifyContent: 'center',
//         flex: .6,
//     },
//     samiLogo: {
//         width: '60%',
//         height: Dimensions.get('window').height / 9.2,
//         resizeMode: 'contain',
//         marginHorizontal: wp('20%')
//     },
//     welImg: {
//         width: '100%',
//         height: Dimensions.get('window').height,
//         resizeMode: 'contain'
//     }
// });

// export default WelcomeScreen;
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CommonActions } from '@react-navigation/routers';
// import React, { useState } from 'react';
// import { Dimensions } from 'react-native';
// import { ImageBackground } from 'react-native';
// import { Text, View, StyleSheet } from 'react-native';
// import { Button, Image } from 'react-native-elements';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import DashBoardScreen from './DashBoardScreen';

// const WelcomeScreen = (props) => {

//     return (
//         <View style={{ backgroundColor: 'white' }}>
//             <View>
//                 <ImageBackground source={require('../../assets/welcomeimg.png')} style={styles.welImg} >
//                     <View style={styles.secImgView}>
//                         <Image source={require('../../assets/sami_aid_logoWhite.png')}
//                             style={styles.samiLogo}
//                         />
//                     </View>
//                 </ImageBackground>
//             </View>

//             <View style={styles.descriptionView}>
//                 <Text style={{ ...styles.text, fontFamily: 'FiraSans-SemiBold', fontSize: 21, }}>WELCOME TO SAMI-AID</Text>
//                 <Text style={{ ...styles.text, color: '#777777' }}>{'\n'}Need to see a doctor? Don't worry about mystery pricing, because you have SAMI-AID!</Text>
//                 <View style={styles.button}>
//                     <Button
//                         title="CREATE ACCOUNT"
//                         titleStyle={{ fontFamily: 'FiraSans-SemiBold' }}
//                         buttonStyle={{ backgroundColor: '#59C6C3', padding: '3.2%' }}
//                         onPress={() => props.navigation.navigate('Signup')}
//                     />
//                 </View>
//                 <View style={{ marginTop: '3.5%' }}>
//                     <Text style={{ ...styles.text, }}>Already have an account? <Text style={{ color: '#59c6c3', textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('Signin')} >Sign In</Text></Text>
//                 </View>
//             </View>
//         </View>
//     );

// }

// const styles = StyleSheet.create({
//     button: {
//         width: wp('93.4%'),
//         marginTop: hp('5%')
//     },
//     text: {
//         textAlign: 'center',
//         marginHorizontal: '2.6%',
//         fontFamily: 'FiraSans-Regular'
//     },
//     descriptionView: {
//         position: 'absolute',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: hp('63%'),
//         padding: 0
//     },
//     secImgView: {
//         justifyContent: 'center',
//         flex: .6,
//     },
//     samiLogo: {
//         width: '60%',
//         height: Dimensions.get('window').height / 9.2,
//         resizeMode: 'contain',
//         marginHorizontal: wp('20%')
//     },
//     welImg: {
//         width: '100%',
//         height: Dimensions.get('window').height,
//         resizeMode: 'contain'
//     }
// });

// export default WelcomeScreen;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
// import Color from '../constants/Color';
import {Colors} from '../../Constants/Colors';
import * as Animatable from 'react-native-animatable';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const WelcomeScreen = (props) => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.statusBar} />
      <ImageBackground
        style={styles.image}
        source={require('../../assets/welcomeimg.png')}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo_sami_aid_white.png')}
        />
      </ImageBackground>
      <View style={styles.details}>
        {/* <Text style={styles.header}>WELCOME TO SAMI-AID</Text> */}
        <Animatable.Text
          animation="flash"
          duration={2000}
          iterationCount={1}
          style={styles.header}>
          WELCOME TO SAMI-AID
        </Animatable.Text>
        <Text style={styles.subHeader}>
          Need to see a doctor? Don't worry about mystery pricing, {'\n'}{' '}
          because you have SAMI-Aid!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Signup');
          }}>
          <Animatable.View animation="flash" iterationCount={1}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              CREATE ACCOUNT
            </Text>
          </Animatable.View>
        </TouchableOpacity>
        <View style={styles.signInBlock}>
          <Text style={{color: Colors.secondaryBlack}}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Signin');
            }}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: '80%',
    height: 75,
  },
  image: {
    flex: 1,
    width: Width,
    height: Height * 1.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    color: Colors.secondaryBlack,
    marginBottom: Height * 0.03,
    fontFamily: 'FiraSans-ExtraBold',
  },
  subHeader: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: Height * 0.07,
    fontFamily: 'FiraSans-Regular',
  },
  button: {
    backgroundColor: '#59C6C3',
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: Height * 0.05,
  },
  signInBlock: {
    flexDirection: 'row',
    marginBottom: Height * 0.05,
  },
  signIn: {
    color: '#00AEEF',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
