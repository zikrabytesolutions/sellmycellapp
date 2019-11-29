import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import { StackActions, NavigationActions } from 'react-navigation';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class LoginMobileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
        }
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
            this.props.navigation.navigate('LoginOTP', {
                user_mobile: this.state.userMobile,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                            <Image
                                style={styles.img}
                                resizeMode="contain"
                                source={require('../assets/images/mobile_man.png')} />
                            <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: '700', }}>Enter your mobile number to login.</Text>
                            <Text style={{ marginTop: 20, alignSelf: 'center', fontSize: 18, textAlign: 'center' }}>We will send you one time password(OTP)</Text>
                            <TextInput
                                keyboardType='phone-pad'
                                style={[StyleCommon.inputBox, { marginTop: 10, marginTop: 20, fontSize: 20, textAlign: 'center', }]}
                                placeholder="Enter mobile number"
                                onChangeText={text => this.setState({ userMobile: text })} />
                        </View>
                        <View style={{ marginTop: 30, flex: 1, alignSelf: 'stretch' }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Send OTP</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 16, marginTop: 5, color: COLORS.themeColor, textAlign: 'center',paddingVertical:10, textDecorationLine:'underline' }} onPress={() => this.props.navigation.goBack()}>Go Back</Text>
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
    img: {
        width: 200,
        height: 200,
        marginTop: 16,
        alignSelf: 'center',
    },
});
