import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DiseaseButtonGroup = (props) => {
    const [index, setIndex] = useState(0)
    const buttons = ['YES', 'NO']

    return (
        <View style={{ marginHorizontal: wp('3%'), }}>
            <Text style={{ fontWeight: 'bold' }}>Do you have a {props.placeholder} and are you ready for your online visit?</Text>
            <ButtonGroup
                buttons={buttons}
                selectedIndex={index}
                onPress={(selected) => {
                    setIndex(selected)
                    if (selected === 1) {
                        props.nxt.navigate('Intelli')
                    }
                }}
                containerStyle={{ height: 45, borderRadius: 8, width: wp('60%'), marginLeft: wp('-1%'), marginTop: hp('2%'), backgroundColor: 'white' }}
                selectedButtonStyle={{ backgroundColor: 'lightgray' }}
                selectedTextStyle={{ color: 'black' }}
                textStyle={{ color: 'black', fontSize: 14 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default DiseaseButtonGroup;
