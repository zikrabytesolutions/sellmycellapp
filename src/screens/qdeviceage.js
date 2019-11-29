import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';

export default class DeviceAgeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileId: '',
            isBox: '',
            isBill: '',
            isCharger: '',
            isEarphone: '',
            deviceAge: '',
            ischecked1: 0,
            ischecked2: 0,
            ischecked3: 0,
            ischecked4: 0,
        }
    }

    static navigationOptions = {
        title: 'Answer few questions',
        headerStyle: StyleCommon.header,
        headerTintColor: COLORS.headerTintColor,
        headerTitleStyle: StyleCommon.headerText,
    }

    open = () => {
        if (this.state.deviceAge == '') {
            Snackbar.show({
                title: 'Please select device age.',
                color: 'white',
            });
        }
        else {
            this.props.navigation.navigate('DeviceFault', {
                mobile_id: this.state.mobileId,
                is_box: this.state.isBox,
                is_bill: this.state.isBill,
                is_charger: this.state.isCharger,
                is_earphone: this.state.isEarphone,
                device_age: this.state.deviceAge,
            })
        }
    }

    componentDidMount() {
        this.setState({
            mobileId: this.props.navigation.getParam('mobile_id', ''),
            isBox: this.props.navigation.getParam('is_box', ''),
            isBill: this.props.navigation.getParam('is_bill', ''),
            isCharger: this.props.navigation.getParam('is_charger', ''),
            isEarphone: this.props.navigation.getParam('is_earphone', ''),
        })
    }

    render() {
        return (
            <View style={styles.container}>
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
                    <View >
                        <View style={{ margin: 16 }}>
                            <Text style={StyleCommon.boldBlackText}>Device Age</Text>
                            <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                                How old is your device?
                        </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 1,
                                            ischecked2: 0,
                                            ischecked3: 0,
                                            ischecked4: 0,
                                            deviceAge: 'below_3'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked1 == '0') {
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
                                            resizeMode="center"
                                            source={require('../assets/images/bill_month.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Below 3 months</Text>
                                        {/* <Text style={styles.itemSubText}>Bill is compulsory</Text> */}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 1,
                                            ischecked3: 0,
                                            ischecked4: 0,
                                            deviceAge: '3_to_6'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked2 == '0') {
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
                                            resizeMode="center"
                                            source={require('../assets/images/bill_month.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>3-6 months</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <TouchableOpacity style={[styles.itemContainerLeft, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 0,
                                            ischecked3: 1,
                                            ischecked4: 0,
                                            deviceAge: '6_to_11'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked3 == '0') {
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
                                            resizeMode="center"
                                            source={require('../assets/images/bill_month.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>6-11 months</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.itemContainerRight, StyleCommon.shadow]}
                                    onPress={() => {
                                        this.setState({
                                            ischecked1: 0,
                                            ischecked2: 0,
                                            ischecked3: 0,
                                            ischecked4: 1,
                                            deviceAge: 'above_11'
                                        })
                                    }}>
                                    {(() => {
                                        if (this.state.ischecked4 == '0') {
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
                                            resizeMode="center"
                                            source={require('../assets/images/bill_month.png')}
                                            style={styles.itemImg}></Image>
                                        <Text style={styles.itemText}>Above 11 months</Text>
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
        height: 170,
        marginVertical: 5,
        marginLeft: 10,
        marginRight: 5,
    },
    itemContainerRight: {
        flex: 2,
        height: 170,
        marginVertical: 5,
        marginLeft: 5,
        marginRight: 10
    },
    itemSubContainer: {
        alignItems: 'center',
        marginTop: -16
    },
    itemImg: {
        height: 70,
        marginBottom: 14
    },
    itemText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDimColor,
    },
    itemSubText: {
        fontSize: 14,
        marginTop: 2,
        color: COLORS.textDimColor,
    },
    itemCheck: {
        width: 20,
        height: 20,
        margin: 10,
        alignSelf: 'flex-end'
    }
});
