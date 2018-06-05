import React, { Component } from "react";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#ff69b4",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  lobbyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lobbyTitle: {
    fontSize: 25,
    fontStyle: "italic",
    textAlign: "center"
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
  },
  questionModalOuter: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  questionModal: {
    // position: 'absolute',
    // top: 40,
    // right: 90,
    width: 300,
    height: 230,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 3,
    backgroundColor: "cornflowerblue"
  },
  questionTitle: {
    fontSize: 25,
    fontStyle: "italic",
    padding: 5
  },
  answerText: {
    fontSize: 15,
    color: "mediumvioletred",
    padding: 10,
    marginTop: 2.5,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "white",
    borderRadius: 3
  },
  form: {
    flex: 1,
    borderWidth: 2,
    borderColor: "white"
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 0,
    marginLeft: 30,
    marginRight: 30,
    padding: 2,
    backgroundColor: "hotpink"
  },
  submitButton: {
    backgroundColor: "cornflowerblue",
    borderColor: "orange",
    borderWidth: 7
  },
  lobbyView: {}
});
// formContainer marginTop was 40
