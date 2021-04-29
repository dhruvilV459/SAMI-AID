import React, {useState} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import DashBoardScreen from './src/screens/DashBoardScreen';
import CallDoctor from './src/screens/dashboardAfterScreen/CallDoctor';
import IntelliPhysician from './src/screens/dashboardAfterScreen/IntelliPhysician';
import Blog from './src/screens/dashboardAfterScreen/Blog';
import Profile from './src/screens/dashboardAfterScreen/Profile';
import PatientIntake from './components/PatientIntake';
import NurseScreen from './src/screens/dashboardAfterScreen/NurseScreen';
import BlogDetailsCard from './components/BlogDetailsCard';
import CallEmergencyServices from './src/screens/dashboardAfterScreen/CallEmergencyServices';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import firebase from 'firebase';
import SplashScreen from './src/screens/SplashScreen';
import AccountDetails from './src/screens/dashboardAfterScreen/AccountDetails';
import PersonalHealthHistory from './src/screens/dashboardAfterScreen/PersonalHealthHistory';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [bgColor, setbgColor] = useState();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (index === 0) {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Dashboard',
                params: {},
              }),
            );
          }

          if (!isFocused && !event.defaultPrevented) {
            setbgColor(true);
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              backgroundColor: '#effffe',
              height: Dimensions.get('screen').height / 17,
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('screen').width / 5,
            }}>
            <Image source={icon} style={{height: 40, width: 40}} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = () => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      keyboardHidesTabBar={true}
      tabBarOptions={{
        style: {position: 'absolute'},
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: '#effffe',
      }}>
      <BottomTab.Screen
        name="roots"
        component={App}
        options={{
          tabBarIcon: require('./assets/home_img.png'),
        }}
      />

      {/* <BottomTab.Screen name="CallDoctor" component={CallDoctor} options={{
        tabBarIcon: () => <Image source={require('./assets/md_img.png')} style={{ height: 40, width: 40, }} />
      }} /> */}

      <BottomTab.Screen
        name="CallDoctor"
        component={CallDoctor}
        options={{
          tabBarIcon: require('./assets/md_img.png'),
        }}
      />

      <BottomTab.Screen
        name="Intelli"
        component={IntelliPhysician}
        options={{
          tabBarIcon: require('./assets/search_img.png'),
        }}
      />

      <BottomTab.Screen
        name="Blog"
        component={Blog}
        options={{
          tabBarIcon: require('./assets/people_img.png'),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: require('./assets/logo_img.png'),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Auth = createStackNavigator();

const InitialPath = () => {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} />
      <Auth.Screen name="Signup" component={SignupScreen} />
      <Auth.Screen name="Signin" component={SigninScreen} />
      <Auth.Screen name="Forget" component={ForgetPasswordScreen} />
    </Auth.Navigator>
  );
};

const GettingThings = createStackNavigator();

const OnWardsFlow = () => {
  return (
    <GettingThings.Navigator screenOptions={{headerShown: false}}>
      <GettingThings.Screen name="Dashboard" component={DashBoardScreen} />
      <GettingThings.Screen name="Call" component={Tab} />
      <GettingThings.Screen
        name="Emergency"
        component={CallEmergencyServices}
      />
      <GettingThings.Screen name="Intake" component={PatientIntake} />
      <GettingThings.Screen name="Nurse" component={NurseScreen} />
      <GettingThings.Screen name="BlogDetails" component={BlogDetailsCard} />
      <GettingThings.Screen name="AccountDetails" component={AccountDetails} />
      <GettingThings.Screen name="Personal" component={PersonalHealthHistory} />
      {/* <GettingThings.Screen name="BlogDetails" component={BlogDetailsCard} /> */}
    </GettingThings.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="InitialPath" component={InitialPath} />
        <Stack.Screen name="OnWardsFlow" component={OnWardsFlow} />
        {/* <Stack.Screen name="Dashboard" component={DashBoardScreen} />
        <Stack.Screen name="Call" component={Tab} />
        <Stack.Screen name='Emergency' component={CallEmergencyServices} />
        <Stack.Screen name="Intake" component={PatientIntake} />
        <Stack.Screen name="Nurse" component={NurseScreen} />
        <Stack.Screen name="BlogDetails" component={BlogDetailsCard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      // apiKey: 'AIzaSyA_VjT19iPPnto49cVB4qWNssOai5d92Qw',
      // authDomain: 'sami-aid-8c9cc.firebaseapp.com',
      // projectId: 'sami-aid-8c9cc',
      // storageBucket: 'gs://sami-aid-8c9cc.appspot.com ',
      // messagingSenderId: '809155959321',
      // appId: '1:809155959321:web:bec48de75b9042ffe46888',
      // measurementId: 'G-NCC0H91E93',
      apiKey: 'AIzaSyAMKSsLr7K-1jG5PWImtE20bNK-dWdK5qc',
      authDomain: 'sami-aid-729fa.firebaseapp.com',
      databaseURL: 'https://sami-aid-729fa-default-rtdb.firebaseio.com',
      projectId: 'sami-aid-729fa',
      storageBucket: 'sami-aid-729fa.appspot.com',
      messagingSenderId: '595469284611',
      appId: '1:595469284611:web:5afe2ecb0ad4a36aa5e536',
      measurementId: 'G-PE8YH177DQ',
    });
  } else {
    firebase.app();
  }

  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
