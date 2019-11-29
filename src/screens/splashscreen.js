import React from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, Animated } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import COLORS from '../assets/colors/color';
import AsyncStorage from '@react-native-community/async-storage';
let { width, height } = Dimensions.get('window');

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.springValue = new Animated.Value(0.8)
    }

    spring() {
        this.springValue.setValue(0.5)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                // friction: 2
            }
        ).start()
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        try {
            setTimeout(async () => {
                if (true) {
                    let route = '';
                    const city_id = await AsyncStorage.getItem('@city_id');
                    const city_name = await AsyncStorage.getItem('@city_name');
                    const state_name = await AsyncStorage.getItem('@state_name');
                    if (city_id == null || city_name == null || state_name == null) {
                        route = 'Started';
                    }
                    else {
                        route = 'Home';
                    }
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: route })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            }, 2000)
        } catch (e) {
            // console.error(e);
        }
        this.spring()
    }
    componentWillUnmount() {
        StatusBar.setHidden(false);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                    }}
                    resizeMode="repeat"
                    source={require('../assets/images/splash.png')} />
                <View style={{
                    flex: 1, width, height, backgroundColor:'#ffffff1f', position: 'absolute', justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Animated.Image
                        style={{
                            width: 290,
                            height: 166, transform: [{ scale: this.springValue }]
                        }}
                        source={require('../assets/images/logo.png')} />
                </View>
            </View>
        )
    }
}
export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backGroundLight,
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    },
    logo: {
        width: 290,
        height: 166,
    },
})