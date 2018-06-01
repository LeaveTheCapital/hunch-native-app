import React, { Component } from "react";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#ff69b4",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  userArea: {
    flex: 1
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "center"
  },
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
    borderWidth: 1,
    borderColor: "black",
    marginRight: 60
  },
  ticketsText: {
    color: "white",
    fontSize: 19,
    fontFamily: "monospace"
  },
  ticketsView: {
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    borderRadius: 2,
    top: 40,
    right: 10
  },
  eventView: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 5,
    shadowColor: "green",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3
  },
  eventTitle: {
    fontSize: 30
  },
  eventImage: { width: 225, height: 150 },
  text: {
    fontSize: 15
  },
  buyInButton: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
    color: "green"
  },
  disabledBuyInButton: {
    color: "grey",
    borderColor: "cornflowerblue",
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
    opacity: 0.5
  }
});
