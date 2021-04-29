import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, LogBox, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Colors } from '../Constants/Colors';
import { checkboxDetails } from '../dummy/StateData';
import Checkboxs from './Checkboxs';

const PatientAssessmentForm = (props) => {
    LogBox.ignoreLogs(['Each child in a list', 'Failed child context type:', 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead'])


    const [selectedValued, setSelectedValue] = useState()

    return (

        <View>
            <FlatList
                data={props.dataProps}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <CheckBox
                                activeOpacity={1}
                                checked={item.isChecked}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                title={item.key}
                                textStyle={{ fontWeight: '600' }}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, ...props.formStyle }}
                                uncheckedColor={'black'}
                                checkedColor={Colors.primaryColor}
                                onPress={() => {
                                    props.onPress(item.key)
                                    let updatedValue = props.dataProps
                                    updatedValue.forEach(values => {
                                        values.key === item.key ?
                                            values.isChecked = !values.isChecked :
                                            values.key !== item.key ? values.isChecked = false : null
                                    })

                                    let update = updatedValue.find(data => data.isChecked === true ? data.key : null)
                                    if (update) {
                                        setSelectedValue(update.key)
                                    }
                                }}

                            />
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default PatientAssessmentForm;
