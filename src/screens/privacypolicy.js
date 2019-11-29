import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import { Appbar } from 'react-native-paper';
import Common from '../utils/common.js';

export default class AboutScreen extends Component {
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
            body: 'name=privacy_policy',
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
                <Appbar.Header style={StyleCommon.header}>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
                    <Appbar.Content
                        title="Privacy Policy"
                        style={StyleCommon.headerText} />
                </Appbar.Header>

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