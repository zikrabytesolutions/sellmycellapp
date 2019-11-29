import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class UserDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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

            userId: '',
            fullName: '',
            email: '',
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
            pincode: pcode,
        })

        try {
            const uid = await AsyncStorage.getItem('@user_id');
            if (uid !== null) {
                this.setState({ userId: uid, })
            }
            const uname = await AsyncStorage.getItem('@full_name');
            if (uname !== null) {
                this.setState({ fullName: uname, })
            }
            const uemail = await AsyncStorage.getItem('@user_email');
            if (uemail !== null) {
                this.setState({ email: uemail, })
            }
        } catch (e) {
            // console.error(e);
        }
    }

    open = () => {
        if (this.state.fullName == '') {
            Snackbar.show({
                title: 'Please enter name',
                color: COLORS.white,
            });
        }
        else if (this.state.email == '') {
            Snackbar.show({
                title: 'Please enter email',
                color: COLORS.white,
            });
        }
        else {
            this.setState({
                isLoading: true,
            });
            fetch(Common.BASEURL + 'user_updateprofile.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_id=' + this.state.userId +
                    '&full_name=' + this.state.fullName +
                    '&email=' + this.state.email,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                    }, async function () {
                        if (responseJson.status == 'success') {
                            try {
                                await AsyncStorage.setItem('@user_id', responseJson.user_id + '')
                                await AsyncStorage.setItem('@full_name', responseJson.full_name + '')
                                await AsyncStorage.setItem('@user_mobile', responseJson.mobile + '')
                                await AsyncStorage.setItem('@user_email', responseJson.email + '')
                            }
                            catch (e) {
                                console.error(e);
                            }
                            this.props.navigation.replace('UserAddress', {
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
                    });
                })
                .catch((error) => {
                    // console.error(error);
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
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Personal details</Text>
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
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Full name"
                                defaultValue = {this.state.fullName}
                                onChangeText={text => this.setState({ fullName: text })} />
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Email (For invoice purpose)"
                                keyboardType="email-address"
                                defaultValue = {this.state.email}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <View style={{ marginTop: 20 }}>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
});