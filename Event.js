import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  Dimensions
} from "react-native";
import moment from "moment";
import Button from "./Button";
import { styles } from "./StyleSheet.js";

export default class Event extends Component {
  handleEnterLobbyPress = () => {
    const { enterLobby } = this.props;
    enterLobby();
  };
  render() {
    const { nextEvent, user, handleBuyInPress } = this.props;
    const { height, width } = Dimensions.get("screen");
    let disabled = false;
    if (user.tickets === 0) {
      disabled = true;
    }
    if (nextEvent) {
      if (nextEvent.boughtIn) {
        disabled = true;
      }
    }
    if (nextEvent) {
      const eventDate = new Date(nextEvent.date).toLocaleDateString();
      const eventTime = new Date(nextEvent.date).toLocaleTimeString();
      const timeUntilEventMs = nextEvent.date - Date.now();
      // const timeUntilEvent = new Date(timeUntilEventMs).toLocaleTimeString();
      const timeUntilEvent = moment(nextEvent.date).fromNow();

      const lobbyOpen = timeUntilEventMs < 3600000 ? true : false;
      return (
        <View style={styles.eventView}>
          <Text style={styles.eventTitle}>Next Event:</Text>
          <Text style={styles.eventTitle}>{nextEvent.name}</Text>
          <Text style={styles.text}>{eventDate}</Text>
          <Text style={styles.text}>{eventTime}</Text>
          <Image
            style={{ width: width * 0.4, height: height * 0.2 }}
            source={{
              uri: `${nextEvent.img}`
            }}
          />
          {!nextEvent.boughtIn ? (
            <Button
              text={"Buy In!"}
              style={styles.buyInButton}
              disabledStyle={styles.disabledBuyInButton}
              disabled={disabled}
              onPress={handleBuyInPress}
            />
          ) : !lobbyOpen ? (
            <Text>Event starts in... {timeUntilEvent};</Text>
          ) : (
            <Button
              text="Enter Lobby"
              style={styles.buyInButton}
              onPress={this.handleEnterLobbyPress}
            />
          )}
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
