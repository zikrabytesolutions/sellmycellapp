import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';
import HomeHeader from '../components/headerhome.js';

export default class SpecificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            varientId: '',
            mobileId: '',
            dataSource: [],
        }
    }

    componentDidMount() {
        const varid = this.props.navigation.getParam('varient_id', '');
        this.setState({
            varientId: varid,
        })
        return fetch(Common.BASEURL + 'mobilespec.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'varient_id=' + varid,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
                        mobileId: responseJson.data.mobile_id,
                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        dataSource: [],
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong.',
                    color: 'white',
                });
            });
    }

    open = () => {
        this.props.navigation.navigate('OnOff', {
            //   brand_id: this.state.brandId,
            //   model_id: this.state.modelId,
            //   varient_id: this.state.varientId,
            mobile_id: this.state.mobileId,
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else if (this.state.dataSource.length == 0) {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Device</Text>
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
                    <View style={StyleCommon.centerItem}>
                        <Text style={StyleCommon.textNothing}>Nothing to show here</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={StyleCommon.myHeaderBg}>
                        <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                        <Text style={StyleCommon.myHeaderText}>Device</Text>
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
                        <View>
                            <Image
                                style={styles.img}
                                resizeMode="contain"
                                source={{ uri: this.state.dataSource.icon }} />
                            <Text style={styles.phoneTitle}>{this.state.dataSource.mobile_title}</Text>
                            <View style={{
                                height: 2,
                                borderRadius: 100,
                                marginHorizontal: 30,
                                marginVertical: 12,
                                backgroundColor: COLORS.dividerColor
                            }}></View>

                            <View style={{ marginHorizontal: 16 }}>
                                <Text style={styles.specTxt}>Specification</Text>
                                <View style={{ margin: 10 }}>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.processor}</Text>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.ram_size}</Text>
                                    <Text style={styles.specDetailsTxt}>- {this.state.dataSource.internal_memory}</Text>
                                    {/* <Text style={styles.specDetailsTxt}>- {this.state.dataSource.front_camera}</Text>
                                <Text style={styles.specDetailsTxt}>- {this.state.dataSource.rear_camera}</Text>
                                <Text style={styles.specDetailsTxt}>- {this.state.dataSource.battery}</Text> */}
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginVertical: 10, alignItems: 'center' }}>
                                <Text style={{
                                    flex: 2,
                                    color: COLORS.themeColor,
                                    fontSize: 18,
                                    fontWeight: '700',
                                }}>GET UPTO</Text>
                                <Text style={{
                                    flex: 2,
                                    textAlign: 'right',
                                    color: COLORS.themeColor,
                                    fontSize: 32,
                                    fontWeight: '700',
                                }}>₹ {this.state.dataSource.price_new}</Text>
                            </View>
                            <View style={StyleCommon.inputsContainer}>
                                <TouchableHighlight underlayColor={COLORS.underlayColor} style={StyleCommon.fullWidthButton} onPress={this.open}>
                                    <Text style={StyleCommon.fullWidthButtonText}>GET EXACT VALUE</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight
    },
    itemContainer: {
        padding: 10,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        height: 200,
        margin: 16,
    },
    phoneTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textBlackColor,
    },
    specTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textBlackColor,
    },
    specDetailsTxt: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 2,
        color: COLORS.textDimColor,
    },
    inputsContainer: {
        flex: 1,
    },
    fullWidthButton: {
        borderRadius: 5,
        backgroundColor: COLORS.themeColor,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
    fullWidthButtonText: {
        fontSize: 20,
        color: 'white'
    }
});