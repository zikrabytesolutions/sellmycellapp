import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator, Alert, TextInput, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import SearchBar from 'react-native-searchbar';
import { Icon } from "react-native-elements";
import { Appbar } from 'react-native-paper';
import IconFont from 'react-native-vector-icons/FontAwesome';

export default class MobileSearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: '',
            isFirst: true,
            searchText: '',
        }
    }

    search(searchText) {
        this.setState({
            isFirst: false,
            isLoading: true,
        });
        if (this.state.searchText == '') {
            Snackbar.show({
                title: 'Please enter search text',
                color: COLORS.white,
            });
        }
        else {
            fetch(Common.BASEURL + 'mobilesearch.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'search_text=' + searchText
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.error(responseJson)
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
    }

    clearSearch = () => {
        this.setState({
            searchText: '',
        });
    }
    open = (varientId) => {
        this.props.navigation.navigate('Specification', {
            varient_id: varientId
        })
    }

    render() {
        return (
            <View>
                {/* <View style={{ marginTop: 8, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <IconFont name="angle-left" style={{ color: COLORS.blackLight, width: 30, height: 30, marginLeft: 16 }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                </View> */}
                <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 14, margin: 10, borderRadius: 3, backgroundColor: '#FFFFFF', elevation: 5, }}>
                    {/* <Icon color={COLORS.blackLight} type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} /> */}
                    <IconFont name="angle-left" style={{ color: COLORS.blackLight, width: 30, height: 30, }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <TextInput style={{ flex: 1, paddingVertical: 10, fontSize: 18, }}
                        placeholder="Search your mobile to sell"
                        onChangeText={text => this.setState({ searchText: text })}
                        returnKeyType='search'
                        defaultValue={this.state.searchText}
                        onSubmitEditing={() => this.search(this.state.searchText)} />
                    {(() => {
                        if (this.state.searchText.length > 0) {
                            return (
                                <TouchableHighlight underlayColor={COLORS.white} style={{ paddingHorizontal: 16, paddingVertical: 12 }} onPress={this.clearSearch}>
                                    <Icon color={COLORS.blackLight} type="ionicon" name={Platform.OS === "ios" ? "ios-close" : "md-close"} />
                                </TouchableHighlight>
                            )
                        }
                    })()}
                </View>
                <View style={[StyleCommon.centerItem, { marginTop: 25 }]}>
                    <Text style={{ fontSize: 18, color: COLORS.blackLight }}>Search Result</Text>
                </View>
                <View style={{ height: 1, marginTop: 25, backgroundColor: COLORS.dividerColor }}></View>
                {(() => {
                    if (this.state.isLoading) {
                        (
                            <View style={{ flex: 1, padding: 20 }}>
                                <ActivityIndicator />
                            </View>
                        )
                    }
                    else if (this.state.isFirst == false && this.state.dataSource.length == 0) {
                        return (
                            <View style={{
                                paddingTop: 150,
                                flex: 1,
                                justifyContent: "center",
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={StyleCommon.textNothing}>No result found</Text>
                            </View>
                        )
                    }
                    else if (this.state.dataSource.length > 0) {
                        return (
                            <FlatList
                                style={{ marginVertical: 2.5 }}
                                data={this.state.dataSource}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity key={item.varient_id} onPress={this.open.bind(this, JSON.stringify(item.varient_id))}>
                                        <View style={[{ marginHorizontal: 5, marginVertical: 2.5, flexDirection: 'row', alignItems: 'center' }]}>
                                            <Image
                                                style={{ width: 80, height: 80, margin:8 }}
                                                resizeMode="contain"
                                                defaultsource={require('../assets/images/default_img.png')}
                                                source={{ uri: item.icon }} />
                                            <View>
                                                <Text style={{ fontSize: 16 }}>{item.varient}</Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 1, marginTop: 5, backgroundColor: COLORS.dividerColor }}></View>
                                    </TouchableOpacity>
                                )} />
                        )
                    }
                })()}
            </View >
        )
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{ flex: 1, padding: 20 }}>
        //             <ActivityIndicator />
        //         </View>
        //     )
        // }
        // else if (this.state.dataSource.length == 0) {
        //     return (
        //         <View style={StyleCommon.centerItem}>
        //             <Text style={StyleCommon.textNothing}>Nothing to show here</Text>
        //         </View>
        //     )
        // }
        // else {
        //     return (
        //         <View style={styles.container}>
        //             <View style={{ height: 55, backgroundColor: COLORS.themeColor, flexDirection: 'row', alignItems: 'center' }}>
        //                 <IconFont name="angle-left" style={{ color: '#fff', width: 30, height: 30, marginLeft: 16 }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
        //                 <Text style={StyleCommon.myHeaderText}>Select Brand</Text>
        //             </View>
        //             <TouchableOpacity onPress={() => this.searchBar.show()}>
        //                 <View style={[StyleCommon.shadow, { flexDirection: "row", paddingVertical: 14, paddingHorizontal: 16, }]}>
        //                     <Icon color={COLORS.gray} type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        //                     <Text style={{ color: COLORS.gray, fontSize: 18, marginLeft: 16 }}>Search</Text>
        //                 </View>
        //             </TouchableOpacity>
        //             />

        //   <FlatGrid
        //                 itemDimension={130}
        //                 items={this.state.tempDataSource}
        //                 renderItem={({ item }) => (
        //                     <TouchableOpacity onPress={this.open.bind(this, JSON.stringify(item.brand_id))}>
        //                         <View style={[styles.itemContainer, StyleCommon.shadow]}>
        //                             <Image
        //                                 style={styles.img}
        //                                 resizeMode="center"
        //                                 source={{ uri: item.icon }} />
        //                             <Text style={styles.itemName}>{item.brand_name}</Text>
        //                         </View>
        //                     </TouchableOpacity>
        //                 )}
        //             />
        //         </View>
        //     )
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundDim
    },
    itemContainer: {
        padding: 10,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    img: {
        width: 100,
        height: 100,
        margin: 10
    },
    icon: {
        paddingLeft: 10
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 120
    }
});