import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./Button";

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>Control Panel</Text>
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

const styles = StyleSheet.create({
  controlPanel: {
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: "cornflowerblue"
  },
  controlPanelWelcome: {
    color: "pink",
    fontSize: 20
  },
  signOutButton: {
    borderWidth: 3,
    borderColor: "black"
  }
});
