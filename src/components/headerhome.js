import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // <TouchableOpacity
            // onPress={this.props.onPress}
            // >
            //   <Text> Button </Text>
            // </TouchableOpacity>

            <View style={StyleCommon.myHeaderBg}>
                <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                <Text style={StyleCommon.myHeaderText}>{this.props.title}</Text>
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
        )
    }
}