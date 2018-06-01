import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { styles } from "./StyleSheet";

import Button from "./Button";

export default class ControlPanel extends Component {
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
      </View>
    );
  }
}
