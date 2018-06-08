import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default class LobbyButton extends Component {
  render() {
    const { style, onPress, text, textStyle } = this.props;
    return (
      <TouchableHighlight
        style={style}
        underlayColor="#B5B5B5"
        onPress={() => {
          onPress();
        }
        }
      >
        <Text style={textStyle || {}}>{text}</Text>
      </TouchableHighlight>
    );
  }
}
