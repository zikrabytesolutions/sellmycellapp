/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from './src/assets/colors/color.js';
import StyleCommon from './src/assets/styles/styleCommon.js';
import SplashScreen from './src/screens/splashscreen';
import StartedScreen from './src/screens/startedscreen';
import BrandScreen from './src/screens/mbrandscreen';
import ModelScreen from './src/screens/mmodelscreen';
import HomeScreen from './src/screens/homescreen';
import CityScreen from './src/screens/cityscreen';
import VarientScreen from './src/screens/mvarientscreen';
import SpecificationScreen from './src/screens/mspecification';
import OnOffScreen from './src/screens/qonoffscreen';
import DeclineScreen from './src/screens/qdeclinescreen';
// import TouchSc from './src/screens/qtouchscreen';
import AccessoriesScreen from './src/screens/qaccessories';
import DeviceAgeScreen from './src/screens/qdeviceage';
import DeviceFaultScreen from './src/screens/qdevicefault';
import DeviceConditionScreen from './src/screens/qdevicecondition';
import PincodeScreen from './src/screens/pincodescreen';
import UserMobileScreen from './src/screens/usermobilescreen';
import DeviceValueScreen from './src/screens/devicevalue';
import UserOTPScreen from './src/screens/userotp';
import UserDetailsScreen from './src/screens/userdetails';
import UserAddressScreen from './src/screens/useraddress';
import UserBankScreen from './src/screens/userbank';
import TimeSlotScreen from './src/screens/timeslot';
import OrderPlaceScreen from './src/screens/orderplaced';
import LoginMobileScreen from './src/screens/loginmobile';
import LoginOTPScreen from './src/screens/loginotp';
import EditProfileScreen from './src/screens/profileedit';
import AddressEditScreen from './src/screens/addressedit';
import SearchMobileScreen from './src/screens/searchmobile';
import TermsReadScreen from './src/screens/termsconditionread';
import PincodeUnavailableScreen from './src/screens/pincodeunavailable';
import OrderSuccessScreen from './src/screens/ordersuccess';

import SideMenu from './src/screens/sidemenu';
import OrderHistoryScreen from './src/screens/orderhistory';
import ProfileScreen from './src/screens/profile';
import AboutScreen from './src/screens/aboutus';
import TermsScreen from './src/screens/termscondition';
import PrivacyScreen from './src/screens/privacypolicy';
import ReferalScreen from './src/screens/redeem';

import { fonFix } from './src/utils/fontchange';

fonFix()
const MyDrawerNavigator = createDrawerNavigator({
  Page1: {
    screen: HomeScreen,
  },
  Page2: {
    screen: OrderHistoryScreen
  },
  Page3: {
    screen: ProfileScreen
  },
  Page4: {
    screen: ReferalScreen
  },
  Page5: {
    screen: AboutScreen
  },
  Page6: {
    screen: TermsScreen
  },
  Page7: {
    screen: PrivacyScreen
  },
}, {
  contentComponent: SideMenu,
  // drawerWidth: 280
},
);

const StackNavigator = createStackNavigator({
  Splash: SplashScreen,
  Started: StartedScreen,
  City: CityScreen,
  Home: {
    screen: MyDrawerNavigator,
  },
  Brand: BrandScreen,
  Model: ModelScreen,
  Varient: VarientScreen,
  Specification: SpecificationScreen,
  OnOff: OnOffScreen,
  Decline: DeclineScreen,
  // TouchSc: TouchSc,
  Accessories: AccessoriesScreen,
  DeviceAge: DeviceAgeScreen,
  DeviceFault: DeviceFaultScreen,
  DeviceCondition: DeviceConditionScreen,
  Pincode: PincodeScreen,
  UserMobile: UserMobileScreen,
  DeviceValue: DeviceValueScreen,
  UserOTP: UserOTPScreen,
  UserDetails: UserDetailsScreen,
  UserAddress: UserAddressScreen,
  UserBank: UserBankScreen,
  TimeSlot: TimeSlotScreen,
  OrderPlace: OrderPlaceScreen,
  LoginMobile: LoginMobileScreen,
  LoginOTP: LoginOTPScreen,
  EditProfile: EditProfileScreen,
  AddressEdit: AddressEditScreen,
  SearchMobile: SearchMobileScreen,
  TermsRead: TermsReadScreen,
  PincodeUnavailable: PincodeUnavailableScreen,
  OrderSuccess: OrderSuccessScreen,
},
  {
    defaultNavigationOptions: {
      header: null
    }
  },
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     return {
  //       // title: 'SellMyCell',
  //       // headerLeft:
  //       //   <Icon
  //       //     name="bars"
  //       //     size={22}
  //       //     style={{ marginLeft: 10, padding: 16 }}
  //       //     color="white"
  //       //     onPress={() => navigation.toggleDrawer()}>
  //       //   </Icon>
  //       // ,
  //       headerStyle: {
  //         backgroundColor: COLORS.themeColor,
  //       },
  //       headerTintColor: '#fff',
  //       headerTitleStyle: {
  //         fontWeight: '200',
  //       },
  //     }
  //   },
  // }
);

const AppContainer = createAppContainer(StackNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Home',
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{}</Text>
//         <Text>Home Screen</Text>
//         <Text>{this.props.navigation.getParam('greet')}</Text>
//         <Button
//           title="About"
//           onPress={() => this.props.navigation.navigate('About', {greet:'Message from HomeScreen!'})}
//         />
//       </View>
//     );
//   }
// }
// class AboutScreen extends React.Component {
//   static navigationOptions = {
//     title: 'About',
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>About Screen</Text>
//         <Text>{this.props.navigation.getParam('greet')}</Text>
//         <Button
//           title="Go Home"
//           onPress={() => this.props.navigation.navigate('Home', {greet:'Message from AboutScreen!'})}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 20,
//     textAlign: "center"
//   }
// })

// import React from 'react';
// import SplashScreen from './src/components/splashscreen';
// import StartedScreen from './src/components/startedscreen';
// import BrandScreen from './src/components/mbrandscreen';

// export default class Application extends React.Component {
//     componentWillMount() {
//         this.state = {
//             view : <SplashScreen />
//         };

//         setTimeout(() => {
//             if(true) {            
//                 this.setState({
//                     view : <BrandScreen/>
//                 })
//             }
//         }, 2000)
//     }

//     render() {
//         return (
//             this.state.view
//         )
//     }
// }