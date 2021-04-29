import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import {Colors} from '../../../Constants/Colors';

const CallDoctor = (props) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/connectToMDback_image.png')}
        style={styles.mainImg}>
        <Image
          source={require('../../../assets/home_logo.png')}
          style={styles.homeLogo}
        />
      </ImageBackground>

      <ScrollView
        style={{
          marginTop: hp('-27%'),
          marginHorizontal: wp('4%'),
          backgroundColor: 'white',
          elevation: 7,
          marginBottom: hp('5%'),
          borderRadius: 13,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
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
            onPress={() => props.navigation.navigate('Intake', {value: 'dr'})}>
            <Image
              source={require('../../../assets/md_img.png')}
              style={styles.imglogo}
            />
            <Text style={styles.text}>Speak To Doctors</Text>
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
            onPress={() => props.navigation.navigate('Intake', {value: 'nr'})}>
            <Image
              source={require('../../../assets/contact_img_white.png')}
              style={styles.imglogo}
            />
            <Text style={{...styles.text, color: 'white'}}>Speak To Nurse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 8,
              backgroundColor: 'white',
              padding: 15,
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 7,
            }}
            onPress={() => props.navigation.navigate('Intake', {value: 'bh'})}>
            <Image
              source={require('../../../assets/md_img.png')}
              style={styles.imglogo}
            />
            <Text style={styles.text}>Speak To Psychiatrist (BH)</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Connect to Emergency Services to anywhere in the world
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 18,
  },
  bottomText: {
    marginHorizontal: wp('4%'),
    textAlign: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },
  buttonView: {
    marginHorizontal: wp('4%'),
    borderRadius: 13,
  },
  mainImg: {
    width: wp('100%'),
    height: Dimensions.get('window').height / 1.8,
    resizeMode: 'contain',
  },
  homeLogo: {
    width: wp('40%'),
    height: hp('25%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imglogo: {
    height: hp('7%'),
    width: wp('13%'),
  },
});

export default CallDoctor;
