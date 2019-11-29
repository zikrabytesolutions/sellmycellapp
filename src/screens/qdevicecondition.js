import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class DeviceConditionScreen extends Component {
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
            ischecked1: 0,
            ischecked2: 0,
            ischecked3: 0,
            ischecked4: 0,
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
        })
    }

    open = () => {
        if (this.state.deviceCondition == '') {
            Snackbar.show({
                title: 'Please select device condition.',
                color: 'white',
            });
        }
        else {
            this.props.navigation.navigate('DeviceValue', {
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
                            <Text style={StyleCommon.boldBlackText}>Device Condition</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                                Please select the device condition
                        </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 1,
                                            ischecked2: 0,
                                            ischecked3: 0,
                                            ischecked4: 0,
                                            deviceCondition: 'like_new'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked1 == '0') {
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
                                            source={require('../assets/images/a_mob_new.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Like New</Text>
                                        <Text style={styles.itemSubText}>No Scratches, No dents, No functional issues</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 1,
                                            ischecked3: 0,
                                            ischecked4: 0,
                                            deviceCondition: 'like_good'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked2 == '0') {
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
                                            source={require('../assets/images/a_mob_good.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Good</Text>
                                        <Text style={styles.itemSubText}>Minor scratches with one or two dents, No cracks on body</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 0,
                                            ischecked3: 1,
                                            ischecked4: 0,
                                            deviceCondition: 'like_average'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked3 == '0') {
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
                                            source={require('../assets/images/a_mob_average.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Average</Text>
                                        <Text style={styles.itemSubText}>Major scratches and dents but body not cracked</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 0,
                                            ischecked3: 0,
                                            ischecked4: 1,
                                            deviceCondition: 'like_below_average'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked4 == '0') {
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
                                            source={require('../assets/images/a_mob_below_avg.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Below Average</Text>
                                        <Text style={styles.itemSubText}>Cracked, Broken or Discolored body/Panel</Text>
                                    </View>
                                </TouchableOpacity>
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
        height: 190,
        marginVertical: 5,
        marginLeft: 10,
        marginRight: 5,
    },
    itemContainerRight: {
        flex: 2,
        height: 190,
        marginVertical: 5,
        marginLeft: 5,
        marginRight: 10
    },
    itemSubContainer: {
        alignItems: 'center',
        marginTop: -16
    },
    itemImg: {
        height: 70,
        marginBottom: 14
    },
    itemText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDimColor,
    },
    itemSubText: {
        fontSize: 14,
        marginHorizontal: 12,
        textAlign: 'center',
        color: COLORS.textDimColor,
    },
    itemCheck: {
        width: 20,
        height: 20,
        margin: 10,
        alignSelf: 'flex-end'
    }
});
