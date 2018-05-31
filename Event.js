import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";

export default class Event extends Component {
  render() {
    const { nextEvent } = this.props;
    const eventDate = nextEvent.date.split(" ")[0];
    const eventTime = nextEvent.date.split(" ")[1];

    return (
      <View style={styles.eventView}>
        <Text style={styles.eventTitle}>{nextEvent.name}</Text>
        <Text style={styles.text}>{eventDate}</Text>
        <Text style={styles.text}>{eventTime}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventView: {
    flex: 1,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 5
  },
  eventTitle: {
    fontSize: 30
  },
  text: {
    fontSize: 15
  }
});
