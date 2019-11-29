import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class AccessoriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileId: '',
            isBox: '0',
            isBill: '0',
            isCharger: '0',
            isEarphone: '0',
        }
    }

    // static navigationOptions = {
    //     title: 'Answer few questions',
    //     headerStyle: StyleCommon.header,
    //     headerTintColor: COLORS.headerTintColor,
    //     headerTitleStyle: StyleCommon.headerText,
    // }

    componentDidMount() {
        this.setState({ mobileId: this.props.navigation.getParam('mobile_id', '') })
    }

    open = () => {
        if (this.state.isBill == '1') {
            this.props.navigation.navigate('DeviceAge', {
                mobile_id: this.state.mobileId,
                is_box: this.state.isBox,
                is_bill: this.state.isBill,
                is_charger: this.state.isCharger,
                is_earphone: this.state.isEarphone,
            })
        }
        else if (this.state.isBill == '0') {
            this.props.navigation.navigate('DeviceFault', {
                mobile_id: this.state.mobileId,
                is_box: this.state.isBox,
                is_bill: this.state.isBill,
                is_charger: this.state.isCharger,
                is_earphone: this.state.isEarphone,
                device_age: 'above_11',
            })
        }
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Answer few questions</Text>
                        <View style={{ flex: 1, flexDirection: 'row',  justifyContent: 'flex-end', }}>
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
                                <Text style={StyleCommon.boldBlackText}>Accessories</Text>
                                <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                                    Please select available accessories
                        </Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                    <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                        onPress={() => {
                                            if (this.state.isBox == '0') {
                                                this.setState({ isBox: '1' })
                                            }
                                            else {
                                                this.setState({ isBox: '0' })
                                            }
                                        }}>
                                        {(() => {
                                            if (this.state.isBox == '0') {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/unchecked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/checked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                        })()}
                                        <View style={styles.itemSubContainer}>
                                            <Image
                                                resizeMode="stretch"
                                                source={require('../assets/images/a_box.png')}
                                                style={styles.itemImg}></Image>
                                            <Text style={styles.itemText}>Box</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                        onPress={() => {
                                            if (this.state.isBill == '0') {
                                                this.setState({ isBill: '1' })
                                            }
                                            else {
                                                this.setState({ isBill: '0' })
                                            }
                                        }}>
                                        {(() => {
                                            if (this.state.isBill == '0') {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/unchecked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/checked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                        })()}
                                        <View style={styles.itemSubContainer}>
                                            <Image
                                                resizeMode="stretch"
                                                source={require('../assets/images/a_bill.png')}
                                                style={styles.itemImg}></Image>
                                            <Text style={styles.itemText}>Valid Bill</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                        onPress={() => {
                                            if (this.state.isCharger == '0') {
                                                this.setState({ isCharger: '1' })
                                            }
                                            else {
                                                this.setState({ isCharger: '0' })
                                            }
                                        }}>
                                        {(() => {
                                            if (this.state.isCharger == '0') {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/unchecked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/checked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                        })()}
                                        <View style={styles.itemSubContainer}>
                                            <Image
                                                resizeMode="stretch"
                                                source={require('../assets/images/a_charger.png')}
                                                style={styles.itemImg}></Image>
                                            <Text style={styles.itemText}>Original Charger</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                        onPress={() => {
                                            if (this.state.isEarphone == '0') {
                                                this.setState({ isEarphone: '1' })
                                            }
                                            else {
                                                this.setState({ isEarphone: '0' })
                                            }
                                        }}>
                                        {(() => {
                                            if (this.state.isEarphone == '0') {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/unchecked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={require('../assets/images/checked.png')}
                                                        style={styles.itemCheck}></Image>
                                                )
                                            }
                                        })()}
                                        <View style={styles.itemSubContainer}>
                                            <Image
                                                resizeMode="stretch"
                                                source={require('../assets/images/a_earphone.png')}
                                                style={styles.itemImg}></Image>
                                            <Text style={styles.itemText}>Original Earphones</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={StyleCommon.inputsContainer}>
                                <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.open}>
                                    <Text style={StyleCommon.fullWidthButtonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
    itemContainerLeft: {
        flex: 2,
        height: 155,
        marginVertical: 5,
        marginLeft: 10,
        marginRight: 5,
    },
    itemContainerRight: {
        flex: 2,
        height: 155,
        marginVertical: 5,
        marginLeft: 5,
        marginRight: 10
    },
    itemSubContainer: {
        alignItems: 'center',
        marginTop: -16
    },
    itemImg: {
        width: 50,
        height: 50,
        margin: 16
    },
    itemText: {
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 20,
        textAlign: 'center',
        color: COLORS.textDimColor,
    },
    itemCheck: {
        width: 20,
        height: 20,
        margin: 10,
        alignSelf: 'flex-end'
    }
});
