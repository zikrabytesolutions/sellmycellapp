import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import { List, ListItem } from 'react-native-elements'
import { Appbar } from 'react-native-paper';

export default class OrderHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            userId: '',
        }
    }

    async componentDidMount() {
        await this.orderHistroty();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            async () => {
                await this.orderHistroty();
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    async orderHistroty() {
        try {
            const user_id = await AsyncStorage.getItem('@user_id');
            const is_login = await AsyncStorage.getItem('@is_login');
            if (is_login == '' || is_login == null || is_login != 'yes') {
                this.props.navigation.replace('LoginMobile');
            }
            else {
                if (user_id != null && user_id != '') {
                    this.setState({
                        userId: user_id,
                    });
                    fetch(Common.BASEURL + 'order_history.php', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                            'Cache-Control': 'no-cache',
                        },
                        body: 'user_id=' + this.state.userId
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
                            Snackbar.show({
                                title: 'Sorry, something went wrong',
                                color: 'white',
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        });
                }
            }
        } catch (e) {
            // console.error(e);
        }
    }

    cancelOrder = (orderId) => {
        Alert.alert(
            "Do you want to cancel this order?",
            "You can't undo this action.",
            [
                {
                    text: 'Yes! I want', onPress: () => {
                        fetch(Common.BASEURL + 'order_cancel.php', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded',
                                'Cache-Control': 'no-cache'
                            },
                            body: 'order_id=' + orderId,
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    isLoading: false,
                                }, async function () {
                                    if (responseJson.status == 'success') {
                                        // const resetAction = StackActions.reset({
                                        //     index: 0,
                                        //     actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                        // });
                                        // this.props.navigation.dispatch(resetAction);
                                        this.orderHistroty();
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
                },
                {
                    text: 'Cancel',
                    // onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: true },
        );
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
                    <Appbar.Header style={StyleCommon.header}>
                        <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                        <Appbar.Content
                            title="Order History"
                            style={StyleCommon.headerText} />
                    </Appbar.Header>
                    <View style={StyleCommon.centerItem}>
                        <Text style={StyleCommon.textNothing}>Nothing to show here</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Appbar.Header style={StyleCommon.header}>
                        <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                        <Appbar.Content
                            title="Order History"
                            style={StyleCommon.headerText} />
                    </Appbar.Header>
                    <FlatList
                        style={{ marginVertical: 2.5 }}
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={[StyleCommon.whiteBorder, {
                                marginHorizontal: 5,
                                marginVertical: 2.5,
                            }]}>
                                <Text>Order Number: {item.order_number}</Text>
                                <Text>Placed Date: {item.created}</Text>
                                <View style={{ flexDirection: 'row', padding: 5 }}>
                                    <Image
                                        style={{ width: 80, height: 80 }}
                                        resizeMode="contain"
                                        source={{ uri: item.icon }} />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 10 }}>{item.mobile_title}</Text>
                                        <Text style={{ fontSize: 16, }}>₹ {item.final_price}</Text>
                                        <Text style={{ fontSize: 12 }}>Pickup Date &amp; Time: {item.pickup_date}, {item.pickup_tme_slot}</Text>
                                    </View>
                                </View>
                                <View style={{ height: 1, borderRadius: 100, backgroundColor: COLORS.dividerColor }}></View>
                                <View style={{ alignContent: "center", justifyContent: "center", marginHorizontal: 20, marginTop: 14 }}>
                                    <View style={{ flex: 1, width: '100%', height: 1.5, backgroundColor: COLORS.blackLight, position: 'absolute' }}></View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", }}>
                                        {(() => {
                                            if (item.status_placed == 1) {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: 'green' }}></View>)
                                            }
                                            else {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: COLORS.gray }}></View>)
                                            }
                                        })()}
                                        {(() => {
                                            if (item.status_processing == 1) {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: 'green' }}></View>)
                                            }
                                            else {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: COLORS.gray }}></View>)
                                            }
                                        })()}
                                        {(() => {
                                            if (item.status_onpickup == 1) {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: 'green' }}></View>)
                                            }
                                            else {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: COLORS.gray }}></View>)
                                            }
                                        })()}
                                        {(() => {
                                            if (item.status_completed == 1) {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: 'green' }}></View>)
                                            }
                                            else {
                                                return (<View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: COLORS.gray }}></View>)
                                            }
                                        })()}
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, }}>PLACED</Text>
                                    <Text style={{ fontSize: 12, }}>PROCESSING</Text>
                                    <Text style={{ fontSize: 12, }}>ON PICKUP</Text>
                                    <Text style={{ fontSize: 12, }}>COMPLETED</Text>
                                </View>
                                {(() => {
                                    if (item.is_cancel == 1) {
                                        {
                                            return (
                                                <Text style={{
                                                    color: COLORS.blackLight,
                                                    padding: 5,
                                                    fontSize: 16,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 20,
                                                    alignSelf: 'flex-end',
                                                    color: 'red',
                                                    backgroundColor: COLORS.backGroundDim,
                                                    paddingHorizontal: 10
                                                    // borderColor:'red',
                                                    // borderWidth:1,
                                                    // borderRadius:5,
                                                }}>Order Cancelled</Text>
                                            )
                                        }
                                    }
                                    else if (item.status_processing != 1 && item.status_onpickup != 1 && item.status_completed != 1) {
                                        return (
                                            <Text style={{
                                                paddingHorizontal: 16,
                                                borderRadius: 5,
                                                color: COLORS.blackLight,
                                                borderColor: COLORS.blackLight,
                                                borderWidth: 1,
                                                padding: 5,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 20,
                                                alignSelf: 'flex-end',
                                            }} onPress={this.cancelOrder.bind(this, item.order_id)}>CANCEL ORDER</Text>
                                        )
                                    }
                                })()}
                            </View>
                        )}
                    />
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
    itemContainer: {
        borderRadius: 5,
        padding: 10,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    img: {
        width: 80,
        height: 80,
    },
});