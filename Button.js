import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default class Button extends Component {
  render() {
    const { style, onPress, text, disabled, disabledStyle } = this.props;
    return (
      <TouchableHighlight
        style={disabled ? disabledStyle : disabled}
        underlayColor="#B5B5B5"
        onPress={
          disabled
            ? null
            : () => {
                onPress();
              }
        }
      >
        <Text>{text}</Text>
      </TouchableHighlight>
    );
  }
}
