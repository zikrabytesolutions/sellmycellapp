import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class DeviceFaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileId: '',
            isBox: '',
            isBill: '',
            isCharger: '',
            isEarphone: '',
            deviceAge: '',
            glassBroken: '0',
            touchIssue: '0',
            frontCameraIssue: '0',
            backCameraIssue: '0',
            wifiIssue: '0',
            batteryIssue: '0',
            speakerIssue: '0',
            micIssue: '0',
            volumnIssue: '0',
            chargingPinIssue: '0',
            powerButtonIssue: '0',
            fingerPrintBtnIssue: '0',
            faceRegIssue: '0',
        }
    }
    
    open = () => {
        this.props.navigation.navigate('DeviceCondition', {
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
        })
    }

    componentDidMount() {
        this.setState({
            mobileId: this.props.navigation.getParam('mobile_id', ''),
            isBox: this.props.navigation.getParam('is_box', ''),
            isBill: this.props.navigation.getParam('is_bill', ''),
            isCharger: this.props.navigation.getParam('is_charger', ''),
            isEarphone: this.props.navigation.getParam('is_earphone', ''),
            deviceAge: this.props.navigation.getParam('device_age', ''),
        })
    }

    render() { 
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Answer few questions</Text>
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
                        <View style={{ margin: 16 }}>
                            <Text style={StyleCommon.boldBlackText}>Device Fault</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                                Please select the device fault
                        </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.glassBroken == '0') {
                                            this.setState({ glassBroken: '1' })
                                        }
                                        else {
                                            this.setState({ glassBroken: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.glassBroken == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_glass.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Glass Broken</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.touchIssue == '0') {
                                            this.setState({ touchIssue: '1' })
                                        }
                                        else {
                                            this.setState({ touchIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.touchIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_touch.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Display Cracked/Discoloration</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.frontCameraIssue == '0') {
                                            this.setState({ frontCameraIssue: '1' })
                                        }
                                        else {
                                            this.setState({ frontCameraIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.frontCameraIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_frontcamera.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Front Camera Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.backCameraIssue == '0') {
                                            this.setState({ backCameraIssue: '1' })
                                        }
                                        else {
                                            this.setState({ backCameraIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.backCameraIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_backcamera.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Back Camera Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.batteryIssue == '0') {
                                            this.setState({ batteryIssue: '1' })
                                        }
                                        else {
                                            this.setState({ batteryIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.batteryIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_battery.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Battery Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.wifiIssue == '0') {
                                            this.setState({ wifiIssue: '1' })
                                        }
                                        else {
                                            this.setState({ wifiIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.wifiIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/a_issue_wifi.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Wifi/GPS Not Working</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.speakerIssue == '0') {
                                            this.setState({ speakerIssue: '1' })
                                        }
                                        else {
                                            this.setState({ speakerIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.speakerIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/speaker-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Speaker Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.micIssue == '0') {
                                            this.setState({ micIssue: '1' })
                                        }
                                        else {
                                            this.setState({ micIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.micIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/mic-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Mic Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.volumnIssue == '0') {
                                            this.setState({ volumnIssue: '1' })
                                        }
                                        else {
                                            this.setState({ volumnIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.volumnIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/volume-button-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Volume Button Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.chargingPinIssue == '0') {
                                            this.setState({ chargingPinIssue: '1' })
                                        }
                                        else {
                                            this.setState({ chargingPinIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.chargingPinIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/charger-pin-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Charging Pin Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.powerButtonIssue == '0') {
                                            this.setState({ powerButtonIssue: '1' })
                                        }
                                        else {
                                            this.setState({ powerButtonIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.powerButtonIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/powerbutton-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Power Button Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.fingerPrintBtnIssue == '0') {
                                            this.setState({ fingerPrintBtnIssue: '1' })
                                        }
                                        else {
                                            this.setState({ fingerPrintBtnIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.fingerPrintBtnIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/fingerscan-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Fingerprint/Home Button Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        if (this.state.faceRegIssue == '0') {
                                            this.setState({ faceRegIssue: '1' })
                                        }
                                        else {
                                            this.setState({ faceRegIssue: '0' })
                                        }
                                    }}>
                                    {(() => {
                                        if (this.state.faceRegIssue == '0') {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/unchecked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                        else {
                                            return (
                                                <Image
                                                    resizeMode="stretch"
                                                    source={require('../assets/images/checked.png')}
                                                    style={styles.itemCheck}></Image>
                                            )
                                        }
                                    })()}
                                    <View style={styles.itemSubContainer}>
                                        <Image
                                            resizeMode="center"
                                            source={require('../assets/images/face-recog-faulty.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Face Recognition Faulty</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 2 }}></View>
                            </View>
                        </View>
                        <View style={StyleCommon.inputsContainer}>
                            <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.open}>
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
    itemContainerLeft: {
        flex: 2,
        height: 160,
        marginVertical: 5,
        marginLeft: 10,
        marginRight: 5,
    },
    itemContainerRight: {
        flex: 2,
        height: 160,
        marginVertical: 5,
        marginLeft: 5,
        marginRight: 10
    },
    itemSubContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: -10,
    },
    itemImg: {
        width: 60,
        height: 60,
        marginHorizontal: 16,
    },
    itemText: {
        // flex: 2,
        fontSize: 14,
        fontWeight: '700',
        margin: 16,
        textAlign: 'center',
        color: COLORS.textDimColor,
    },
    itemCheck: {
        width: 20,
        height: 20,
        margin: 10,
        alignSelf: 'flex-end',
    }
});
