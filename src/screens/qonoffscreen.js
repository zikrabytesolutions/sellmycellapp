import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class OnOffScreen extends Component {

    // static navigationOptions = {
    //     title: 'Answer few questions',
    //     headerStyle: StyleCommon.header,
    //     headerTintColor: COLORS.headerTintColor,
    //     headerTitleStyle: StyleCommon.headerText,
    // }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            mobileId: '',
        }
    }

    componentDidMount() {
        const mobId = this.props.navigation.getParam('mobile_id', '');
        this.setState({
            mobileId: mobId,
        })
    }

    openTouch = () => {
        this.props.navigation.navigate('Accessories', {
            mobile_id: this.state.mobileId,
        })
    }

    openDecline = () => {
        this.props.navigation.navigate('Decline')
    }

    render() {
        return (
            <View>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Answer few questions</Text>
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
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ margin: 16 }}>
                            <Text style={StyleCommon.boldBlackText}>Power On</Text>
                            <Text style={StyleCommon.semiboldGrayText}>Does your device powers on?</Text>
                        </View>
                        <Image
                            style={{
                                flex: 1,
                                width: undefined,
                                height: 280,
                                margin:30
                            }}
                            resizeMode="contain"
                            source={require('../assets/images/power-off.png')} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.openTouch}>
                                    <Text style={StyleCommon.fullWidthButtonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 2 }}>
                                <TouchableOpacity style={StyleCommon.fullWidthButtonGray} onPress={this.openDecline}>
                                    <Text style={StyleCommon.fullWidthButtonText}>NO</Text>
                                </TouchableOpacity>
                            </View>
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