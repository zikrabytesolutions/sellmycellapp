import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import { Appbar } from 'react-native-paper';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import Common from '../utils/common.js';

export default class TermsReadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            dataSource: []
        };
    }
    componentDidMount() {
        fetch(Common.BASEURL + 'get_utils.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: 'name=terms_conditions',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
            })
            .catch((error) => {
            });
    }

    hideSpinner() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={StyleCommon.myHeaderBg}>
                    <IconFont name="angle-left" style={StyleCommon.myHeaderIcon} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
                    <Text style={StyleCommon.myHeaderText}>Terms &amp; Conditions</Text>
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
                <View style={{ flex: 1 }}>
                    <WebView
                        onLoad={() => this.hideSpinner()}
                        style={{ flex: 1 }}
                        source={{ uri: this.state.dataSource.value }}
                    />
                    {this.state.visible && (
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator
                                style={{ position: "absolute" }}
                                size="large"
                            />
                        </View>
                    )}
                </View>
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