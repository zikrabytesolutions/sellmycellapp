import React from 'react';
import { StyleSheet, Text } from 'react-native';
export const fonFix = () => {
    if(Platform.OS !== 'android') {
      return
    }

    const oldRender = Text.render
    Text.render = function (...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Roboto'}, origin.props.style]
      })
    }
  }