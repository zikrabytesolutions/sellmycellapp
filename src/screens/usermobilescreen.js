import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class UserMobileScreen extends Component {
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
            pincode: '',
            userMobile: '',
        }
    }

    componentDidMount() {
        this.setState({
            mobileId: this.props.navigation.getParam('mobile_id', ''),
            isBox: this.props.navigation.getParam('is_box', ''),
            isBill: this.props.navigation.getParam('is_bill', ''),
            isCharger: this.props.navigation.getParam('is_charger', ''),
            isEarphone: this.props.navigation.getParam('is_earphone', ''),
            deviceAge: this.props.navigation.getParam('device_age', ''),
            glassBroken: this.props.navigation.getParam('glass_broken', ''),
            touchIssue: this.props.navigation.getParam('touch_issue', ''),
            frontCameraIssue: this.props.navigation.getParam('front_camera_issue', ''),
            backCameraIssue: this.props.navigation.getParam('back_camera_issue', ''),
            wifiIssue: this.props.navigation.getParam('wifi_issue', ''),
            batteryIssue: this.props.navigation.getParam('battery_issue', ''),
            speakerIssue: this.props.navigation.getParam('speaker_issue', ''),
            micIssue: this.props.navigation.getParam('mic_issue', ''),
            volumnIssue: this.props.navigation.getParam('volumn_issue', ''),
            chargingPinIssue: this.props.navigation.getParam('chargingpin_issue', ''),
            powerButtonIssue: this.props.navigation.getParam('powerbutton_issue', ''),
            fingerPrintBtnIssue: this.props.navigation.getParam('fingerbutton_issue', ''),
            faceRegIssue: this.props.navigation.getParam('facereg_issue', ''),
            deviceCondition: this.props.navigation.getParam('device_condition', ''),
            pincode: this.props.navigation.getParam('pincode', ''),
        })
    }

    open = () => {
        if (this.state.userMobile == '') {
            Snackbar.show({
                title: 'Please enter your mobile number',
                color: COLORS.white,
            });
        }
        else if (this.state.userMobile.length != 10) {
            Snackbar.show({
                title: 'Invalid mobile number',
                color: COLORS.white,
            });
        }
        else {
            this.props.navigation.replace('UserOTP', {
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
                user_mobile: this.state.userMobile,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Mobile number</Text>
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
                            <Text style={[StyleCommon.boldBlackText, { alignSelf: 'center', marginTop: 50 }]}>Enter your mobile number</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2, alignSelf: 'center' }]}>
                                We will send you one time password(OTP)
                        </Text>
                            <TextInput
                                keyboardType='phone-pad'
                                style={[StyleCommon.inputBox, { marginTop: 20 }]}
                                placeholder="Enter your mobile number"
                                onChangeText={text => this.setState({ userMobile: text })} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Send OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
