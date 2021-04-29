import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Colors } from '../Constants/Colors';


const SignupCard = React.forwardRef((props, ref) => {
    return (
        <Input
            label={props.label}
            placeholder={props.placeholder}
            labelStyle={{ color: '#59c6c3', fontSize: 16, fontWeight: 'normal', fontFamily: 'FiraSans-Regular' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputContainerStyle={{ borderBottomWidth: 1, borderColor: Colors.primaryColor, }}
            inputStyle={{ fontFamily: 'FiraSans-Regular', fontSize: 15, }}
            {...props}
            ref={ref}
            onSubmitEditing={props.onSubmitEditing}
        />
    );
})

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
    }
});

export default SignupCard;
