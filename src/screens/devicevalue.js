import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class DeviceValueScreen extends Component {
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

            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount() {
        const mobileId = this.props.navigation.getParam('mobile_id', '');
        const isBox = this.props.navigation.getParam('is_box', '');
        const isBill = this.props.navigation.getParam('is_bill', '');
        const isCharger = this.props.navigation.getParam('is_charger', '');
        const isEarphone = this.props.navigation.getParam('is_earphone', '');
        const deviceAge = this.props.navigation.getParam('device_age', '');
        const glassBroken = this.props.navigation.getParam('glass_broken', '');
        const touchIssue = this.props.navigation.getParam('touch_issue', '');
        const frontCameraIssue = this.props.navigation.getParam('front_camera_issue', '');
        const backCameraIssue = this.props.navigation.getParam('back_camera_issue', '');
        const wifiIssue = this.props.navigation.getParam('wifi_issue', '');
        const batteryIssue = this.props.navigation.getParam('battery_issue', '');
        const speakerIssue = this.props.navigation.getParam('speaker_issue', '');
        const micIssue = this.props.navigation.getParam('mic_issue', '');
        const volumnIssue = this.props.navigation.getParam('volumn_issue', '');
        const chargingPinIssue = this.props.navigation.getParam('chargingpin_issue', '');
        const powerButtonIssue = this.props.navigation.getParam('powerbutton_issue', '');
        const fingerPrintBtnIssue = this.props.navigation.getParam('fingerbutton_issue', '');
        const faceRegIssue = this.props.navigation.getParam('facereg_issue', '');
        const deviceCondition = this.props.navigation.getParam('device_condition', '');

        this.setState({
            mobileId: mobileId,
            isBox: isBox,
            isBill: isBill,
            isCharger: isCharger,
            isEarphone: isEarphone,
            deviceAge: deviceAge,
            glassBroken: glassBroken,
            touchIssue: touchIssue,
            frontCameraIssue: frontCameraIssue,
            backCameraIssue: backCameraIssue,
            wifiIssue: wifiIssue,
            batteryIssue: batteryIssue,
            speakerIssue: speakerIssue,
            micIssue: micIssue,
            volumnIssue: volumnIssue,
            chargingPinIssue: chargingPinIssue,
            powerButtonIssue: powerButtonIssue,
            fingerPrintBtnIssue: fingerPrintBtnIssue,
            faceRegIssue: faceRegIssue,
            deviceCondition: deviceCondition,
        })
        return fetch(Common.BASEURL + 'mobilevalue.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'mobileId=' + mobileId +
                '&isBox=' + isBox +
                '&isBill=' + isBill +
                '&isCharger=' + isCharger +
                '&isEarphone=' + isEarphone +
                '&deviceAge=' + deviceAge +
                '&glassBroken=' + glassBroken +
                '&touchIssue=' + touchIssue +
                '&frontCameraIssue=' + frontCameraIssue +
                '&backCameraIssue=' + backCameraIssue +
                '&wifiIssue=' + wifiIssue +
                '&batteryIssue=' + batteryIssue +
                '&speakerIssue=' + speakerIssue +
                '&micIssue=' + micIssue +
                '&volumnIssue=' + volumnIssue +
                '&chargingPinIssue=' + chargingPinIssue +
                '&powerButtonIssue=' + powerButtonIssue +
                '&fingerPrintBtnIssue=' + fingerPrintBtnIssue +
                '&faceRegIssue=' + faceRegIssue +
                '&deviceCondition=' + deviceCondition,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
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

    open = () => {
        this.props.navigation.navigate('Pincode', {
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
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else if (this.state.dataSource.length == 0) {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Device Summary</Text>
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
                    <View style={StyleCommon.centerItem}>
                        <Text style={StyleCommon.textNothing}>Nothing to show here</Text>
                    </View>
                </View>
            )
        }
        else if (this.state.dataSource.final_price <= 0) {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Device not accepted</Text>
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
                    <ScrollView>
                        <View>
                            <Image
                                style={{
                                    flex: 1, width: null, height: Dimensions.get('window').height / 1.8,
                                    marginTop: 50,
                                    marginHorizontal: 30,
                                    marginBottom: 20
                                }}
                                resizeMode="contain"
                                source={require('../assets/images/power-off.png')} />

                            <Text style={{
                                fontSize: 18,
                                marginVertical: 16,
                                fontWeight: '700',
                                marginHorizontal: 30,
                                textAlign: 'center',
                                color: COLORS.orange,
                            }}>VALUE TOO LOW</Text>
                            <Text style={{
                                fontSize: 18,
                                marginHorizontal: 30,
                                textAlign: 'center',
                                color: COLORS.textDimColor
                            }}>Sorry, We are not accepting this device. </Text>
                        </View>
                    </ScrollView>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Device Summary</Text>
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
                    <ScrollView>
                        <View style={styles.container}>
                            <Image
                                style={styles.img}
                                resizeMode="contain"
                                source={{ uri: this.state.dataSource.mobile_img }} />
                            <Text style={styles.phoneTitle}>{this.state.dataSource.mobile_title}</Text>
                            <View style={{ height: 2, borderRadius: 100, marginHorizontal: 30, marginVertical: 12, backgroundColor: COLORS.dividerColor }}></View>
                            <View style={{ marginHorizontal: 16 }}>
                                <Text style={styles.specTxt}>Specification</Text>
                                <View style={{ margin: 10 }}>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.processor}</Text>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.ram_size}</Text>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.internal_memory}</Text>
                                    {/* <Text style={styles.specDetailsTxt}>- {this.state.dataSource.front_camera}</Text>
                                <Text style={styles.specDetailsTxt}>- {this.state.dataSource.rear_camera}</Text>
                                <Text style={styles.specDetailsTxt}>- {this.state.dataSource.battery}</Text> */}
                                </View>

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
                                                        <Text style={styles.deviceTextRight}>0 - 3 Months</Text>
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

                            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginVertical: 10, alignItems: 'center' }}>
                                <Text style={{
                                    flex: 2,
                                    color: COLORS.themeColor,
                                    fontSize: 18,
                                    fontWeight: '700',
                                }}>VALUE OF YOUR DEVICE</Text>
                                <Text style={{
                                    flex: 2,
                                    textAlign: 'right',
                                    color: COLORS.themeColor,
                                    fontSize: 32,
                                    fontWeight: '700',
                                }}>₹ {this.state.dataSource.final_price}</Text>
                            </View>
                            <View style={StyleCommon.inputsContainer}>
                                <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.open}>
                                    <Text style={StyleCommon.fullWidthButtonText}>Place Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView >
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
    inputsContainer: {
        flex: 1,
    },
    fullWidthButton: {
        borderRadius: 5,
        backgroundColor: COLORS.themeColor,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
    fullWidthButtonText: {
        fontSize: 20,
        color: 'white'
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