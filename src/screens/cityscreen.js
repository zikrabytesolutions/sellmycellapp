import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class CityScreen extends Component {
    static navigationOptions = {
        title: 'Select City',
        headerStyle: StyleCommon.headerWhite,
        headerTintColor: COLORS.headerTintColorBlack,
        headerTitleStyle: StyleCommon.headerText,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cityId: ''
        }
    }

    async componentDidMount() {
        try {
            const city_id = await AsyncStorage.getItem('@city_id')
            this.setState({
                cityId: city_id,
            })
        }
        catch (e) {
        }
        fetch(Common.BASEURL + 'city.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
                Snackbar.show({
                    title: 'Sorry, something went wrong',
                    color: 'white',
                    duration: Snackbar.LENGTH_SHORT,
                });
            });
    }

    async _open(city_id, city_name, state_name) {
        try {
            await AsyncStorage.setItem('@city_id', city_id)
            await AsyncStorage.setItem('@city_name', city_name)
            await AsyncStorage.setItem('@state_name', state_name)
        } catch (e) {
            // console.error(error);
        }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ height: 55, alignItems: 'center', padding: 16, backgroundColor: COLORS.themeColor, flexDirection: 'row' }}>
                    <Text style={StyleCommon.myHeaderText}>Select City</Text>
                </View>
                <FlatGrid
                    itemDimension={100}
                    items={this.state.dataSource}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this._open(item.city_id.toString(), item.city_name.toString(), item.state_name.toString())}>
                            <View style={styles.itemContainer}>
                                <Image
                                    style={styles.img}
                                    resizeMode="contain"
                                    source={{ uri: item.city_icon }} />
                                <Text style={styles.itemName}>{item.city_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
    itemContainer: {
        borderRadius: 5,
        padding: 10,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    img: {
        width: 80,
        height: 80,
    },
});