import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, FlatList, ActivityIndicator, View, StyleSheet, Dimensions, ScrollView, LogBox } from 'react-native';
import { Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Checkboxs from '../../../components/Checkboxs';
import HealthHistoryBttnGrp from '../../../components/HealthHistoryBttnGrp';
import PatientAssessmentForm from '../../../components/PatientAssessmentForm';
import { Colors } from '../../../Constants/Colors';
import { data, HealthGoals, PersonalHealthHistory as Ph, PharmacySelection } from '../../../dummy/StateData'
import firebase from 'firebase'
import { isNull, isUndefined } from 'lodash';

const PersonalHealthHistory = (props) => {
    const [uid, setUid] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [dbValues, setDbValues] = useState()

    const onSubmitHandler = () => {


        firebase.database().ref(`/HealthHistory/${uid}/PersonalHealthHistory/`).update({
            surgeries: Ph[0].value,
            disabled: Ph[1].value,
            hospitalized: Ph[2].value,
            lower: Ph[3].value,
            anesthesia: Ph[4].value
        });


        firebase.database().ref(`/HealthHistory/${uid}/HealthGoals/`).update({
            overall: HealthGoals[0].checkedValue,
            diet: HealthGoals[1].checkedValue,
            sleep: HealthGoals[2].value,
            week: HealthGoals[3].value,
            alcohol: HealthGoals[4].checkedValue,
            tobacco: HealthGoals[5].checkedValue,
            chemicals: HealthGoals[6].checkedValue,
            medical: HealthGoals[7].checkedValue

        })

        firebase.database().ref(`/HealthHistory/${uid}/PharmacySelection/`).update({
            thinners: PharmacySelection[0].value,
            prescription: PharmacySelection[1].value,
            medications: PharmacySelection[2].value,
            pharmacy: PharmacySelection[3].value
        });
    }

    useEffect(() => {
        let DD = Ph
        let id = firebase.auth().currentUser.uid
        setUid(id)

        firebase.auth().onAuthStateChanged(res => {

            firebase.database().ref(`/HealthHistory/${res.uid}/PersonalHealthHistory/`).on('value', res => {
                let data = res.val()
                Ph.map(entries => {
                    if (entries.question.includes('anesthesia')) {
                        entries.value = data.anesthesia
                    }
                    if (entries.question.includes('surgeries')) {
                        entries.value = data.surgeries
                    }
                    if (entries.question.includes('disabled')) {
                        entries.value = data.disabled
                    }
                    if (entries.question.includes('hospitalized')) {
                        entries.value = data.hospitalized
                    }
                    if (entries.question.includes('lower')) {
                        entries.value = data.lower
                    }
                })
            });

            firebase.database().ref(`/HealthHistory/${res.uid}/PharmacySelection/`).on('value', response => {
                setIsLoading(false)
            });
        })
    })

    return (
        <View style={styles.screen}>
            <ImageBackground
                source={require('../../../assets/shape.png')}
                style={styles.headerImg}
            >
                <Ionicons name='arrow-back' color='white' size={40} style={styles.backIcon} onPress={() => props.navigation.goBack()} />
            </ImageBackground>

            {isLoading ? <ActivityIndicator size={'large'} color={Colors.primaryColor} style={styles.indicator} /> :

                <FlatList
                    data={[1]}
                    style={styles.scroll}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text style={styles.headerTxt}>Personal Health History</Text>
                                {Ph.map(val => {
                                    return (
                                        <View style={styles.mapView}>
                                            <Text style={styles.valQuestion}>{val.question}</Text>
                                            <HealthHistoryBttnGrp
                                                onPress={(val) => {
                                                    val.value = !val.value
                                                }}
                                                data={val}
                                            />
                                        </View>
                                    )
                                })}

                                <Text style={{ ...styles.headerTxt, marginTop: 25 }}>Health Goals</Text>

                                {HealthGoals.map(val => {

                                    return (
                                        <View>
                                            <Text style={{ ...styles.valQuestion, marginTop: 20 }}>{val.question}</Text>
                                            {val.type === 0 ?
                                                <PatientAssessmentForm
                                                    dataProps={val.options}
                                                    onPress={(value) => val.checkedValue = value}
                                                    formStyle={styles.formStyle}
                                                />
                                                :
                                                val.type === 1 ?
                                                    <HealthHistoryBttnGrp
                                                        onPress={(val) => {
                                                            val.value = !val.value
                                                        }}
                                                        data={val}
                                                    />
                                                    :
                                                    val.options.map(entries => {
                                                        return (
                                                            <Checkboxs
                                                                state={entries.radioButton}
                                                                title={entries.key}
                                                                values={entries}
                                                                onPress={(data) => {
                                                                    data.radioButton = !data.radioButton
                                                                    let index = val.checkedValue.findIndex(elements => elements === data.key)
                                                                    index !== -1 ? val.checkedValue.splice(index, 1) : val.checkedValue.push(data.key)
                                                                }}
                                                            />
                                                        )
                                                    })
                                            }
                                        </View>
                                    )
                                })}

                                <Text style={{ ...styles.headerTxt, marginTop: 25 }}>Pharmacy Selection</Text>
                                {PharmacySelection.map(val => {
                                    return (
                                        <View>
                                            <Text style={styles.valQuestion}>{val.question}</Text>
                                            <HealthHistoryBttnGrp
                                                onPress={(val) => {
                                                    val.value = !val.value
                                                }}
                                                data={val}
                                            />

                                        </View>
                                    )
                                })}
                                <Button
                                    title={'SAVE'}
                                    titleStyle={styles.titleStyle}
                                    buttonStyle={styles.buttonStyle}
                                    containerStyle={styles.containerStyle}
                                    onPress={onSubmitHandler}
                                />
                            </View>

                        )
                    }}

                />
            }

        </View>
    )
};

const styles = StyleSheet.create({
    indicator: {
        alignItems: 'center',
        marginTop: 20
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'FiraSans-Medium',
    },
    containerStyle: {

    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
        marginHorizontal: wp('2%'),
        marginVertical: hp('2%')
    },
    formStyle: {
        marginLeft: 0,
        fontFamily: 'FiraSans-Regular'
    },
    mapView: {
        marginTop: 15
    },
    valQuestion: {
        fontSize: 17,
        fontFamily: 'FiraSans-Regular',
        marginHorizontal: 10
    },
    headerTxt: {
        fontFamily: 'FiraSans-SemiBold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    },
    scroll: {
        marginTop: 20
    },
    backIcon: {
        backgroundColor: 'transparent',
        width: '10%',
        marginTop: 7
    },
    headerLogo: {
        width: wp('40%'),
        height: hp('7%'),
        resizeMode: 'contain',
        marginLeft: wp('2%')
    },
    headerImg: {
        width: Dimensions.get('window').width,
        height: hp('12%'),
        resizeMode: 'contain'
    },
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default PersonalHealthHistory;
