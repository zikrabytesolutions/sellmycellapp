import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
        }
    }
    navigateToScreen = (route) => {
        this.props.navigation.toggleDrawer()
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: route })],
        //   });
        //   this.props.navigation.dispatch(resetAction);

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: route })],
        // });
        // this.props.navigation.dispatch(resetAction);
    }

    async componentDidMount() {
        try {
            const islog = await AsyncStorage.getItem('@is_login');
            this.setState({ isLogin: islog })
        } catch (e) {
            // console.error(e);
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        width: '100%',
                        height: 120,
                        paddingVertical: 14,
                        paddingHorizontal: 8
                    }}>
                        <Image style={{
                            flex: 1,
                            width: undefined,
                            height: undefined,
                        }}
                            resizeMode="center"
                            source={require('../assets/images/logo.png')} />
                    </View>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.navigateToScreen('Page1')}>
                        <Icon name="home" size={24} style={styles.menuImg} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => {
                        if (this.state.isLogin != null && this.state.isLogin == 'yes') {
                            this.navigateToScreen('Page2')
                        }
                        else {
                            this.props.navigation.navigate('LoginMobile');
                        }
                    }}>
                        <Icon name="history" style={styles.menuImg} size={24} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => {
                        if (this.state.isLogin != null && this.state.isLogin == 'yes') {
                            this.navigateToScreen('Page3')
                        }
                        else {
                            this.props.navigation.navigate('LoginMobile');
                        }
                    }}>
                        <Icon name="user" style={styles.menuImg} size={24} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => {
                        if (this.state.isLogin != null && this.state.isLogin == 'yes') {
                            this.navigateToScreen('Page4')
                        }
                        else {
                            this.props.navigation.navigate('LoginMobile');
                        }
                    }}>
                        <Icon name="gift" style={styles.menuImg} size={24} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>Redeem Here</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.navigateToScreen('Page5')}>
                        <Icon name="question-circle" style={styles.menuImg} size={24} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>About US</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.navigateToScreen('Page6')}>
                        <Icon name="file-text" style={styles.menuImg} size={22} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>Terms &amp; Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.navigateToScreen('Page7')}>
                        <Icon name="file-text" style={styles.menuImg} size={22} color={COLORS.blackLight}></Icon>
                        <Text style={styles.menuItem}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuContainer} onPress={
                        async () => {
                            if (this.state.isLogin != null && this.state.isLogin == 'yes') {
                                Alert.alert(
                                    "Confirmation",
                                    "Are you sure you want to log out.",
                                    [
                                        {
                                            text: 'Yes! I want', onPress: async () => {
                                                try {
                                                    await AsyncStorage.removeItem('@is_login');
                                                    await AsyncStorage.removeItem('@user_id');
                                                    await AsyncStorage.removeItem('@full_name');
                                                    await AsyncStorage.removeItem('@user_mobile');
                                                    await AsyncStorage.removeItem('@user_email');
                                                    await AsyncStorage.removeItem('@city_id');
                                                    await AsyncStorage.removeItem('@city_name');
                                                    await AsyncStorage.removeItem('@state_name');
                                                }
                                                catch (exception) {
                                                    console.error(exception)
                                                }
                                                const resetAction = StackActions.reset({
                                                    index: 0,
                                                    actions: [NavigationActions.navigate({ routeName: 'Splash' })],
                                                });
                                                this.props.navigation.dispatch(resetAction);
                                            }
                                        },
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        }
                                    ],
                                    { cancelable: true },
                                );
                            }
                            else {
                                this.props.navigation.navigate('LoginMobile');
                            }
                        }}>
                        <Icon name="sign-out" style={styles.menuImg} size={24} color={COLORS.blackLight}></Icon>
                        {(() => {
                            if (this.state.isLogin != null && this.state.isLogin == 'yes') {
                                return (
                                    <Text style={styles.menuItem}>Log Out</Text>
                                )
                            }
                            else {
                                return (
                                    <Text style={styles.menuItem}>Sign In</Text>
                                )
                            }
                        })()}

                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};
export default SideMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    menuContainer: {
        marginHorizontal: 16,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuImg: {
        width: 24,
        height: 24
    },
    menuItem: {
        fontSize: 18,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: COLORS.textBlackColor
    }
})
