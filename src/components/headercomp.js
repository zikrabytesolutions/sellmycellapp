import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import SearchBar from 'react-native-searchbar';
import { Icon } from "react-native-elements";
import { Appbar } from 'react-native-paper';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class BackHeader extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <View style={{ height: 55, alignItems: 'center', padding: 16, backgroundColor: COLORS.themeColor, flexDirection: 'row' }}>
                <IconFont name="angle-left" style={{
                    color: '#fff',
                    width: 30,
                    height: 30
                }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                <Text style={{
                    fontSize: 18,
                    paddingHorizontal: 16,
                    color: COLORS.white
                }}>Select Brand</Text>
            </View>
        )
    }
}
