import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

export default class LoginOTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            userOtp: '',
            timer: 1
        }
    }

    componentDidMount() {
        const uMob = this.props.navigation.getParam('user_mobile', '');
        this.setState({
            userMobile: uMob,
        })
        this.otpSend(uMob);
    }
    componentDidUpdate() {
        if (this.state.timer === 1) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    otpSend(mob) {
        this.setState({timer:30});
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
        fetch(Common.BASEURL + 'otp_send.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'user_mobile=' + mob,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                }, function () {
                    if (responseJson.status == 'otp_sent') {
                        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
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
        if (this.state.userOtp == '') {
            Snackbar.show({
                title: 'Enter OTP',
                color: COLORS.white,
            });
        }
        else {
            fetch(Common.BASEURL + 'otp_verify.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'user_mobile=' + this.state.userMobile + '&otp=' + this.state.userOtp,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                    }, async function () {
                        if (responseJson.status == 'otp_matched') {
                            try {
                                await AsyncStorage.setItem('@is_login', 'yes')
                                await AsyncStorage.setItem('@user_id', responseJson.u_id.toString())
                                await AsyncStorage.setItem('@full_name', responseJson.u_full_name.toString())
                                await AsyncStorage.setItem('@user_mobile', responseJson.u_mobile.toString())
                                await AsyncStorage.setItem('@user_email', responseJson.u_email.toString())
                                await AsyncStorage.setItem('@referral_code', responseJson.referral_code.toString())
                            }
                            catch (e) {
                                console.error(e);
                            }
                            // this.props.navigation.navigate('EditProfile')
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                        else if (responseJson.status == 'otp_wrong') {
                            Snackbar.show({
                                title: 'Invalid OTP',
                                color: COLORS.white,
                            });
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
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <View style={{ margin: 16 }}>
                            <Text style={[StyleCommon.boldBlackText, { alignSelf: 'center', marginTop: 50 }]}>Mobile Verification</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { alignSelf: 'center', marginTop: 10 }]}>
                                We have sent the OTP on {this.state.userMobile}
                            </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={[StyleCommon.inputBox, { marginTop: 20 }]}
                                placeholder="Enter OTP"
                                onChangeText={text => this.setState({ userOtp: text })} />
                            <View style={{ padding: 10, alignContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                                {(() => {
                                    if (this.state.timer == 1) {
                                        return (
                                            <TouchableOpacity onPress={this.otpSend.bind(this, this.state.userMobile)}>
                                                <Text style={{ color: COLORS.themeColor, fontSize: 20 }}>Resend OTP</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    else {
                                        return (
                                        <Text style={{ color: COLORS.themeColor, fontSize: 20 }}> {this.state.timer} </Text>
                                        )
                                    }
                                })()}
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 5, color: COLORS.themeColor, textAlign: 'center', paddingVertical:10, textDecorationLine:'underline'}} onPress={() => this.props.navigation.goBack()}>Go Back</Text>
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