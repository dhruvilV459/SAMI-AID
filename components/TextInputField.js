import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

const TextInputField = (props) => {
  return (
    <View>
      <Text
        style={{
          textAlignVertical: 'top',
          marginTop: hp('1%'),
          fontFamily: 'FiraSans-Regular',
          fontWeight: '500',
          marginLeft: wp('2%'),
          ...props.labelStyle,
        }}>
        {props.label} <Icon name="star-outlined" color="red" size={9} />{' '}
      </Text>
      {/* <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          backgroundColor: 'white',
          marginTop: hp('1%'),
          ...props.borderStyle,
        }}
        // marginLeft: wp('-2.5%')
        keyboardType={props.keyboardType}
        secureTextEntry={props.pass}
        containerStyle={{marginBottom: hp('-2%')}}
        placeholder={props.placeholder}
        inputStyle={{fontSize: 13, fontFamily: 'FiraSans-Regular'}}
        onChangeText={(val) => props.onChangeText(val)}
        disabled={props.dis}
        value={props.value}
        maxLength={props.maxLength}
        errorMessage={props.errorMessage}
        onBlur={props.onBlur}
        errorStyle={{
          color: 'red',
          fontFamily: 'FiraSans-Regular',
          marginBottom: hp('2%'),
        }}
      /> */}
      <Input
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          backgroundColor: 'white',
          marginTop: hp('1%'),
          ...props.borderStyle,
        }}
        // marginLeft: wp('-2.5%')
        keyboardType={props.keyboardType}
        secureTextEntry={props.pass}
        containerStyle={{marginBottom: hp('-2%')}}
        placeholder={props.placeholder}
        inputStyle={{fontSize: 13, fontFamily: 'FiraSans-Regular'}}
        onChangeText={(val) => props.onChangeText(val)}
        disabled={props.dis}
        value={props.value}
        maxLength={props.maxLength}
        errorMessage={props.errorMessage}
        onBlur={props.onBlur}
        errorStyle={{
          color: 'red',
          fontFamily: 'FiraSans-Regular',
          marginBottom: hp('2%'),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TextInputField;
