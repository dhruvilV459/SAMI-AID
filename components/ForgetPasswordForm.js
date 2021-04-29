import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  ColorPropType,
  Image,
  //   ScrollView,
} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Input} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgetPasswordForm = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        //   marginTop: '-2%',
        //   position: 'absolute',
        borderRadius: 7,
        marginBottom: '4%',
        marginLeft: '7%',
        width: '100%',
        //   marginRight: '4%',
        marginHorizontal: '5%',
      }}>
      <View style={styles.main}>
        <Text style={styles.subHeader}>account Reset</Text>
        <Text>
          Enter your email address and we will{'\n'}send you a link to reset
          your {'\n'}password
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          placeholderTextColor={Colors.placeholderColor}
        />
        {/* <Input
          placeholder="Enter Email"
          labelStyle={{
            color: '#59c6c3',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'FiraSans-Regular',
          }}
          autoCapitalize={'none'}
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderColor: Colors.primaryColor,
          }}
          inputStyle={{fontFamily: 'FiraSans-Regular', fontSize: 15}}
          // {...props}
          //     ref={ref}
          // onSubmitEditing={props.onSubmitEditing}
        /> */}

        <Button title="SEND" color="#59C6C3" onPress={props.signIn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    zIndex: 3,
    padding: 15,
    backgroundColor: 'white',
    width: '85%',
    paddingLeft: 10,
    elevation: 15,
    flex: 1,
    justifyContent: 'center',
  },
  subHeader: {
    color: '#59C6C3',
    fontSize: 26,
  },

  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#59C6C3',
    marginBottom: '15%',
  },
});

export default ForgetPasswordForm;
