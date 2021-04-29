import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../Constants/Colors';
import TextInputField from './TextInputField';


const BlogDetailsCard = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white',  }}>

            <ImageBackground
                source={require('../assets/blog_banner.png')}
                style={styles.mainImg}
            >
                <Image
                    source={require('../assets/logo_sami_aid_white.png')}
                    style={styles.logoImg}
                />

                <Text style={styles.blogText}>BLOG</Text>
            </ImageBackground>

            <ScrollView>
                <View style={styles.parentViewCard}>
                    <ImageBackground source={require('../assets/back.jpg')} style={styles.img}>
                        <View style={styles.dateMssgDisplay}>
                            <View style={styles.dateView}>
                                <Text style={styles.date}>01</Text>
                                <Text style={styles.date}>Jan</Text>
                            </View>
                            <View style={styles.mssgView}>
                                <Feather name='message-circle' color='gray' size={22} />
                                <Text style={styles.mssgNumber}>4</Text>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ flexDirection: 'row', marginVertical: hp('1%') }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: wp('2%') }}>
                            <Ionicons name='person-outline' color='gray' style={{ marginRight: wp('1%') }} size={14} />
                            <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular' }}>Bijan Farhangui</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name='file-text' color='gray' style={{ marginRight: wp('1%') }} size={14} />
                            <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular' }}>Medical Tourism</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'lightgray', marginHorizontal: wp('2%'), height: 1.5 }} />

                    <View style={styles.contentView}>
                        <Text style={styles.questionText}>What Are the Risks and Benefits Associated with Medical Tourism?</Text>
                        <Text style={styles.answerText}>If you need an elective mdeical procedure that will cost you <FontAwesome name='dollar' style={{ fontWeight: 'normal' }} />6,000 or more in the Uniterd States, then you can probably save between 30% and 80% by going abroad for that treatment.However, it's crucial to weigh all the costs and benefits, not just sticker prices. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
                    </View>

                    <View style={{ marginHorizontal: wp('2%') }}>
                        <View style={{ backgroundColor: Colors.primaryColor, height: 1, marginVertical: hp('4%') }} />

                        <Text style={{ fontFamily: 'FiraSans-SemiBold', fontSize: 15 }}>Write your Comment</Text>

                        <Input
                            label='Name'
                            placeholder='Enter Name'
                            labelStyle={{ color: Colors.primaryColor, fontSize: 13, fontFamily: 'FiraSans-Regular', fontWeight: 'normal', marginTop: hp('2%') }}
                            inputStyle={{ fontFamily: 'FiraSans-Regular', fontSize: 16, }}
                            inputContainerStyle={{ borderBottomColor: Colors.primaryColor }}
                            containerStyle={{marginBottom: hp('-2%')}}
                        />

                        <Input
                            label='Email Address'
                            placeholder='Enter Email'
                            labelStyle={{ color: Colors.primaryColor, fontSize: 13, fontFamily: 'FiraSans-Regular', fontWeight: 'normal', marginTop: hp('2%') }}
                            inputStyle={{ fontFamily: 'FiraSans-Regular', fontSize: 16, }}
                            inputContainerStyle={{ borderBottomColor: Colors.primaryColor }}
                            containerStyle={{marginBottom: hp('-2%')}}
                        />

                        <Input
                            label='Comment'
                            placeholder='Write Comment'
                            labelStyle={{ color: Colors.primaryColor, fontSize: 13, fontFamily: 'FiraSans-Regular', fontWeight: 'normal', marginTop: hp('2%') }}
                            inputStyle={{ fontFamily: 'FiraSans-Regular', fontSize: 16, }}
                            inputContainerStyle={{ borderBottomColor: Colors.primaryColor }}
                            containerStyle={{marginBottom: hp('-2%')}}
                        />

                        <Button
                            title='SUBMIT'
                            titleStyle={{fontSize: 15, fontFamily: 'FiraSans-SemiBold' }}
                            buttonStyle={{backgroundColor: Colors.primaryColor, padding: 12, marginTop: hp('2%')}}
                            
                        />
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    blogText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 27,
        fontFamily: 'FiraSans-SemiBold'
    },
    logoImg: {
        width: wp('42%'),
        height: hp('8%'),
        resizeMode: 'contain',
        marginLeft: wp('2%'),
    },
    mainImg: {
        width: wp('100%'),
        height: hp('30%'),
        resizeMode: 'contain',
    },
    dateView: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginVertical: hp('1%')
    },
    mssgNumber: {
        color: 'gray',
        fontSize: 17
    },
    mssgView: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: wp('1%'),
        marginBottom: hp('.4%'),
        borderBottomRightRadius: 11
    },
    date: {
        color: 'white',
        fontFamily: 'FiraSans-SemiBold',
    },
    dateMssgDisplay: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        width: wp('12%'),
        overflow: 'hidden',
        borderBottomRightRadius: 11
    },
    answerText: {
        fontFamily: 'FiraSans-Regular',
        fontSize: 14
    },
    questionText: {
        fontFamily: 'FiraSans-SemiBold',
        fontSize: 15,
        marginBottom: hp('1%')
    },
    contentView: {
        marginHorizontal: wp('2%'),
        overflow: 'hidden'
    },
    img: {
        height: hp('20%'),
    },
    parentViewCard: {
        backgroundColor: 'white',
        elevation: 6,
        borderBottomStartRadius: 11,
        borderBottomEndRadius: 11,
        // marginTop: hp('3%'),
        marginHorizontal: wp('3%'),
        overflow: 'hidden',
        marginBottom: hp('2%'),
        paddingBottom: hp('1%')
    }
});

export default BlogDetailsCard;
