import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default class Button extends Component {
  render() {
    const { style, onPress, text } = this.props;
    return (
      <TouchableHighlight
        style={style}
        underlayColor="#B5B5B5"
        onPress={() => {
          onPress();
        }}
      >
        <Text>{text}</Text>
      </TouchableHighlight>
    );
  }
}
