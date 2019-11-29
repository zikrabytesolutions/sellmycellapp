import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, Alert, ToastAndroid, TextInput } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { CheckBox } from 'react-native-elements';

export default class OrderPlacedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            orderNumber: '',

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
            addressType: '',
            addressFirst: '',
            addressSecond: '',
            locality: '',
            city: '',
            astate: '',
            pincode: '',
            paymentType: '',
            accountNo: '',
            beneficiaryName: '',
            ifscCode: '',
            bankName: '',
            upiId: '',
            pickupDate: '',
            pickupTimeSlot: '',
            finalPrice: '',

            userId: '',
            fullName: '',
            mobile: '',
            email: '',
            termsChecked: false,
            referral_code: '',
            is_referral_applied: false,
            referral_amount: 0,
        }
    }

    async componentDidMount() {
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
        const adTyp = this.props.navigation.getParam('address_type', '');
        const adFirst = this.props.navigation.getParam('address_first', '');
        const adSec = this.props.navigation.getParam('address_second', '');
        const loca = this.props.navigation.getParam('locality', '');
        const ct = this.props.navigation.getParam('city', '');
        const ast = this.props.navigation.getParam('astate', '');
        const pcode = this.props.navigation.getParam('pincode', '');
        const pyType = this.props.navigation.getParam('payment_type', '');
        const acno = this.props.navigation.getParam('account_no', '');
        const benfname = this.props.navigation.getParam('beneficiary_name', '');
        const ifscd = this.props.navigation.getParam('ifsc_code', '');
        const bnkname = this.props.navigation.getParam('bank_name', '');
        const upId = this.props.navigation.getParam('upi_id', '');
        const pickDt = this.props.navigation.getParam('pickup_date', '');
        const pickTS = this.props.navigation.getParam('pickup_time_slot', '');

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
            addressType: adTyp,
            addressFirst: adFirst,
            addressSecond: adSec,
            locality: loca,
            city: ct,
            astate: ast,
            pincode: pcode,
            paymentType: pyType,
            accountNo: acno,
            beneficiaryName: benfname,
            ifscCode: ifscd,
            bankName: bnkname,
            upiId: upId,
            pickupDate: pickDt,
            pickupTimeSlot: pickTS
        })

        const user_id = await AsyncStorage.getItem('@user_id')
        const full_name = await AsyncStorage.getItem('@full_name')
        const user_mobile = await AsyncStorage.getItem('@user_mobile')
        const user_email = await AsyncStorage.getItem('@user_email')
        this.setState({
            userId: user_id,
            fullName: full_name,
            mobile: user_mobile,
            email: user_email
        })
        return fetch(Common.BASEURL + 'mobilevalue.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'mobileId=' + mobId +
                '&isBox=' + isbx +
                '&isBill=' + isBil +
                '&isCharger=' + isCharg +
                '&isEarphone=' + isEarp +
                '&deviceAge=' + devAg +
                '&glassBroken=' + glsBroken +
                '&touchIssue=' + toIssue +
                '&frontCameraIssue=' + fcIsue +
                '&backCameraIssue=' + bcIssue +
                '&wifiIssue=' + wfIssue +
                '&batteryIssue=' + batIssue +
                '&speakerIssue=' + speakIssue +
                '&micIssue=' + mcIssue +
                '&volumnIssue=' + vlmIssue +
                '&chargingPinIssue=' + chPinIssue +
                '&powerButtonIssue=' + pBtnIssue +
                '&fingerPrintBtnIssue=' + finPriBtnIssue +
                '&faceRegIssue=' + fcIssue +
                '&deviceCondition=' + dvcCondition,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
                        finalPrice: responseJson.data.final_price
                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        dataSource: [],
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong.',
                    color: 'white',
                });
            });
    }

    applyCode = () => {
        fetch(Common.BASEURL + 'coupon_apply.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'user_id=' + this.state.userId +
                '&referral_code=' + this.state.referral_code,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                }, function () {
                    if (responseJson.redeem_status == 'code_applied') {
                        ToastAndroid.show('Code applied', ToastAndroid.SHORT);
                        this.setState({
                            is_referral_applied: true,
                            referral_amount: responseJson.amount
                        });
                    }
                    else {
                        ToastAndroid.show('Invalid Code', ToastAndroid.SHORT);
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
        if (this.state.termsChecked == false) {
            Snackbar.show({
                title: 'Please accept the terms and conditions.',
                color: 'white',
            });
        }
        else {
            const options = { title: "Processing...", message: "Please wait", isCancelable: false }
            fetch(Common.BASEURL + 'orderplace.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_id=' + this.state.userId +
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
                    '&address_type=' + this.state.addressType +
                    '&address_first=' + this.state.addressFirst +
                    '&address_second=' + this.state.addressSecond +
                    '&locality=' + this.state.locality +
                    '&city=' + this.state.city +
                    '&state=' + this.state.astate +
                    '&pincode=' + this.state.pincode +
                    '&payment_type=' + this.state.paymentType +
                    '&account_no=' + this.state.accountNo +
                    '&beneficiary_name=' + this.state.beneficiaryName +
                    '&ifsc_code=' + this.state.ifscCode +
                    '&bank_name=' + this.state.bankName +
                    '&upi_id=' + this.state.upiId +
                    '&pickup_data=' + this.state.pickupDate +
                    '&pickup_time_slot=' + this.state.pickupTimeSlot +
                    '&referral_code=' + this.state.referral_code +
                    '&final_price=' + this.state.finalPrice,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                    });
                    if (responseJson.status == 'success') {
                        this.setState({
                            orderNumber: responseJson.order_number + '',
                        });
                        if (this.state.orderNumber != '') {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({
                                    routeName: 'OrderSuccess',
                                    params: {
                                        order_number: this.state.orderNumber,
                                        mobile_img: this.state.dataSource.mobile_img
                                    }
                                })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                    }
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

    // goHome = () => {
    //     const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'Home' })],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        // else if (this.state.orderNumber != '') {
        //     return (
        //         <View style={styles.container}>
        //             <View style={StyleCommon.myHeaderBg}>
        //                 {/* <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont> */}
        //                 <Text style={StyleCommon.myHeaderText}>Order</Text>
        //                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
        //                     <Icon name='home' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => {
        //                         const resetAction = StackActions.reset({
        //                             index: 0,
        //                             actions: [NavigationActions.navigate({ routeName: 'Home' })],
        //                         });
        //                         this.props.navigation.dispatch(resetAction);
        //                     }} />
        //                 </View>
        //             </View>
        //             <ScrollView>
        //                 <Image style={styles.img}
        //                     resizeMode="contain"
        //                     source={{ uri: this.state.dataSource.mobile_img }} />
        //                 <View style={[styles.container, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
        //                     <Text style={{ fontWeight: '700', fontSize: 18, marginTop: 20 }}>Order No. # {this.state.orderNumber}</Text>
        //                     <Text style={{ fontSize: 16, marginTop: 5 }}>Your order has been placed successfully.</Text>
        //                 </View>
        //                 <View style={[StyleCommon.inputsContainer, { marginTop: 30 }]}>
        //                     <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.goHome}>
        //                         <Text style={StyleCommon.fullWidthButtonText}>Done</Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             </ScrollView >
        //         </View>
        //     )
        // }
        else if (this.state.dataSource.length != 0) {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Order</Text>
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
                            <Image style={styles.img}
                                resizeMode="contain"
                                source={{ uri: this.state.dataSource.mobile_img }} />
                            <Text style={styles.phoneTitle}>{this.state.dataSource.mobile_title}</Text>
                            <View style={{ height: 2, borderRadius: 100, marginHorizontal: 30, marginVertical: 12, backgroundColor: COLORS.dividerColor }}></View>
                            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                                <Text style={styles.specTxt}>Device Summary</Text>
                                <View style={{ margin: 5 }}>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Power On: </Text>
                                        <Text style={styles.deviceTextRight}>Yes</Text>
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Device Age: </Text>
                                        {(() => {
                                            switch (this.state.deviceAge) {
                                                case 'below_3':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>0-3 Months</Text>
                                                    )
                                                    break;
                                                case '3_to_6':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>3-6 Months</Text>
                                                    )
                                                    break;
                                                case '6_to_11':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>6-11 Months</Text>
                                                    )
                                                    break;
                                                case 'above_11':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>Above 11 Months</Text>
                                                    )
                                                    break;
                                                default:
                                                    return (
                                                        <Text style={styles.deviceTextRight}>NA</Text>
                                                    )
                                                    break;
                                            }
                                        })()}
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Available Accessories: </Text>
                                        {(() => {
                                            var temp = '';
                                            if (this.state.isBox == '1') {
                                                temp = "Box";
                                            }
                                            if (this.state.isBill == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Valid Bill";
                                                }
                                                else {
                                                    temp = temp + ", Valid Bill";
                                                }
                                            }
                                            if (this.state.isCharger == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Original Charger";
                                                }
                                                else {
                                                    temp = temp + ", Original Charger";
                                                }
                                            }
                                            if (this.state.isEarphone == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Original Earphone";
                                                }
                                                else {
                                                    temp = temp + ", Original Earphone";
                                                }
                                            }
                                            if (temp == '') {
                                                temp = 'NA';
                                            }
                                            return (
                                                <Text style={styles.deviceTextRight}>{temp}</Text>
                                            )
                                        })()}
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Device Faults: </Text>
                                        {(() => {
                                            var temp = '';
                                            if (this.state.glassBroken == '1') {
                                                temp = "Glass Broken";
                                            }
                                            if (this.state.touchIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Display Cracked/Discoloration";
                                                }
                                                else {
                                                    temp = temp + ", Display Cracked/Discoloration";
                                                }
                                            }
                                            if (this.state.frontCameraIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Front Camera Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Front Camera Faulty";
                                                }
                                            }
                                            if (this.state.backCameraIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Back Camera Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Back Camera Faulty";
                                                }
                                            }
                                            if (this.state.wifiIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Wifi/GPS Not Working";
                                                }
                                                else {
                                                    temp = temp + ", Wifi/GPS Not Working";
                                                }
                                            }
                                            if (this.state.batteryIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Battery Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Battery Faulty";
                                                }
                                            }
                                            if (this.state.speakerIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Speaker Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Speaker Faulty";
                                                }
                                            }
                                            if (this.state.micIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Mic Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Mic Faulty";
                                                }
                                            }
                                            if (this.state.volumnIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Volume Button Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Volume Button Faulty";
                                                }
                                            }
                                            if (this.state.chargingPinIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Charging Pin Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Charging Pin Faulty";
                                                }
                                            }
                                            if (this.state.powerButtonIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Power Button Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Power Button Faulty";
                                                }
                                            }
                                            if (this.state.fingerPrintBtnIssue == '1') {
                                                if (temp == '') {
                                                    temp = temp + "Fingerprint/Home Button Faulty";
                                                }
                                                else {
                                                    temp = temp + ", Fingerprint/Home Button Faulty";
                                                }
                                            }
                                            if (temp == '') {
                                                temp = "NA"
                                            }
                                            return (
                                                <Text style={styles.deviceTextRight}>{temp}</Text>
                                            )
                                        })()}
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Device Condition: </Text>
                                        {(() => {
                                            switch (this.state.deviceCondition) {
                                                case 'like_new':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>Like New</Text>
                                                    )
                                                    break;
                                                case 'like_good':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>Good</Text>
                                                    )
                                                    break;
                                                case 'like_average':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>Average</Text>
                                                    )
                                                    break;
                                                case 'like_below_average':
                                                    return (
                                                        <Text style={styles.deviceTextRight}>Below Average</Text>
                                                    )
                                                    break;
                                            }
                                        })()}
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                                <Text style={styles.specTxt}>Order Details</Text>
                                <View style={{ margin: 5 }}>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Name: </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.fullName}</Text>
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Mobile: </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.mobile}</Text>
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Email: </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.email}</Text>
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Address: </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.addressFirst}, {this.state.addressSecond}, {this.state.locality}, {this.state.city}, {this.state.astate} - {this.state.pincode}</Text>
                                    </View>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Device Model Name: </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.dataSource.mobile_title}</Text>
                                    </View>
                                    {/* <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Sell Value: </Text>
                                        <Text style={{
                                            color: COLORS.themeColor,
                                            fontSize: 20,
                                            fontWeight: '700'
                                        }}>₹ {this.state.finalPrice}</Text>
                                    </View> */}
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                                <Text style={styles.specTxt}>Pickup Details</Text>
                                <View style={{ margin: 5 }}>
                                    <View style={styles.deviceContainer}>
                                        <Text style={styles.deviceTextLeft}>Time Slot </Text>
                                        <Text style={styles.deviceTextRight}>{this.state.pickupDate} / {this.state.pickupTimeSlot}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                                <Text style={styles.specTxt}>Payment Details</Text>
                                {(() => {
                                    switch (this.state.paymentType) {
                                        case 'cash':
                                            return (
                                                <View style={{ margin: 5 }}>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>Payment Method </Text>
                                                        <Text style={styles.deviceTextRight}>Cash</Text>
                                                    </View>
                                                </View>
                                            )
                                            break;
                                        case 'bank':
                                            return (
                                                <View style={{ margin: 5 }}>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>Payment Method </Text>
                                                        <Text style={styles.deviceTextRight}>Bank Transfer</Text>
                                                    </View>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>Account Name </Text>
                                                        <Text style={styles.deviceTextRight}>{this.state.beneficiaryName}</Text>
                                                    </View>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>Account Number</Text>
                                                        <Text style={styles.deviceTextRight}>{this.state.accountNo}</Text>
                                                    </View>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>IFSC Code</Text>
                                                        <Text style={styles.deviceTextRight}>{this.state.ifscCode}</Text>
                                                    </View>
                                                </View>
                                            )
                                            break;
                                        case 'upi':
                                            return (
                                                <View style={{ margin: 5 }}>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>Payment Method </Text>
                                                        <Text style={styles.deviceTextRight}>UPI</Text>
                                                    </View>
                                                    <View style={styles.deviceContainer}>
                                                        <Text style={styles.deviceTextLeft}>UPI Id</Text>
                                                        <Text style={styles.deviceTextRight}>{this.state.upiId}</Text>
                                                    </View>
                                                </View>
                                            )
                                            break;
                                    }
                                })()}
                            </View>
                            <View style={{ marginVertical: 1, }}>
                                <Text style={{ color: COLORS.textBlackColor, fontSize: 18, fontWeight: '700', marginHorizontal: 16, }}>Referral Code</Text>
                                {(() => {
                                    if (this.state.is_referral_applied) {
                                        return (
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 16, marginVertical: 10, justifyContent: 'space-between' }}>
                                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                                        <Text style={{ fontSize: 18, color: COLORS.textDimColor, fontWeight: '700', textTransform: 'uppercase' }}>{this.state.referral_code}</Text>
                                                        <Text style={{ fontSize: 16, color: COLORS.textDimColor }}> - Applied successfully</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 16, color: COLORS.orange, }}
                                                        onPress={() => this.setState({
                                                            referral_code: '',
                                                            is_referral_applied: false,
                                                            referral_amount: 0,
                                                        })}
                                                    >REMOVE</Text>
                                                </View>
                                                <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', }}>Congratulations! Rs. {this.state.referral_amount} extra added as referral code.</Text>
                                            </View>
                                        )
                                    }
                                    else {
                                        return (
                                            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginVertical: 1, alignItems: 'center' }}>
                                                <TextInput
                                                    style={[StyleCommon.inputBox, { flex: 2, fontSize: 20, textAlign: 'center', textTransform: 'uppercase' }]}
                                                    placeholder="Enter Code"
                                                    autoCapitalize='characters'
                                                    onChangeText={text => this.setState({ referral_code: text })} />
                                                <TouchableOpacity style={[StyleCommon.fullWidthButton, { flex: 2 }]} onPress={this.applyCode}>
                                                    <Text style={StyleCommon.fullWidthButtonText}>Apply</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                })()}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 16, marginVertical: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{
                                    color: COLORS.textDimColor,
                                    fontSize: 22,
                                    fontWeight: '700',
                                }}>Sell Value</Text>
                                <Text style={{
                                    textAlign: 'right',
                                    color: COLORS.themeColor,
                                    fontSize: 32,
                                    fontWeight: '700',
                                }}>₹ {this.state.finalPrice + this.state.referral_amount}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                <CheckBox
                                    // title='I accept the terms and conditions.'
                                    checked={this.state.termsChecked}
                                    onPress={() => this.setState({ termsChecked: !this.state.termsChecked })}
                                />
                                <Text style={{ fontSize: 16, alignSelf: 'center', paddingVertical: 10, textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('TermsRead')}>I accept the terms and conditions.</Text>
                            </View>
                            <View style={StyleCommon.inputsContainer}>
                                <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.open}>
                                    <Text style={StyleCommon.fullWidthButtonText}>Place Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight
    },
    itemContainer: {
        padding: 10,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        height: 200,
        margin: 16,
    },
    phoneTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textBlackColor,
    },
    specTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textBlackColor,
    },
    specDetailsTxt: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 2,
        color: COLORS.textDimColor,
    },
    deviceContainer: {
        // flexDirection: 'row',
        // flex: 1
    },
    deviceTextLeft: {
        color: COLORS.textDimColor,
        fontWeight: '700',
        fontSize: 16,
    },
    deviceTextRight: {
        color: COLORS.textDimColor,
        fontSize: 16,
    }
});