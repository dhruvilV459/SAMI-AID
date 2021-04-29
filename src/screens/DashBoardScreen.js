// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React from 'react';
// import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, Linking } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import DashBoardContent from '../../components/DashBoardContent';
// import firebase from 'firebase'

// const DashBoardScreen = (props) => {
//     AsyncStorage.getItem('user').then(async (res) => {
//         // console.log('dash', JSON.parse(res))
//         let user = await firebase.auth().currentUser
//         // console.log('user')

//     })
//         .catch(err => console.log(err))

//     return (
//         <View>

//             <ImageBackground
//                 source={require('../../assets/background_home.png')}
//                 style={styles.homeImg}
//             >
//                 <Image
//                     source={require('../../assets/home_logo.png')}
//                     style={styles.homeLogo}
//                 />

//                 <Text style={styles.homeText}>Welcome to the SAMI-Aid Mobile App. The SAMI-Aid team is here to help you navigate the complex world of healthcare. Your first step to a healthier life starts right here!</Text>

//                 <ScrollView>
//                     <View style={styles.mainDashView}>

//                         <View style={{ width: '100%', flexDirection: 'row', }}>
//                             <DashBoardContent
//                                 placeholder='LEARN ABOUT SAMI-AID PREMIUM'
//                                 image={require('../../assets/home_img.png')}
//                                 onPress={() => Linking.openURL('https://samiaid.com/membership-plans')}
//                             />
//                             <DashBoardContent
//                                 placeholder='CALL A DOCTOR OR NURSE'
//                                 image={require('../../assets/md_img.png')}
//                                 onPress={() => props.navigation.navigate('Call', { screen: 'CallDoctor' })}
//                             />
//                         </View>

//                         <View style={{ width: '50%', flexDirection: 'row', }}>

//                             <DashBoardContent
//                                 placeholder='INTELLIGENT PHYSICIAN MATCH'
//                                 image={require('../../assets/search_img.png')}
//                                 onPress={() => props.navigation.navigate('Call', { screen: 'Intelli' })}
//                             />
//                             <DashBoardContent
//                                 placeholder='SAMI-AID HEALTH BLOG'
//                                 image={require('../../assets/people_img.png')}
//                                 onPress={() => props.navigation.navigate('Call', { screen: 'Blog' })}
//                             />
//                         </View>
//                         <View style={{ width: '50%', flexDirection: 'row', }}>
//                             <DashBoardContent
//                                 placeholder='CALL SAMI-AID OR DIAL 911'
//                                 image={require('../../assets/contact_img.png')}
//                                 onPress={() => props.navigation.navigate('Emergency')}

//                             />
//                             <DashBoardContent
//                                 placeholder='MY SAMI-AID PROFILE'
//                                 image={require('../../assets/logo_img.png')}
//                                 onPress={() => props.navigation.navigate('Call', { screen: 'Profile' })}
//                             />
//                         </View>
//                     </View>
//                 </ScrollView>
//             </ImageBackground>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     mainDashView: {
//         backgroundColor: 'white',
//         marginTop: 20,
//         elevation: 8,
//         borderRadius: 13,
//         marginHorizontal: wp('3%'),
//         marginBottom: hp('5%'),
//         paddingBottom: hp('1.5%'),
//         paddingTop: hp('1%')
//     },
//     homeText: {
//         fontSize: 12,
//         color: 'white',
//         marginHorizontal: wp('4%')
//     },
//     homeLogo: {
//         width: wp('35%'),
//         height: hp('20%'),
//         resizeMode: 'contain',
//         alignSelf: 'center'
//     },
//     homeImg: {
//         height: hp('100%'),
//         width: wp('100%')
//     }
// });

// export default DashBoardScreen;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DashBoardContent from '../../components/DashBoardContent';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';

const DashBoardScreen = (props) => {
  AsyncStorage.getItem('user')
    .then(async (res) => {
      // console.log('dash', JSON.parse(res))
      let user = await firebase.auth().currentUser;
      // console.log('user')
    })
    .catch((err) => console.log(err));

  return (
    <View>
      <ImageBackground
        source={require('../../assets/background_home.png')}
        style={styles.homeImg}>
        <Image
          source={require('../../assets/home_logo.png')}
          style={styles.homeLogo}
        />

        <Text style={styles.homeText}>
          Welcome to the SAMI-Aid Mobile App. The SAMI-Aid team is here to help
          you navigate the complex world of healthcare. Your first step to a
          healthier life starts right here!
        </Text>
        <Animatable.View animation="slideInUp" duration={3000}>
          <ScrollView>
            <View style={styles.mainDashView}>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <DashBoardContent
                  placeholder="LEARN ABOUT SAMI-AID PREMIUM"
                  image={require('../../assets/home_img.png')}
                  onPress={() =>
                    Linking.openURL('https://samiaid.com/membership-plans')
                  }
                />
                <DashBoardContent
                  placeholder="CALL A DOCTOR OR NURSE"
                  image={require('../../assets/md_img.png')}
                  onPress={() =>
                    props.navigation.navigate('Call', {screen: 'CallDoctor'})
                  }
                />
              </View>

              <View style={{width: '50%', flexDirection: 'row'}}>
                <DashBoardContent
                  placeholder="INTELLIGENT PHYSICIAN MATCH"
                  image={require('../../assets/search_img.png')}
                  onPress={() =>
                    props.navigation.navigate('Call', {screen: 'Intelli'})
                  }
                />
                <DashBoardContent
                  placeholder="SAMI-AID HEALTH BLOG"
                  image={require('../../assets/people_img.png')}
                  onPress={() =>
                    props.navigation.navigate('Call', {screen: 'Blog'})
                  }
                />
              </View>
              <View style={{width: '50%', flexDirection: 'row'}}>
                <DashBoardContent
                  placeholder="CALL SAMI-AID OR DIAL 911"
                  image={require('../../assets/contact_img.png')}
                  onPress={() => props.navigation.navigate('Emergency')}
                />
                <DashBoardContent
                  placeholder="MY SAMI-AID PROFILE"
                  image={require('../../assets/logo_img.png')}
                  onPress={() =>
                    props.navigation.navigate('Call', {screen: 'Profile'})
                  }
                />
              </View>
            </View>
          </ScrollView>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDashView: {
    backgroundColor: 'white',
    marginTop: 20,
    elevation: 8,
    borderRadius: 13,
    marginHorizontal: wp('3%'),
    marginBottom: hp('5%'),
    paddingBottom: hp('1.5%'),
    paddingTop: hp('1%'),
  },
  homeText: {
    fontSize: 12,
    color: 'white',
    marginHorizontal: wp('4%'),
  },
  homeLogo: {
    width: wp('35%'),
    height: hp('20%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  homeImg: {
    height: hp('100%'),
    width: wp('100%'),
  },
});

export default DashBoardScreen;
