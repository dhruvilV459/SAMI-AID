import {StackRouter} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Image, Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BlogCard from '../../../components/BlogCard';
import {Colors} from '../../../Constants/Colors';
import {blogData} from '../../../dummy/StateData';

const Blog = (props) => {
  const [data, setData] = useState(blogData);

  const updateData = () => {
    setData((prevState) => [...prevState, ...blogData]);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../../assets/blog_banner.png')}
        style={styles.mainImg}>
        <Image
          source={require('../../../assets/logo_sami_aid_white.png')}
          style={styles.logoImg}
        />

        <Text style={styles.blogText}>BLOG</Text>
        <Text style={styles.blogContent}>
          Our blog is dedicated to inquisitive healthcare consumers. Come here
          for breaking news, practical tips and answers to all your burning
          health-related questions.
        </Text>

        <Input
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: Colors.primaryColor,
            borderRadius: 5,
            backgroundColor: 'white',
          }}
          containerStyle={{marginTop: hp('2%')}}
          placeholder={'Search'}
          placeholderTextColor={Colors.primaryColor}
          inputStyle={{
            fontSize: 16,
            height: 50,
            fontFamily: 'FiraSans-Regular',
            padding: 10,
          }}
          rightIcon={
            <Image
              source={require('../../../assets/search_img.png')}
              style={{height: 35, width: 35}}
              onPress={() => console.log('jeet presseddd')}
            />
          }
        />
      </ImageBackground>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <BlogCard
              nav={props.navigation}
              day={item.day}
              month={item.month}
              comment={item.comment}
              name={item.name}
              topic={item.topic}
              image={item.image}
              dataHeader={item.dataHeader}
              data1={item.data}
            />
          );
        }}
        onEndReached={updateData}
        onEndReachedThreshold={0.25}
      />

      {/* <ScrollView>
        <BlogCard nav={props.navigation} />
        <BlogCard nav={props.navigation} />
        <BlogCard nav={props.navigation} />
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  blogContent: {
    textAlign: 'center',
    marginHorizontal: wp('1%'),
    fontSize: 12,
    color: 'white',
    fontFamily: 'FiraSans-Regular',
  },
  blogText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 27,
    fontFamily: 'FiraSans-SemiBold',
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
});

export default Blog;
