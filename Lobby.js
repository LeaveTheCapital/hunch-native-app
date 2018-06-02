import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Lobby extends Component {
  render() {
    const { currentQ } = this.props;
    return (
    <View>
                <Text>Lobby</Text>
                <Text>{currentQ ? `${this.state.currentQ.question} ${this.state.currentQ.answers[0]} ${this.state.currentQ.answers[1]}`: 'no questions yet'}</Text>
              </View>
      
    );
  }
}

