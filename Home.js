import React, { Component } from "react";
import { View, Text, Animated, TouchableNativeFeedback } from "react-native";
import { db, firestore } from "./firebase";
import Hunch from "./Hunch.js";
import Event from "./Event.js";
import Lobby from "./Lobby.js";
import Tickets from "./Tickets.js";
import { styles } from "./StyleSheet.js";

const A = {
  Hunch: Animated.createAnimatedComponent(Hunch)
};

const userAreaStyle = {
  flex: 1,
  fontSize: 20,
  color: "powderblue",
  fontStyle: "italic",
  backgroundColor: "hotpink"
};

export default class Home extends Component {
  state = {
    nextEvent: null,
    lobby: false,
    colour: "hotpink"
  };

  componentDidMount() {
    db.getNextEvent()
      .then(event => {
        const newNextEvent = { ...event.data.data };
        newNextEvent.id = event.data.id;
        this.setState({
          nextEvent: newNextEvent
        });
      })
      .catch(console.log);
  }

  handleBuyInPress = () => {
    console.log("buy in button pressed..");
    const newNextEvent = { ...this.state.nextEvent };
    const { changeUserTickets } = this.props;
    const uid = this.props.user.uid;
    // console.log("uid", uid, "user", user);
    newNextEvent.boughtIn = true;
    db.changeUsersTickets(uid, -1)
      .then(res => {
        console.log(res.data.tickets);
        this.setState({ nextEvent: newNextEvent });
      })
      .then(res => changeUserTickets())
      .catch(console.log);
  };

  enterLobby = () => {
    this.setState({ lobby: true });
  };

  changeColour = () => {
    this.setState({
      colour: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() *
        255)}, ${Math.floor(Math.random() * 255)})`
    });
  };

  render() {
    const { nextEvent, lobby, colour } = this.state;
    const {
      hunchSwellSmall,
      hunchHeight,
      smallCoordinates,
      user,
      openDrawer
    } = this.props;
    return (
      <View style={[styles.homeContainer, { backgroundColor: colour }]}>
        <TouchableNativeFeedback onPress={openDrawer}>
          <View>
            <A.Hunch
              height={hunchSwellSmall}
              svgHeight="100"
              svgWidth="400"
              initialCoordinates={smallCoordinates}
              distance={20}
              hunchHeight={hunchHeight}
            />
          </View>
        </TouchableNativeFeedback>
        <Tickets tickets={user.tickets} />
        {!lobby ? (
          <View style={styles.userArea}>
            <Animated.Text style={userAreaStyle}>
              {`${user.username}\n WHAT'S ${"\n"} YOUR ${"\n "}`}
              HUNCH?
            </Animated.Text>
            <Event
              nextEvent={nextEvent}
              user={user}
              handleBuyInPress={this.handleBuyInPress}
              enterLobby={this.enterLobby}
            />
            <View style={{ flex: 2 }} />
          </View>
        ) : (
          <Lobby
            nextEvent={nextEvent}
            user={user}
            changeColour={this.changeColour}
            colour={colour}
          />
        )}
      </View>
    );
  }
}
