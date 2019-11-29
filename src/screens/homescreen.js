import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, Animated, Dimensions, BackHandler, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import { Icon } from "react-native-elements";
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigationFocus } from 'react-navigation';
import Common from '../utils/common.js';

let { width, height } = Dimensions.get('window');

class HomeScreen extends Component {

    // static navigationOptions = {
    //     title: 'Home',
    // headerLeft:
    //     <Icon
    //         name="bars"
    //         size={28}
    //         style={{ marginLeft: 10 }}
    //         color="white"
    //         onPress={() => navigation.toggleDrawer()}>
    //     </Icon>
    // ,
    //     headerStyle: {
    //         backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //     }
    // }

    // static navigationOptions = {
    //     title: 'Home',
    //     headerLeft:
    //         <Icon
    //             name="bars"
    //             size={28}
    //             style={{ marginLeft: 10 }}
    //             color="white"
    //             onPress={() => navigation.toggleDrawer()}>
    //         </Icon>
    //     ,
    //     headerStyle: StyleCommon.headerWhite,
    //     headerTintColor: COLORS.headerTintColorBlack,
    //     headerTitleStyle: StyleCommon.headerText,
    //     backgroundColor:'white'
    // }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            backClickCount: 0,
            dataSource: [],
        }
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        fetch(Common.BASEURL + 'slider.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                });
            })
            .catch((error) => {
                // console.error(error);
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong.',
                    color: 'white',
                });
            });
    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    // }
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    // }
    // handleBackButton = () => {
    //     this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    //     return true;
    // };

    // componentDidUpdate(prevProps) {
    //     if (prevProps.isFocused != this.props.isFocused) {
    //         // Use the `this.props.isFocused` boolean
    //         // Call any action
    //         if (this.props.isFocused) {
    //             BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    //         }
    //         else {
    //             BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    //         }
    //     }
    // }

    async componentDidMount() {
        fetch(Common.BASEURL + 'slider.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                });
            })
            .catch((error) => {
                // console.error(error);
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong.',
                    color: 'white',
                });
            });
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            async () => {
                this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
            }
        );
    }

    // componentWillUnmount() {
    //     this.willFocusSubscription.remove();
    //     this.backHandler.remove()
    // }

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.05 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={styles.exitTitleText}>Press back again to exit the app</Text>
                    {/* <TouchableOpacity activeOpacity={0.9} onPress={() => BackHandler.exitApp()}>
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity> */}
                </Animated.View>
                <Appbar.Header style={StyleCommon.header}>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                    <Appbar.Content
                        title="Home"
                        style={StyleCommon.headerText} />
                    {/* <Appbar.Action icon="room" onPress={() => this.props.navigation.navigate('City')} /> */}
                    <View style={{ marginRight: 10 }} >
                        <Icon underlayColor={COLORS.themeColor} name='map-pin' type='feather' color='#fff' onPress={() => this.props.navigation.navigate('City')} />
                    </View>
                </Appbar.Header>
                <ScrollView >
                    <View>
                        <ViewPager style={styles.viewPager} initialPage={0}>
                            {(() => {
                                if (this.state.dataSource.length > 0) {
                                    var myloop = [];
                                    for (let i = 0; i < this.state.dataSource.length; i++) {
                                        myloop.push(
                                            <View key={i}>
                                                <View style={styles.imagecontainer}>
                                                    <Image
                                                        resizeMode="stretch"
                                                        source={{ uri: this.state.dataSource[i].slider_img }}
                                                        style={styles.cover}></Image>
                                                </View>
                                            </View>
                                        );
                                    }
                                    return myloop
                                }
                            })()}
                        </ViewPager>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchMobile')}>
                            <View style={[StyleCommon.whiteBorder, { flexDirection: "row", paddingVertical: 10, paddingHorizontal: 16, marginHorizontal: 10, marginTop: 10 }]}>
                                <Icon color={COLORS.blackLight} type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
                                <Text style={{ color: COLORS.blackLight, fontSize: 18, marginLeft: 16 }}>Search your device</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <TouchableOpacity style={[styles.sellContainerLeft, StyleCommon.shadowTab, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}
                                onPress={() => this.props.navigation.navigate('Brand')}>
                                <View style={styles.sellimgtxt}>
                                    <Image
                                        resizeMode="stretch"
                                        source={require('../assets/images/tab_mobile.png')}
                                        style={styles.sellimage}></Image>
                                    <Text style={styles.selltxt}>Sell Mobile</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.sellContainerRight, StyleCommon.shadowTab, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../assets/images/m_tab.png')}
                                    style={styles.comImg}></Image>
                                <Text style={styles.comTxt}>Coming Soon</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                            <View style={[styles.sellContainerLeft, StyleCommon.shadowTab, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../assets/images/m_laptop.png')}
                                    style={styles.comImg}></Image>
                                <Text style={styles.comTxt}>Coming Soon</Text>
                            </View>
                            <View style={[styles.sellContainerRight, StyleCommon.shadowTab, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../assets/images/m_service.png')}
                                    style={styles.comImg}></Image>
                                <Text style={styles.comTxt}>Coming Soon</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

export default withNavigationFocus(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundDim
    },
    viewPager: {
        height: 200,
    },
    imagecontainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 8,
    },
    cover: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 5,
    },
    sellContainerLeft: {
        flex: 2,
        height: 140,
        marginTop: 8,
        marginLeft: 10,
        marginRight: 4
    },
    sellContainerRight: {
        flex: 2,
        height: 140,
        marginTop: 8,
        marginLeft: 4,
        marginRight: 10
    },
    sellimgtxt: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellimage: {
        width: 50,
        height: 80,
        marginVertical: 16,
        marginEnd: 5,
        marginLeft: 16,
        alignSelf: 'center'
    },
    selltxt: {
        flex: 2,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        marginEnd: 10,
        color: COLORS.blackLight,
    },

    comImg: {
        width: 75,
        height: 75,
        marginTop: 16
    },

    comTxt: {
        color: COLORS.white,
        fontSize: 12,
        margin: 10,
        borderRadius: 40,
        paddingHorizontal:10,
        paddingVertical:3,
        backgroundColor: COLORS.greenBtn,
    },

    animatedView: {
        // width,
        // flex:1,
        // marginHorizontal:16,
        alignSelf: 'center',
        backgroundColor: '#636363',
        elevation: .5,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 100
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    // exitText: {
    //     color: "#d94f4d",
    //     paddingHorizontal: 10,
    //     paddingVertical: 3,
    //     fontSize:14,
    //     fontWeight:'700'
    // }
});