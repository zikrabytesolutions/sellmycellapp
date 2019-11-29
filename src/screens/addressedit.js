import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class AddressEditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressId: '',
            addressType: '',
            addressFirst: '',
            addressSecond: '',
            locality: '',
            city: '',
            astate: '',
            pincode: '',
        }
    }

    async componentDidMount() {

        const aid = this.props.navigation.getParam('address_id', '');
        const atype = this.props.navigation.getParam('address_type', '');
        const add1 = this.props.navigation.getParam('address_first', '');
        const add2 = this.props.navigation.getParam('address_second', '');
        const local = this.props.navigation.getParam('locality', '');
        const cty = this.props.navigation.getParam('city', '');
        const stat = this.props.navigation.getParam('astate', '');
        const pcode = this.props.navigation.getParam('pincode', '');

        this.setState({
            addressId: aid,
            addressType: atype,
            addressFirst: add1,
            addressSecond: add2,
            locality: local,
            city: cty,
            astate: stat,
            pincode: pcode,
        })
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
            fetch(Common.BASEURL + 'user_address_edit.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'address_id=' + this.state.addressId +
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
                            this.props.navigation.goBack();
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
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Edit Address</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
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
                                defaultValue={this.state.addressFirst}
                                onChangeText={text => this.setState({ addressFirst: text })} />
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Address line 2"
                                defaultValue={this.state.addressSecond}
                                onChangeText={text => this.setState({ addressSecond: text })} />
                            <TextInput
                                style={[StyleCommon.inputBox, { marginTop: 10 }]}
                                placeholder="Locality"
                                defaultValue={this.state.locality}
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
                                <Text style={StyleCommon.fullWidthButtonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
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