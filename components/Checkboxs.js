import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Colors } from '../Constants/Colors';

const Checkboxs = (props) => {
    const [checked, setChecked] = useState(props.state)
    return (
        <View>
            <CheckBox
                activeOpacity={1}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0,  }}
                uncheckedColor={'black'}
                checkedColor={Colors.primaryColor}
                title={props.title}
                checked={checked}
                onPress={() => {
                    setChecked(!checked)
                    props.onPress(props.values)
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({

});

export default Checkboxs;
