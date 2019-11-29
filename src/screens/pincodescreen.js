import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Picker } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Common from '../utils/common.js';

export default class PincodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading: true,
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

            isLogin: '',
            userId: '',
            fullName: '',
            userMobile: '',
            userEmail: '',

            // cityId: '',
            // dataSource: [],
        }
    }

    async componentDidMount() {
        const is_login = await AsyncStorage.getItem('@is_login');
        const user_id = await AsyncStorage.getItem('@user_id');
        const full_name = await AsyncStorage.getItem('@full_name');
        const user_mobile = await AsyncStorage.getItem('@user_mobile');
        const user_email = await AsyncStorage.getItem('@user_email');

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

            isLogin: is_login,
            userId: user_id,
            fullName: full_name,
            userMobile: user_mobile,
            userEmail: user_email,
        })

        // const city_id = await AsyncStorage.getItem('@city_id')
        // this.setState({ cityId: city_id })
        // fetch(Common.BASEURL + 'city_pincode.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded',
        //         'Cache-Control': 'no-cache'
        //     },
        //     body: 'city_id=' + city_id
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             isLoading: false,
        //             dataSource: responseJson,
        //         });
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             isLoading: false,
        //         });
        //         Snackbar.show({
        //             title: 'Sorry, something went wrong',
        //             color: COLORS.white,
        //         });
        //     });
    }

    open = () => {
        if (this.state.pincode == '') {
            Snackbar.show({
                title: 'Please enter pincode',
                color: COLORS.white,
            });
        }
        else if (this.state.pincode.length != 6) {
            Snackbar.show({
                title: 'Invalid pincode',
                color: COLORS.white,
            });
        }
        else {
            if (this.state.isLogin == 'yes' && this.state.userId != '' && this.userMobile != '') {
                fetch(Common.BASEURL + 'pincode_check.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache'
                    },
                    body: 'pincode=' + this.state.pincode
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // console.error(responseJson)
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson,
                        }, async function () {
                            if (responseJson.is_pincode_avail == 'yes') {
                                await AsyncStorage.setItem('@city_id', responseJson.city_id.toString())
                                await AsyncStorage.setItem('@city_name', responseJson.city_name.toString())
                                await AsyncStorage.setItem('@state_name', responseJson.state_name.toString())

                                if (this.state.fullName == '' || this.state.userEmail == '') {
                                    this.props.navigation.navigate('UserDetails', {
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
                                    this.props.navigation.navigate('UserAddress', {
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
                            }
                            else {
                                this.props.navigation.navigate('PincodeUnavailable')
                            }
                        });
                    })
                    .catch((error) => {
                        console.error(error)
                        this.setState({
                            isLoading: false,
                        });
                        Snackbar.show({
                            title: 'Sorry, something went wrong',
                            color: COLORS.white,
                        });
                    });
            }
            else {
                this.props.navigation.navigate('UserMobile', {
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
                        <Text style={StyleCommon.myHeaderText}>Pincode</Text>
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
                    <ScrollView keyboardShouldPersistTaps="handled" >
                        <View style={styles.container}>
                            <View style={{ margin: 16 }}>
                                <Text style={StyleCommon.boldBlackText}>Pincode</Text>
                                <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>Select your area pincode</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    style={[StyleCommon.inputBox, { marginTop: 20 }]}
                                    placeholder="Enter your pincode"
                                    onChangeText={text => this.setState({ pincode: text })}
                                />
                                {/* <View style={{
                                    marginTop: 10,
                                    borderRadius: 5,
                                    borderColor: COLORS.borderColor,
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    paddingLeft: 5,
                                    }}>
                                    <Picker
                                        selectedValue={this.state.pincode}
                                        mode='dropdown'
                                        keyExtractor={(item, index) => index.toString()}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({
                                                pincode: itemValue,
                                                dataSourceChild: this.state.dataSource
                                            })
                                        }>
                                        <Picker.Item label="Select Pincode" value="" />
                                        {(() => {
                                            const temp = [];
                                            for (let index = 0; index < this.state.dataSource.length; index++) {
                                                const element = this.state.dataSource[index];
                                                temp.push(
                                                    <Picker.Item label={element.pincode} value={element.pincode} />
                                                );
                                            }
                                            return temp
                                        })()}
                                    </Picker>
                                </View> */}
                            </View>
                            <View style={{ flex: 2, alignSelf: 'flex-end', marginTop: 20 }}>
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