import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../Constants/Colors';

const BlogCard = (props) => {
  return (
    <View style={styles.parentViewCard}>
      <ImageBackground source={props.image} style={styles.img}>
        <View style={styles.dateMssgDisplay}>
          <View style={styles.dateView}>
            <Text style={styles.date}>{props.day}</Text>
            <Text style={styles.date}>{props.month}</Text>
          </View>
          <View style={styles.mssgView}>
            <Feather name="message-circle" color="gray" size={22} />
            <Text style={styles.mssgNumber}>{props.comment}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{flexDirection: 'row', marginVertical: hp('1%')}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp('2%'),
          }}>
          <Ionicons
            name="person-outline"
            color="gray"
            style={{marginRight: wp('1%')}}
            size={14}
          />
          <Text style={{fontSize: 13, fontFamily: 'FiraSans-Regular'}}>
            {props.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather
            name="file-text"
            color="gray"
            style={{marginRight: wp('1%')}}
            size={14}
          />
          <Text style={{fontSize: 13, fontFamily: 'FiraSans-Regular'}}>
            {props.topic}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'lightgray',
          marginHorizontal: wp('2%'),
          height: 1.5,
        }}
      />

      <View style={styles.contentView}>
        <Text style={styles.questionText}>{props.dataHeader}</Text>
        <Text
          style={styles.answerText}
          numberOfLines={4}
          ellipsizeMode={'clip'}>
          {props.data1}
        </Text>
      </View>

      <Button
        title={'Read More'}
        titleStyle={{
          color: Colors.primaryColor,
          fontFamily: 'FiraSans-Regular',
          fontSize: 18,
        }}
        containerStyle={{
          width: wp('40%'),
          marginLeft: wp('2%'),
          marginVertical: hp('3%'),
        }}
        buttonStyle={{
          borderRadius: 30,
          height: 60,
          borderColor: Colors.primaryColor,
          borderWidth: 1.5,
        }}
        type="outline"
        onPress={() => props.nav.navigate('BlogDetails')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  mssgNumber: {
    color: 'gray',
    fontSize: 17,
  },
  mssgView: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: wp('1%'),
    marginBottom: hp('.4%'),
    borderBottomRightRadius: 11,
  },
  date: {
    color: 'white',
    fontFamily: 'FiraSans-SemiBold',
  },
  dateMssgDisplay: {
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    width: wp('12%'),
    overflow: 'hidden',
    borderBottomRightRadius: 11,
  },
  answerText: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 12,
  },
  questionText: {
    fontFamily: 'FiraSans-SemiBold',
    fontSize: 15,
    marginBottom: hp('1%'),
  },
  contentView: {
    marginHorizontal: wp('2%'),
    overflow: 'hidden',
  },
  img: {
    height: hp('20%'),
  },
  parentViewCard: {
    backgroundColor: 'white',
    elevation: 6,
    borderBottomStartRadius: 11,
    borderBottomEndRadius: 11,
    marginHorizontal: wp('3%'),
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
});

export default BlogCard;
