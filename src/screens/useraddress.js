import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Picker, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class UserAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
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
            addressType: 'Home',
            addressFirst: '',
            addressSecond: '',
            locality: '',
            city: '',
            astate: '',

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
            const user_id = await AsyncStorage.getItem('@user_id')
            const city_name = await AsyncStorage.getItem('@city_name')
            const state_name = await AsyncStorage.getItem('@state_name')
            this.setState({
                userId: user_id,
                city: city_name,
                astate: state_name
            })

            fetch(Common.BASEURL + 'user_address.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_id=' + user_id
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    }, function () {
                    });
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false,
                    });
                });
        } catch (e) {
        }
    }

    open = () => {
        if (this.state.addressType == '') {
            Snackbar.show({
                title: 'Select address type',
                color: COLORS.white,
            });
        }
        else if (this.state.addressFirst == '') {
            Snackbar.show({
                title: 'Please enter address',
                color: COLORS.white,
            });
        }
        else if (this.state.locality == '') {
            Snackbar.show({
                title: 'Please enter locality',
                color: COLORS.white,
            });
        }
        else if (this.state.city == '') {
            Snackbar.show({
                title: 'Please enter city',
                color: COLORS.white,
            });
        }
        else if (this.state.astate == '') {
            Snackbar.show({
                title: 'Please enter state',
                color: COLORS.white,
            });
        }
        else if (this.state.pincode == '') {
            Snackbar.show({
                title: 'Please enter pincode',
                color: COLORS.white,
            });
        }
        else {
            fetch(Common.BASEURL + 'user_address_add.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_id=' + this.state.userId +
                    '&address_type=' + this.state.addressType +
                    '&address_first=' + this.state.addressFirst +
                    '&address_second=' + this.state.addressSecond +
                    '&locality=' + this.state.locality +
                    '&city=' + this.state.city +
                    '&state=' + this.state.astate +
                    '&pincode=' + this.state.pincode,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status == 'success') {
                        this.setState({
                            isLoading: false,
                        }, function () {
                            this.props.navigation.navigate('UserBank', {
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
                            })
                        });
                    }
                })
                .catch((error) => {
                    console.error(error)
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
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Pickup Address</Text>
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
                    {(() => {
                        if (this.state.dataSource != null && this.state.dataSource.length > 0) {
                            return (
                                <View>
                                    <FlatList
                                        style={{ marginTop: 2.5 }}
                                        data={this.state.dataSource}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View style={[StyleCommon.whiteBorder, { marginHorizontal: 5, marginVertical: 2.5, flexDirection: 'row', flex: 1 }]}>
                                                <View style={{ alignSelf: 'stretch', flex:1 }}>
                                                    <Text style={styles.itemBold}>{item.type}</Text>
                                                    <Text style={styles.itemNormal}>
                                                        {(() => {
                                                            var temp = '';
                                                            if (item.address_first != '') {
                                                                temp = item.address_first;
                                                            }
                                                            if (item.address_second != '') {
                                                                if (temp == '') {
                                                                    temp = temp + item.address_second;
                                                                }
                                                                else {
                                                                    temp = temp + ", " + item.address_second;
                                                                }
                                                            }
                                                            if (item.locality != '') {
                                                                if (temp == '') {
                                                                    temp = temp + item.locality;
                                                                }
                                                                else {
                                                                    temp = temp + ", " + item.locality;
                                                                }
                                                            }
                                                            return temp;
                                                        })()}
                                                    </Text>
                                                    <Text style={styles.itemNormal}>{item.city}</Text>
                                                    <Text style={styles.itemNormal}>{item.state}</Text>
                                                    <Text style={styles.itemNormal}>Pincode - {item.pincode}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.smallBtn, { paddingHorizontal: 20, alignSelf: 'flex-end', }]} onPress={() => {
                                                    this.props.navigation.navigate('UserBank', {
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
                                                        address_type: item.type,
                                                        address_first: item.address_first,
                                                        address_second: item.address_second,
                                                        locality: item.locality,
                                                        city: item.city,
                                                        astate: item.state,
                                                        pincode: item.pincode,
                                                    })
                                                }}>
                                                    <Text style={StyleCommon.fullWidthButtonText}>Select</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                    <Text style={{
                                        fontSize: 16, margin: 40, paddingHorizontal: 20, paddingVertical: 10, color: COLORS.greenBtn, alignSelf: "center", borderRadius: 5,
                                        borderColor: COLORS.greenBtn,
                                        borderStyle: 'solid',
                                        borderWidth: 1,
                                    }}
                                        onPress={() => {
                                            this.setState({
                                                dataSource: [],
                                            })
                                        }}>ADD NEW ADDRESS</Text>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={styles.container}>
                                    <View style={{ margin: 16 }}>
                                        <View style={{
                                            marginTop: 10,
                                            borderRadius: 5,
                                            borderColor: COLORS.borderColor,
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                            paddingLeft: 5,
                                        }}>
                                            <Picker
                                                selectedValue={this.state.addressType}
                                                mode='dropdown'
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setState({ addressType: itemValue })}>
                                                <Picker.Item label="Home" value="Home" />
                                                <Picker.Item label="Office" value="Office" />
                                            </Picker>
                                        </View>
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Address line 1"
                                            onChangeText={text => this.setState({ addressFirst: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Address line 2"
                                            onChangeText={text => this.setState({ addressSecond: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Locality"
                                            onChangeText={text => this.setState({ locality: text })} />
                                        <Text style={[StyleCommon.inputBoxDisable, { marginTop: 10 }]}>
                                            {this.state.city}
                                        </Text>
                                        <Text style={[StyleCommon.inputBoxDisable, { marginTop: 10 }]}>
                                            {this.state.astate}
                                        </Text>
                                        <Text style={[StyleCommon.inputBoxDisable, { marginTop: 10 }]}>
                                            {this.state.pincode}
                                        </Text>
                                        {/* <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="City"
                                            defaultValue={this.state.city}
                                            onChangeText={text => this.setState({ city: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="State"
                                            defaultValue={this.state.astate}
                                            onChangeText={text => this.setState({ astate: text })} />
                                        <TextInput
                                            style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                            placeholder="Pincode"
                                            defaultValue={this.state.pincode}
                                            keyboardType='numeric'
                                            onChangeText={text => this.setState({ pincode: text })} /> */}
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                            <Text style={StyleCommon.fullWidthButtonText}>Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    })()}
                </ScrollView >
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundGray,
    },
    itemBold: {
        fontSize: 18,
        color: COLORS.textBlackColor,
        fontWeight: '700',
        marginBottom: 3
    },
    itemNormal: {
        fontSize: 16,
        color: COLORS.textBlackColor,
    },
    smallBtn: {
        borderRadius: 5,
        backgroundColor: COLORS.greenBtn,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});