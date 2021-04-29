import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/routers';
import * as Animatable from 'react-native-animatable';

const SplashScreen = (props) => {
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((res) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'OnWardsFlow'}],
              }),
            );
          } else {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'InitialPath'}],
              }),
            );
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // <View style={styles.splash}>
    //   <Image
    //     source={require('../../assets/logo_img.png')}
    //     style={{
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   />
    //   <ActivityIndicator size={'large'} color={'black'} />
    // </View>
    setTimeout(() => {
      props.navigation.replace('Welcome');
    }, 3500),
    (
      <Animatable.View
        animation="bounceIn"
        easing="ease-in"
        style={styles.main}>
        <Animatable.View
          animation="pulse"
          easing="ease-in-out-circ"
          iterationCount={'infinite'}>
          <View>
            <StatusBar barStyle="default" backgroundColor="black" />
            <Image
              style={styles.logo}
              source={require('../../assets/logo_img.png')}
            />
          </View>
        </Animatable.View>
      </Animatable.View>
    )
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SplashScreen;
