import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';

class StartedScreen extends React.Component {
    _open = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'City' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style={{
                            flex: 1,
                            width: undefined,
                            height: 500,
                            marginHorizontal:16,
                            marginTop:20,
                        }}
                        resizeMode="contain"
                        source={require('../assets/images/getstarted.png')} />
                    <View style={StyleCommon.inputsContainer}>
                        <TouchableOpacity style={StyleCommon.fullWidthButton} onPress={this._open}>
                            <Text style={StyleCommon.fullWidthButtonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default StartedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.32,
        marginVertical: 20
    },
})