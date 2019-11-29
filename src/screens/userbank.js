import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import { CheckBox } from 'react-native-elements'
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class UserBankScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            paymentType: 'bank',
            accountNo: '',
            confAccountNo: '',
            beneficiaryName: '',
            ifscCode: '',
            bankName: '',
            upiId: '',

            userId: '',
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
        })

        try {
            const user_id = await AsyncStorage.getItem('@user_id')
            this.setState({ userId: user_id })
        } catch (e) {
            // console.error(e);
        }
    }

    open = () => {
        if (this.state.paymentType == '') {
            Snackbar.show({
                title: 'Please select payment method',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.accountNo == '') {
            Snackbar.show({
                title: 'Please enter account number',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.confAccountNo == '') {
            Snackbar.show({
                title: 'Please re-enter account number',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.confAccountNo != this.state.accountNo) {
            Snackbar.show({
                title: 'Account number not match',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.beneficiaryName == '') {
            Snackbar.show({
                title: 'Please enter beneficiary name',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.ifscCode == '') {
            Snackbar.show({
                title: 'Please enter IFSC code',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'bank' && this.state.bankName == '') {
            Snackbar.show({
                title: 'Please enter bank name',
                color: COLORS.white,
            });
        }
        else if (this.state.paymentType == 'upi' && this.state.upiId == '') {
            Snackbar.show({
                title: 'Please enter UPI id',
                color: COLORS.white,
            });
        }
        else {
            if (this.state.paymentType == 'bank' || this.state.paymentType == 'upi') {
                fetch(Common.BASEURL + 'user_bank_add.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache'
                    },
                    body: 'user_id=' + this.state.userId +
                        '&payment_type=' + this.state.paymentType +
                        '&account_number=' + this.state.accountNo +
                        '&beneficiary_name=' + this.state.beneficiaryName +
                        '&ifsc_code=' + this.state.ifscCode +
                        '&bank_name=' + this.state.bankName +
                        '&upi_id=' + this.state.upiId,
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.status == 'success') {
                            this.setState({
                                isLoading: false,
                            }, function () {

                            });
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
            this.props.navigation.navigate('TimeSlot', {
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
                address_type: this.state.addressType,
                address_first: this.state.addressFirst,
                address_second: this.state.addressSecond,
                locality: this.state.locality,
                city: this.state.city,
                astate: this.state.astate,
                pincode: this.state.pincode,
                payment_type: this.state.paymentType,
                account_no: this.state.accountNo,
                beneficiary_name: this.state.beneficiaryName,
                ifsc_code: this.state.ifscCode,
                bank_name: this.state.bankName,
                upi_id: this.state.upiId,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Transaction Details</Text>
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
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <CheckBox
                                title='Bank'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.paymentType == 'bank' ? true : false}
                                onPress={() => this.setState({ paymentType: 'bank' })}
                            />
                            <CheckBox
                                title='Cash'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.paymentType == 'cash' ? true : false}
                                onPress={() => this.setState({ paymentType: 'cash' })}
                            />
                            <CheckBox
                                title='UPI'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.paymentType == 'upi' ? true : false}
                                onPress={() => this.setState({ paymentType: 'upi' })}
                            />
                        </View>
                        {(() => {
                            if (this.state.paymentType == 'bank') {
                                return (
                                    <View style={{ margin: 16 }}>
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Account Number*"
                                            keyboardType='numeric'
                                            onChangeText={text => this.setState({ accountNo: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Confirm Account Number*"
                                            keyboardType='numeric'
                                            onChangeText={text => this.setState({ confAccountNo: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Beneficary Name*"
                                            onChangeText={text => this.setState({ beneficiaryName: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="IFSC Code*"
                                            onChangeText={text => this.setState({ ifscCode: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Bank Name*"
                                            onChangeText={text => this.setState({ bankName: text })} />
                                    </View>
                                )
                            }
                            else if (this.state.paymentType == 'upi') {
                                return (
                                    <View style={{ margin: 16 }}>
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="UPI id*"
                                            onChangeText={text => this.setState({ upiId: text })} />
                                    </View>
                                )
                            }
                        })()}
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Next</Text>
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
