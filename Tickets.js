import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "./StyleSheet.js";

export default class Tickets extends Component {
  render() {
    const { tickets } = this.props;
    // console.log("tickets", String.fromCharCode(0 & 0x0337));
    const tickies = tickets === 0 ? "θ" : tickets;
    return (
      <View style={styles.ticketsView}>
        <Text style={styles.ticketsText}>{tickies}</Text>
      </View>
    );
  }
}
