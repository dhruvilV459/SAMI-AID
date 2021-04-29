import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { isNil } from 'lodash';


const EmptySelectBox = React.forwardRef((props, ref) => {
    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState('')
    const [errMessage, setErrMessage] = useState()

    return (
        <TouchableOpacity
            ref={ref}
            onPress={() => {
                setModal(!modal);
            }}
            style={{ backgroundColor: 'white', marginHorizontal: wp('2.5%') }}
        >
            <View>
                <View style={styles.screen}>
                        <Text numberOfLines={1} style={styles.selectData}>{selectedData}</Text>
                    <View style={styles.dropDownIcon}>
                        <AntDesign name="down" size={20} style={{ alignSelf: 'center' }} color={Colors.primaryColor} />
                    </View>

                    {props.heightPlaceholderTxt ? <Text style={styles.heightPlaceholderTxt}>{props.heightPlaceholderTxt}</Text> : null}

                </View>

            </View>
            <Modal
                visible={modal}
                animationType={"slide"}
                transparent
                onRequestClose={() => {
                    // selectedData ? setErrMessage(!errMessage) : setErrMessage(!errMessage)
                    setModal(!modal)
                    props.displayError(selectedData)
                }}

            >
                <View style={styles.modal}>
                    <View style={styles.modalMainView}>
                        <FlatList
                            data={props.values}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setSelectedData(item.value)
                                        setModal(!modal)
                                        // console.log(item.label)
                                        props.onChange(item.value)

                                    }}   >
                                        <Text style={styles.itemLabel}>{item.label}</Text>

                                    </TouchableOpacity>
                                )
                            }}

                        />
                        <View style={{ marginHorizontal: wp('5%'), paddingTop: '2%' }}>
                            <Button
                                title="CLOSE"
                                titleStyle={{ color: Colors.primaryColor }}
                                buttonStyle={{ backgroundColor: 'white', padding: '3.2%', borderRadius: 5 }}
                                onPress={() => {
                                    setModal(!modal)
                                    props.displayError(selectedData)
                                }}
                            // onBlur={() => isNil(selectedData) ? setErrMessage('Select Proper Values') : setErrMessage('')}

                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
})

const styles = StyleSheet.create({
    heightPlaceholderTxt: {
        color: Colors.primaryColor,
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
        paddingHorizontal: 10
    },
    dropDownIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    selectData: {
        color: Colors.primaryColor,
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,.5)',
        flex: 1,
        justifyContent: 'center'
    },
    itemLabel: {
        color: 'white',
        fontSize: 22,
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    modalMainView: {
        marginVertical: hp('20%'),
        marginHorizontal: wp('4%'),
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        paddingVertical: '2%'
    },
    screen: {
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 7,
        padding: '4%',
        marginTop: '3%',
        flexDirection: 'row',
        marginBottom: hp('2.8%'),
    }
});

export default EmptySelectBox;
