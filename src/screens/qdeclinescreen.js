import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class DeclineScreen extends Component {
    // static navigationOptions = {
    //     title: 'Device not accepted',
    //     headerStyle: StyleCommon.header,
    //     headerTintColor: COLORS.headerTintColor,
    //     headerTitleStyle: StyleCommon.headerText,
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Device not accepted</Text>
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
                                flex: 1, width: null, height: Dimensions.get('window').height / 1.8,
                                marginTop: 50,
                                marginHorizontal: 30,
                                marginBottom: 20
                            }}
                            resizeMode="contain"
                            source={require('../assets/images/power-off.png')} />

                        <Text style={{
                            fontSize: 18,
                            marginVertical: 16,
                            fontWeight: '600',
                            marginHorizontal: 30,
                            textAlign: 'center',
                            color: COLORS.orange,
                        }}>Sorry, We are not accepting the device which is not switching on or touch not functioning.</Text>
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