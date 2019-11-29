import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';

export default class TouchSc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileId: '',
        }
    }

    static navigationOptions = {
        title: 'Answer few questions',
        headerStyle: StyleCommon.header,
        headerTintColor: COLORS.headerTintColor,
        headerTitleStyle: StyleCommon.headerText,
    }

    componentDidMount() {
        const mobId = this.props.navigation.getParam('mobile_id', '');
        this.setState({
            mobileId: mobId,
        })
    }

    open(ans) {
        if (ans == '1') {
            this.props.navigation.navigate('Accessories', {
                mobile_id: this.state.mobileId,
            })
        }
        else if (ans == '0') {
            this.props.navigation.navigate('Decline')
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ margin: 16 }}>
                        <Text style={StyleCommon.boldBlackText}>Display Touch Working</Text>
                        <Text style={[StyleCommon.semiboldGrayText, { marginTop: 2 }]}>
                            Are you able to use your device using touch screen?
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this.open.bind(this, '1')}>
                                <Text style={StyleCommon.fullWidthButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity style={StyleCommon.fullWidthButtonGray} onPress={this.open.bind(this, '0')}>
                                <Text style={StyleCommon.fullWidthButtonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
});
