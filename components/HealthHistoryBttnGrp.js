import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Colors } from '../Constants/Colors';

const HealthHistoryBttnGrp = (props) => {
    const buttons = ['YES', 'NO']
    const [index, setIndex] = useState(props.data.value ? 0 : 1)
    return (
        <View>
            <ButtonGroup
                buttons={buttons}
                selectedIndex={index}
                onPress={(selected) => {
                  setIndex(selected)
                  props.onPress(props.data)
                }}
                containerStyle={styles.containerStyle}
                selectedTextStyle={styles.selectedTextStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                textStyle={styles.textStyle}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        height: 45,
        borderRadius: 7,
        borderColor: Colors.primaryColor,
        marginTop: 15
    },
    selectedTextStyle: {
        color: 'black'
    },
    selectedButtonStyle: {
        backgroundColor: Colors.primaryColor
    },
    textStyle: {
        color: 'black'
    }
});

export default HealthHistoryBttnGrp;
