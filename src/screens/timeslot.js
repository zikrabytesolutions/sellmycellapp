import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class TimeSlotScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: '',
            dataSourceChild: [],
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
            confAccountNo: '',
            beneficiaryName: '',
            ifscCode: '',
            bankName: '',
            upiId: '',
            pickupDate: '',
            pickupTimeSlot: '',

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
        const pyType = this.props.navigation.getParam('payment_type', '');
        const acno = this.props.navigation.getParam('account_no', '');
        const benfname = this.props.navigation.getParam('beneficiary_name', '');
        const ifscd = this.props.navigation.getParam('ifsc_code', '');
        const bnkname = this.props.navigation.getParam('bank_name', '');
        const upId = this.props.navigation.getParam('upi_id', '');

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
            upiId: upId
        })

        try {
            const user_id = await AsyncStorage.getItem('@user_id')
            this.setState({ userId: user_id })
        } catch (e) {
        }
        return fetch(Common.BASEURL + 'timeslot.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                });
                // console.error(responseJson)
                if (responseJson.status == 'success') {
                    this.setState({
                        dataSource: responseJson.data,
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
                    color: COLORS.white,
                });
            });
    }

    open = () => {
        if (this.state.pickupDate == '') {
            Snackbar.show({
                title: 'Please select pickup date',
                color: COLORS.white,
            });
        }
        else if (this.state.pickupTimeSlot == '') {
            Snackbar.show({
                title: 'Please select pickup time',
                color: COLORS.white,
            });
        }
        else {
            this.props.navigation.navigate('OrderPlace', {
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
                pickup_date: this.state.pickupDate,
                pickup_time_slot: this.state.pickupTimeSlot,
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Pickup Time</Text>
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
                                <Text style={StyleCommon.boldBlackText}>Suitable timeslot</Text>
                                <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                                    Choose date and time for pickup
                            </Text>
                                <View style={{
                                    marginTop: 10,
                                    borderRadius: 5,
                                    borderColor: COLORS.borderColor,
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    paddingLeft: 5,
                                }}>
                                    <Picker
                                        selectedValue={this.state.pickupDate}
                                        mode='dropdown'
                                        keyExtractor={(item, index) => index.toString()}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({
                                                pickupDate: itemValue,
                                                pickupTimeSlot: '',
                                                dataSourceChild: this.state.dataSource[itemIndex - 1].time_slot
                                            })
                                        }>
                                        <Picker.Item label="Select Date" value="" />
                                        {(() => {
                                            const temp = [];
                                            for (let index = 0; index < this.state.dataSource.length; index++) {
                                                const element = this.state.dataSource[index];
                                                temp.push(
                                                    <Picker.Item label={element.pick_date_text} value={element.pick_date_value} />
                                                );
                                            }
                                            return temp
                                        })()}
                                    </Picker>
                                </View>
                                {(() => {
                                    if (this.state.dataSourceChild.length != 0) {
                                        return (
                                            <View style={{
                                                marginTop: 10,
                                                borderRadius: 5,
                                                borderColor: COLORS.borderColor,
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                                paddingLeft: 5,
                                            }}>
                                                <Picker
                                                    selectedValue={this.state.pickupTimeSlot}
                                                    mode='dropdown'
                                                    keyExtractor={(item, index) => index.toString()}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        this.setState({
                                                            pickupTimeSlot: itemValue,
                                                        })
                                                    }>
                                                    <Picker.Item key='' label="Select Time" value="" />
                                                    {(() => {
                                                        const tempchild = [];
                                                        for (let i = 0; i < this.state.dataSourceChild.length; i++) {
                                                            const elementChild = this.state.dataSourceChild[i];
                                                            tempchild.push(
                                                                <Picker.Item key={i} label={elementChild.time_text} value={elementChild.time_text} />
                                                            );
                                                        }
                                                        return tempchild
                                                    })()}
                                                </Picker>
                                            </View>
                                        )
                                    }
                                })()}
                            </View>
                            <View style={StyleCommon.inputsContainer}>
                                <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                    <Text style={StyleCommon.fullWidthButtonText}>Next</Text>
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
        backgroundColor: COLORS.backGroundLight,
    },
});
