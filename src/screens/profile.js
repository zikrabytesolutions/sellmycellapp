import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import { Appbar } from 'react-native-paper';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { FlatGrid } from 'react-native-super-grid';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],

            userId: '',
            fullName: '',
            mobile: '',
            email: '',
        }
    }

    async componentDidMount() {
        await this.getAddress();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            async () => {
                await this.getAddress();
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    async getAddress() {
        try {
            const is_login = await AsyncStorage.getItem('@is_login');
            if (is_login == '' || is_login == null || is_login != 'yes') {
                this.props.navigation.replace('LoginMobile');
                // this.props.navigation.goBack();
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

                return fetch(Common.BASEURL + 'user_address.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache'
                    },
                    body: 'user_id=' + uid
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
            }
        } catch (e) {
            // console.error(e);
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
                    <Appbar.Header style={StyleCommon.header}>
                        <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                        <Appbar.Content
                            title="Profile"
                            style={StyleCommon.headerText} />
                    </Appbar.Header>
                    <ScrollView style={{ marginVertical: 2.5, flex: 1 }}>
                        <View>
                            <View style={[StyleCommon.whiteBorder, { alignItems: 'center', marginHorizontal: 5, marginVertical: 2.5 }]}>
                                <Image
                                    style={styles.img}
                                    resizeMode="contain"
                                    source={require('../assets/images/profile.png')} />
                                <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 5, color: COLORS.themeColor }}>{this.state.fullName}</Text>
                                <Text style={{ fontSize: 16, marginTop: 3 }}>{this.state.mobile}</Text>
                                <Text style={{ fontSize: 16, marginTop: 3 }}>{this.state.email}</Text>
                                <TouchableOpacity style={{
                                    paddingHorizontal: 40,
                                    borderRadius: 2,
                                    padding: 5,
                                    backgroundColor: COLORS.themeColor,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 16,
                                }} onPress={() => this.props.navigation.navigate('EditProfile')}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white'
                                    }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({ item }) => (
                                    <View key={item.aid} style={[StyleCommon.whiteBorder, { marginHorizontal: 5, marginVertical: 2.5 }]}>
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
                                        <Text style={{ fontSize: 14, paddingHorizontal: 5, fontWeight: '700', color: COLORS.themeColor, alignSelf: "flex-end" }}
                                            onPress={() => {
                                                this.props.navigation.navigate('AddressEdit', {
                                                    address_id: item.aid,
                                                    address_type: item.type,
                                                    address_first: item.address_first,
                                                    address_second: item.address_second,
                                                    locality: item.locality,
                                                    city: item.city,
                                                    astate: item.state,
                                                    pincode: item.pincode,
                                                })
                                            }}>Edit</Text>
                                    </View>
                                )}
                            />
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
        backgroundColor: COLORS.backGroundDim,
    },
    img: {
        width: '100%',
        height: 90,
        marginTop: 10
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
});