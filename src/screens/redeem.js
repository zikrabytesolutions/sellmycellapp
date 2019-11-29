import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Text, Share, TouchableHighlight, Clipboard, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default class RedeemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referralCode: '',
        }
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Download Sellmycell and use code ' + this.state.referralCode + ' to get extra money when you sell your phone.',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    async componentDidMount() {
        try {
            const referral_code = await AsyncStorage.getItem('@referral_code');
            const is_login = await AsyncStorage.getItem('@is_login');
            if (is_login == '' || is_login == null || is_login != 'yes') {
                this.props.navigation.replace('LoginMobile');
            }
            else {
                if (referral_code != null && referral_code != '') {
                    this.setState({ referralCode: referral_code })
                }
            }
        } catch (e) {
            // console.error(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header style={StyleCommon.header}>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                    <Appbar.Content
                        title="Refer &amp; Earn"
                        style={StyleCommon.headerText} />
                </Appbar.Header>
                <View style={{ height: 180, }}>
                    <Image
                        style={{
                            flex: 1,
                            width: undefined,
                            height: undefined,
                        }}
                        resizeMode="stretch"
                        source={require('../assets/images/referral.jpeg')} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, marginTop: 30, color: COLORS.textBlackColor, }}>Refer now &amp; earn up to Rs.200</Text>
                    <Text style={{ fontSize: 14, marginTop: 10, color: COLORS.textDimColor, marginHorizontal: 40, textAlign: 'center' }}>Send a referral link to your friends via SMS / Email / WhatsApp</Text>
                    <Text style={{ fontSize: 16, marginTop: 30, color: COLORS.textDimColor }}>REFERRAL CODE</Text>
                    <Text style={{
                        fontSize: 18,
                        marginTop: 5,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderColor: COLORS.blackLight,
                        borderRadius: 2,
                        fontWeight: '700',
                        color: COLORS.textBlackColor,
                        backgroundColor: COLORS.backGroundDim,
                    }} onPress={() => {
                        Clipboard.setString(this.state.referralCode);
                        ToastAndroid.show('Code copied', ToastAndroid.SHORT);
                    }}>{this.state.referralCode}</Text>
                </View>
                <TouchableHighlight underlayColor={COLORS.underlayColor} style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60, marginTop: 40 }]} onPress={this.onShare}>
                    <Text style={StyleCommon.fullWidthButtonText}>REFER NOW</Text>
                </TouchableHighlight>
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