import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, Alert, ToastAndroid, TextInput } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { CheckBox } from 'react-native-elements';

export default class OrderSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: '',
            mobileImg: '',
        }
    }

    async componentDidMount() {
        const order_number = this.props.navigation.getParam('order_number', '');
        const mobile_img = this.props.navigation.getParam('mobile_img', '');
        this.setState({
            orderNumber: order_number,
            mobileImg: mobile_img,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image style={styles.img}
                        resizeMode="contain"
                        source={{ uri: this.state.mobileImg }} />
                    <View style={[styles.container, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontWeight: '700', fontSize: 18, marginTop: 20 }}>Order No. # {this.state.orderNumber}</Text>
                        <Text style={{ fontSize: 16, marginTop: 5 }}>Your order has been placed successfully.</Text>
                    </View>
                    <View style={[StyleCommon.inputsContainer, { marginTop: 30 }]}>
                        <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={() => {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }}>
                            <Text style={StyleCommon.fullWidthButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight
    },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        height: 200,
        marginTop: 50,
        marginBottom: 16,
        marginHorizontal: 16,
    },
});