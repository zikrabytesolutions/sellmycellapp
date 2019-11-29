import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class UserOTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 1,

            mobileId: '',
            isBox: '',
            isBill: '',
            isCharger: '',
            isEarphone: '',
            deviceAge: '',
            glassBroken: '',
            touchIssue: '',
            frontCameraIssue: '',
            backCameraIssue: '',
            wifiIssue: '',
            batteryIssue: '',
            speakerIssue: '',
            micIssue: '',
            volumnIssue: '',
            chargingPinIssue: '',
            powerButtonIssue: '',
            fingerPrintBtnIssue: '',
            faceRegIssue: '',
            deviceCondition: '',
            pincode: '',
            userMobile: '',
            userOtp: '',

            pincodeUnAvailable: false,
        }
    }

    componentDidMount() {
        const mobId = this.props.navigation.getParam('mobile_id', '');
        const isbx = this.props.navigation.getParam('is_box', '');
        const isBil = this.props.navigation.getParam('is_bill', '');
        const isCharg = this.props.navigation.getParam('is_charger', '');
        const isEarp = this.props.navigation.getParam('is_earphone', '');
        const devAg = this.props.navigation.getParam('device_age', '');
        const glsBroken = this.props.navigation.getParam('glass_broken', '');
        const toIssue = this.props.navigation.getParam('touch_issue', '');
        const fcIsue = this.props.navigation.getParam('front_camera_issue', '');
        const bcIssue = this.props.navigation.getParam('back_camera_issue', '');
        const wfIssue = this.props.navigation.getParam('wifi_issue', '');
        const batIssue = this.props.navigation.getParam('battery_issue', '');
        const speakIssue = this.props.navigation.getParam('speaker_issue', '');
        const mcIssue = this.props.navigation.getParam('mic_issue', '');
        const vlmIssue = this.props.navigation.getParam('volumn_issue', '');
        const chPinIssue = this.props.navigation.getParam('chargingpin_issue', '');
        const pBtnIssue = this.props.navigation.getParam('powerbutton_issue', '');
        const finPriBtnIssue = this.props.navigation.getParam('fingerbutton_issue', '');
        const fcIssue = this.props.navigation.getParam('facereg_issue', '');
        const dvcCondition = this.props.navigation.getParam('device_condition', '');
        const pcode = this.props.navigation.getParam('pincode', '');
        const uMob = this.props.navigation.getParam('user_mobile', '');

        this.setState({
            mobileId: mobId,
            isBox: isbx,
            isBill: isBil,
            isCharger: isCharg,
            isEarphone: isEarp,
            deviceAge: devAg,
            glassBroken: glsBroken,
            touchIssue: toIssue,
            frontCameraIssue: fcIsue,
            backCameraIssue: bcIssue,
            wifiIssue: wfIssue,
            batteryIssue: batIssue,
            speakerIssue: speakIssue,
            micIssue: mcIssue,
            volumnIssue: vlmIssue,
            chargingPinIssue: chPinIssue,
            powerButtonIssue: pBtnIssue,
            fingerPrintBtnIssue: finPriBtnIssue,
            faceRegIssue: fcIssue,
            deviceCondition: dvcCondition,
            pincode: pcode,
            userMobile: uMob,
        })
        this.otpSend(uMob);
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    otpSend(mob) {
        this.setState({ timer: 30 });
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
        fetch(Common.BASEURL + 'otp_send.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'user_mobile=' + mob,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                }, function () {
                    if (responseJson.status == 'otp_sent') {
                        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
                    }
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong',
                    color: 'white',
                });
            });
    }

    open = () => {
        if (this.state.userOtp == '') {
            Snackbar.show({
                title: 'Enter OTP',
                color: COLORS.white,
            });
        }
        else {
            fetch(Common.BASEURL + 'otp_verify_pincode.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_mobile=' + this.state.userMobile +
                    '&otp=' + this.state.userOtp +
                    '&pincode=' + this.state.pincode,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                    }, async function () {
                        if (responseJson.status == 'otp_matched') {
                            try {
                                let uid = responseJson.u_id.toString();
                                await AsyncStorage.setItem('@is_login', 'yes')
                                await AsyncStorage.setItem('@user_id', responseJson.u_id.toString())
                                await AsyncStorage.setItem('@full_name', responseJson.u_full_name.toString())
                                await AsyncStorage.setItem('@user_mobile', responseJson.u_mobile.toString())
                                await AsyncStorage.setItem('@user_email', responseJson.u_email.toString())
                                await AsyncStorage.setItem('@referral_code', responseJson.referral_code.toString())
                                if (responseJson.is_pincode_avail != null && responseJson.is_pincode_avail == 'yes') {
                                    this.props.navigation.replace('UserDetails', {
                                        mobile_id: this.state.mobileId,
                                        is_box: this.state.isBox,
                                        is_bill: this.state.isBill,
                                        is_charger: this.state.isCharger,
                                        is_earphone: this.state.isEarphone,
                                        device_age: this.state.deviceAge,
                                        glass_broken: this.state.glassBroken,
                                        touch_issue: this.state.touchIssue,
                                        front_camera_issue: this.state.frontCameraIssue,
                                        back_camera_issue: this.state.backCameraIssue,
                                        wifi_issue: this.state.wifiIssue,
                                        battery_issue: this.state.batteryIssue,
                                        speaker_issue: this.state.speakerIssue,
                                        mic_issue: this.state.micIssue,
                                        volumn_issue: this.state.volumnIssue,
                                        chargingpin_issue: this.state.chargingPinIssue,
                                        powerbutton_issue: this.state.powerButtonIssue,
                                        fingerbutton_issue: this.state.fingerPrintBtnIssue,
                                        facereg_issue: this.state.faceRegIssue,
                                        device_condition: this.state.deviceCondition,
                                        pincode: this.state.pincode,
                                    })
                                }
                                else {
                                    // Alert.alert(
                                    //     "Unavailable service",
                                    //     "Service not available to your current location",
                                    //     [
                                    //         {
                                    //             text: 'OK',
                                    //             style: 'cancel',
                                    //         }
                                    //     ],
                                    //     { cancelable: false },
                                    // );
                                    const city_name = await AsyncStorage.getItem('@city_name')
                                    const state_name = await AsyncStorage.getItem('@state_name')
                                    fetch(Common.BASEURL + 'order_uncomplete.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-type': 'application/x-www-form-urlencoded',
                                            'Cache-Control': 'no-cache'
                                        },
                                        body: 'user_id=' + uid +
                                            '&mobile_id=' + this.state.mobileId +
                                            '&power_on=1' +
                                            '&is_box=' + this.state.isBox +
                                            '&is_bill=' + this.state.isBill +
                                            '&is_charger=' + this.state.isCharger +
                                            '&is_earphone=' + this.state.isEarphone +
                                            '&device_age=' + this.state.deviceAge +
                                            '&glass_broken=' + this.state.glassBroken +
                                            '&touch_issue=' + this.state.touchIssue +
                                            '&front_camera_issue=' + this.state.frontCameraIssue +
                                            '&back_camera_issue=' + this.state.backCameraIssue +
                                            '&wifi_issue=' + this.state.wifiIssue +
                                            '&battery_issue=' + this.state.batteryIssue +
                                            '&speaker_issue=' + this.state.speakerIssue +
                                            '&mice_issue=' + this.state.micIssue +
                                            '&volumn_issue=' + this.state.volumnIssue +
                                            '&chargingpin_issue=' + this.state.chargingPinIssue +
                                            '&power_btn_issue=' + this.state.powerButtonIssue +
                                            '&finger_print_issue=' + this.state.fingerPrintBtnIssue +
                                            '&facereg_issue=' + this.state.faceRegIssue +
                                            '&device_condition=' + this.state.deviceCondition +
                                            '&city=' + city_name +
                                            '&state=' + state_name +
                                            '&pincode=' + this.state.pincode,
                                    })
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            this.setState({
                                                isLoading: false,
                                            });
                                        })
                                        .catch((error) => {
                                            this.setState({
                                                isLoading: false,
                                            });
                                        });

                                    this.setState({
                                        pincodeUnAvailable: true,
                                    });
                                }
                            }
                            catch (e) {
                            }
                        }
                        else if (responseJson.status == 'otp_wrong') {
                            Snackbar.show({
                                title: 'Invalid OTP',
                                color: COLORS.white,
                            });
                        }
                    });
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false,
                    });
                    Snackbar.show({
                        title: 'Sorry, something went wrong',
                        color: 'white',
                    });
                });
        }
    }

    render() {
        if(this.state.pincodeUnAvailable == true)
        {
            this.props.navigation.replace('PincodeUnavailable')
            // return(
            //     <View style={styles.container}>
            //     <View style={StyleCommon.myHeaderBg}>
            //         <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
            //         <Text style={StyleCommon.myHeaderText}>Unavailable service</Text>
            //         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
            //             <Icon name='home' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => {
            //                 const resetAction = StackActions.reset({
            //                     index: 0,
            //                     actions: [NavigationActions.navigate({ routeName: 'Home' })],
            //                 });
            //                 this.props.navigation.dispatch(resetAction);
            //             }} />
            //         </View>
            //     </View>
            //     <ScrollView >
            //         <View>
            //             <Image
            //                 style={{
            //                     flex: 1, 
            //                     height: 300,
            //                     alignSelf:'center',
            //                     marginTop: 50,
            //                     marginHorizontal: 40,
            //                     marginVertical:60,
            //                     marginBottom: 20
            //                 }}
            //                 resizeMode="contain"
            //                 source={require('../assets/images/power-off.png')} />

            //             <Text style={{
            //                 fontSize: 18,
            //                 marginVertical: 30,
            //                 fontWeight: '600',
            //                 marginHorizontal: 30,
            //                 textAlign: 'center',
            //                 color: COLORS.orange,
            //             }}>Service not available to your current location</Text>
            //         </View>
            //     </ScrollView>
            // </View>
            // )
        }
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Verify OTP</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                        <Icon name='home' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }} />
                    </View>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <View style={{ margin: 16 }}>
                            <Text style={[StyleCommon.boldBlackText, { alignSelf: 'center', marginTop: 50 }]}>Mobile Verification</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { alignSelf: 'center', marginTop: 10 }]}>
                                We have sent the OTP on {this.state.userMobile}
                            </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={[StyleCommon.inputBox, { marginTop: 20 }]}
                                placeholder="Enter OTP"
                                onChangeText={text => this.setState({ userOtp: text })} />
                            <View style={{ padding: 10, alignContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                                {(() => {
                                    if (this.state.timer == 1) {
                                        return (
                                            <TouchableOpacity onPress={this.otpSend.bind(this, this.state.userMobile)}>
                                                <Text style={{ color: COLORS.themeColor, fontSize: 20 }}>Resend OTP</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    else {
                                        return (
                                            <Text style={{ color: COLORS.themeColor, fontSize: 20 }}> {this.state.timer} </Text>
                                        )
                                    }
                                })()}
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
});