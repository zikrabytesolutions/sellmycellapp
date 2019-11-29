import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userId: '',
            fullName: '',
            mobile: '',
            email: '',
        }
    }
    async componentDidMount() {
        try {
            const is_login = await AsyncStorage.getItem('@is_login');
            if (is_login == '' || is_login == null || is_login != 'yes') {
                this.props.navigation.navigate('LoginMobile');
            }
            else {
                const uid = await AsyncStorage.getItem('@user_id');
                if (uid !== null) {
                    this.setState({ userId: uid, })
                }
                const uname = await AsyncStorage.getItem('@full_name');
                if (uname !== null) {
                    this.setState({ fullName: uname, })
                }
                const umob = await AsyncStorage.getItem('@user_mobile');
                if (umob !== null) {
                    this.setState({ mobile: umob, })
                }
                const uemail = await AsyncStorage.getItem('@user_email');
                if (uemail !== null) { this.setState({ email: uemail, }) }
            }
        } catch (e) {
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
                            this.props.navigation.goBack();
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
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Personal Details</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <View style={{ margin: 16 }}>
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Full name"
                                defaultValue={this.state.fullName}
                                onChangeText={text => this.setState({ fullName: text })} />
                            <Text style={[StyleCommon.inputBoxDisable, { marginTop: 10 }]}>
                                {this.state.mobile}
                            </Text>
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Email(For invoice purpose)"
                                keyboardType="email-address"
                                defaultValue={this.state.email}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={[StyleCommon.fullWidthButton, { paddingHorizontal: 60 }]} onPress={this.open}>
                                <Text style={StyleCommon.fullWidthButtonText}>Submit</Text>
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