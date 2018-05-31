import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback
} from "react-native";
import Button from "./Button";

export default class Event extends Component {
  render() {
    const { nextEvent } = this.props;
    if (nextEvent) {
      console.log("nextEvent", nextEvent);
      const eventDate = new Date(nextEvent.date).toLocaleDateString();
      return (
        <View style={styles.eventView}>
          <Text style={styles.eventTitle}>Next Event:</Text>
          <Text style={styles.eventTitle}>{nextEvent.name}</Text>
          <Text style={styles.text}>{eventDate}</Text>
          {/* <Text style={styles.text}>{eventTime}</Text> */}
          <Image
            style={{ width: 225, height: 150 }}
            source={{ uri: `${nextEvent.img}` }}
          />
          <Button text="Buy Ticket" style={styles.buyInButton} />
        </View>
      );
    } else {
      return (
        <View style={styles.eventView}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  eventView: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3
  },
  eventTitle: {
    fontSize: 30
  },
  text: {
    fontSize: 15
  },
  buyInButton: {
    borderColor: "whitesmoke",
    borderWidth: 2,
    borderRadius: 5
  }
});
