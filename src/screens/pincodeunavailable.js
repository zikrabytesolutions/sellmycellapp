import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class PincodeUnavailableScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Unavailable service</Text>
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
                <ScrollView >
                    <View>
                        <Image
                            style={{
                                flex: 1,
                                height: 300,
                                alignSelf: 'center',
                                marginTop: 50,
                                marginHorizontal: 40,
                                marginVertical: 60,
                                marginBottom: 20
                            }}
                            resizeMode="contain"
                            source={require('../assets/images/power-off.png')} />

                        <Text style={{
                            fontSize: 18,
                            marginVertical: 30,
                            fontWeight: '600',
                            marginHorizontal: 40,
                            textAlign: 'center',
                            color: COLORS.orange,
                        }}>Service not available to your current location</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
});