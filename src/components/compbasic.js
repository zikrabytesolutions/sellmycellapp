import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.fullWidthButton} onPress={this.props.onPress}>
          <Text style={styles.fullWidthButtonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: Dimensions.get('window').height / 1.32,
    marginVertical: 20
  },
  inputsContainer: {
    flex: 1,
  },
  fullWidthButton: {
    borderRadius: 5,
    backgroundColor: '#368BEA',
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
})
