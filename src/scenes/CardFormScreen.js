import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {TextInput} from 'react-native';
import {Image} from 'react-native';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Dimensions} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {Colors} from '../../Constants/Colors';
import {onTokenGeneration} from '../actions/Payment';
import stripe from 'tipsi-stripe';

const CardFormScreen = () => {
  const [loading, setLoading] = useState('Pay Now');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [number, setNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const actionsFromRedux = useDispatch();

  const handleCardPayPress = () => {
    setLoading(<ActivityIndicator color={'white'} size="small" />);

    if (number.length < 19 || expiration.length < 5 || cvc.length < 3) {
      setLoading('Pay Now');
      Alert.alert('Payment Denied', 'Please Fill All the Entries...');
      return;
    }

    let expiry = expiration;

    setExpiration(expiry.slice(0, -1));

    let expMonth = expiration.split('/')[0];
    let expYear = expiration.split('/')[1];
    stripe
      .createTokenWithCard({
        cvc: cvc,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        number: number,
      })
      .then((res) => {
        setPaymentMethod(res);
        setLoading('Pay Now');
        actionsFromRedux(onTokenGeneration(res));
        // stripe.charges.create({ amount: 100, currency: 'usd', source: 'tok_mastercard' }).then(res => {
        //   console.log('payment done successfully', res)
        // })
        //   .catch(err => { console.log('err inside charge', err) });
      })
      .catch((err) => {
        console.log(err, 'err');
        setLoading('Pay Now');
      });
  };

  const onHandleChangeText = (val) => {
    setNumber(
      val
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };

  const onHandleExpiration = (val) => {
    setExpiration(
      val
        .replace(/\/?/g, '')
        .replace(/(\d{2})/g, '$1/')
        .trim(),
    );
  };

  const onHandleCvv = (val) => {
    setCvc(val);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/shape.png')}
        style={styles.headerImg}>
        <Image
          source={require('../../assets/logo_sami_aid_white.png')}
          style={styles.logoImg}
        />
      </ImageBackground>
      <View style={styles.contentView}>
        <Text style={styles.header}>Card Number</Text>
        <TextInput
          style={styles.numberStyle}
          value={number}
          onChangeText={onHandleChangeText}
          autoCapitalize={'none'}
          keyboardType={'number-pad'}
          autoCorrect={false}
          maxLength={19}
          placeholder={'1234 5678 9012 3456'}
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.expStyle}>Expiration </Text>
        <TextInput
          style={styles.numberStyle}
          value={expiration}
          onChangeText={onHandleExpiration}
          autoCapitalize={'none'}
          keyboardType={'number-pad'}
          autoCorrect={false}
          maxLength={5}
          placeholder={'MM/YY'}
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.cvvStyle}>CVV</Text>
        <TextInput
          style={styles.numberStyle}
          value={cvc}
          onChangeText={onHandleCvv}
          autoCapitalize={'none'}
          keyboardType={'number-pad'}
          autoCorrect={false}
          maxLength={3}
          secureTextEntry
          placeholder={'123'}
        />
      </View>

      <Button
        title={loading}
        buttonStyle={styles.buttonStyleClearSearch}
        containerStyle={styles.containerStyle}
        onPress={handleCardPayPress}
      />

      <View style={styles.paymentMethod}>
        {paymentMethod && (
          <Text style={styles.instruction}>
            Token: {JSON.stringify(paymentMethod.tokenId)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImg: {
    width: wp('40%'),
    height: hp('7%'),
    resizeMode: 'contain',
    marginLeft: wp('2%'),
  },
  headerImg: {
    width: '100%',
    height: hp('12%'),
    resizeMode: 'contain',
  },
  containerStyle: {
    width: '100%',
  },
  buttonStyleClearSearch: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    marginHorizontal: wp('2%'),
    borderRadius: 7,
    marginTop: '4%',
    marginBottom: '2%',
  },
  contentView: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cvvStyle: {
    fontSize: 20,
    fontFamily: 'FiraSans-Regular',
  },
  expStyle: {
    fontSize: 20,
    fontFamily: 'FiraSans-Regular',
  },
  numberStyle: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    padding: 7,
  },
  container: {
    flex: 1,
    width: '105%',
    height: '100%',
    marginLeft: -10,
    marginTop: -10,
  },
  header: {
    fontSize: 20,
    fontFamily: 'FiraSans-Regular',
  },
  instruction: {
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
});

export default CardFormScreen;
