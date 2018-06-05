import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants, WebBrowser } from "expo";
import { styles } from "./StyleSheet";

import Button from "./Button";

export default class ControlPanel extends Component {
  handlePressButtonAsync = async () => {
    const userId = this.props.user.uid;
    let result = await WebBrowser.openBrowserAsync(
      `https://hunch-paypal-api.herokuapp.com/pay/${userId}?amount=10`
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>{user.username}</Text>
        <Button
          onPress={() => {
            this.props.closeDrawer();
          }}
          text="Close Drawer"
        />
        <Button
          style={styles.signOutButton}
          onPress={() => {
            this.props.signOut();
          }}
          text="Sign Out"
        />
        <Button
          style={styles.signOutButton}
          onPress={() => {
            this.handlePressButtonAsync();
          }}
          text="Buy Tickets"
        />
      </View>
    );
  }
}
