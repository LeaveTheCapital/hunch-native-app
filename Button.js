import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default class Button extends Component {
  render() {
    const { style, onPress, text, textStyle, disabled, disabledStyle } = this.props;
    return (
      <TouchableHighlight
        style={disabled ? disabledStyle : style}
        underlayColor="#B5B5B5"
        onPress={
          disabled
            ? null
            : () => {
              onPress();
            }
        }
      >
        <Text style={textStyle || {}}>{text}</Text>
      </TouchableHighlight>
    );
  }
}
