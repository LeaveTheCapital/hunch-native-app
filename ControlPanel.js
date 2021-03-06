import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants, WebBrowser } from "expo";
import { styles } from "./StyleSheet";

import Button from "./Button";

export default class ControlPanel extends Component {
  handlePressButtonAsync = async () => {
    const { user, changeUserTickets, closeDrawer } = this.props;
    let result = await WebBrowser.openBrowserAsync(
      `https://ci27ow4ut6.execute-api.eu-west-2.amazonaws.com/latest/pay/${
        user.uid
      }?amount=${1}`
    );
    changeUserTickets();
    closeDrawer();
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>{user.username}</Text>
        <Button
          style={styles.signOutButton}
          textStyle={styles.signOutText}
          onPress={() => {
            this.props.signOut();
          }}
          text="Sign Out"
        />
        <Button
          style={styles.signOutButton}
          textStyle={styles.controlPanelText}
          onPress={() => {
            this.handlePressButtonAsync();
          }}
          text="Buy Tickets"
        />
        <Button
          style={styles.signOutButton}
          textStyle={styles.controlPanelText}
          onPress={() => {
            console.log("Don't touch that please");
          }}
          text="Account"
        />
        <Button
          style={styles.signOutButton}
          textStyle={styles.controlPanelText}
          onPress={() => {
            console.log("Don't touch that please");
          }}
          text="Contact Us"
        />
      </View>
    );
  }
}
