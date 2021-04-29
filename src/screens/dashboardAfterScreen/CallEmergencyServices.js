import React from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../../Constants/Colors';

const CallEmergencyServices = (props) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/connectToMDback_image.png')}
        style={styles.mainBackGroundImg}>
        <Image
          source={require('../../../assets/home_logo.png')}
          style={styles.logoImg}
        />
      </ImageBackground>
      <View style={{height: 150}}>
        <ScrollView
          style={{
            marginHorizontal: wp('4%'),
            elevation: 7,
            borderRadius: 13,
            marginTop: hp('-27%'),
            backgroundColor: 'white',
          }}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 15,
              elevation: 7,
              margin: 20,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL(`tel:${9328414235}`)}>
            <Image
              source={require('../../../assets/md_img.png')}
              style={styles.imglogo}
            />
            <Text style={styles.text}>CALL YOUR SAMI-AID CONCIERGE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 8,
              backgroundColor: Colors.primaryColor,
              padding: 15,
              marginHorizontal: 20,
              elevation: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL(`tel:${911}`)}>
            <Image
              source={require('../../../assets/contact_img_white.png')}
              style={styles.imglogo}
            />
            <Text style={{...styles.text, color: 'white'}}>
              CONNECT TO EMERGENCY SERVICES
            </Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Connect to Emergency Services to anywhere in the world
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    marginHorizontal: wp('4%'),
    textAlign: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
    fontFamily: 'FiraSans-Medium',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'FiraSans-SemiBold',
  },
  logoImg: {
    width: wp('40%'),
    height: hp('25%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainBackGroundImg: {
    height: Dimensions.get('screen').height / 1.9,
    width: wp('100%'),
    resizeMode: 'contain',
  },
  imglogo: {
    height: hp('7%'),
    width: wp('13%'),
  },
});

export default CallEmergencyServices;
