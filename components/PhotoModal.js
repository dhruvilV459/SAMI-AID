import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../Constants/Colors';
import EmptySelectBox from './EmptySelectBox';

const PhotoModal = (props) => {

    return (
        <View>
            <Modal
                transparent
                animationType={'slide'}
                onRequestClose={() => { props.onClose() }}
                visible={props.visible}
            >
                <TouchableWithoutFeedback onPress={() => props.onClose()}>
                    <View style={styles.screen}>
                        <View style={{ backgroundColor: Colors.primaryColor, marginHorizontal: widthPercentageToDP('4%') }}>
                            <TouchableOpacity style={styles.innerView} activeOpacity={1} onPress={() => console.log('camera')}>
                                <Text style={styles.txt}>Open Camera</Text>
                            </TouchableOpacity>
                            {/* <View style={styles.ruler} /> */}
                            <TouchableOpacity style={styles.innerView} activeOpacity={1} onPress={() => console.log('gallery')}>
                                <Text style={styles.txt}>Open Gallery</Text>
                            </TouchableOpacity>


                            <Button
                                title="CLOSE"
                                titleStyle={{ color: Colors.primaryColor }}
                                buttonStyle={{ backgroundColor: 'white', borderRadius: 5, padding: '4%', }}
                                containerStyle={{ marginHorizontal: widthPercentageToDP('5%'), marginVertical: 20 }}
                                onPress={() => props.onClose()}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>


            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    txt: {
        color: 'white',
        fontFamily: 'FiraSans-Regular',
        fontSize: 16
    },
    ruler: {
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    innerView: {
        backgroundColor: Colors.primaryColor,
        padding: 20,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
});

export default PhotoModal;
