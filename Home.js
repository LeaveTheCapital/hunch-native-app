import React, { Component } from "react";
import { View, Text, Animated, TouchableNativeFeedback } from "react-native";
import { db, firestore } from "./firebase";
import Hunch from "./Hunch.js";
import Event from "./Event.js";
import Lobby from './Lobby.js';
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
    lobby: false
  };

  componentDidMount() {
    db
      .getNextEvent()
      .then(event => {
        const newNextEvent = { ...event.data.data };
        newNextEvent.id = event.data.id;
        this.setState({
          nextEvent: newNextEvent
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    const {lobby} = this.state;
    if (lobby) {
      const currentQRef = firestore
      .collection("Current_Questions")
      .where("live", "==", "true");
    currentQRef.onSnapshot(snap => {
      // console.log("snap", snap);
      if (snap.docs.length) {
        const data = snap.docs[0].data();
        console.log("data", data);
        let answers;
        if (data.ans === 3) {
          answers = [data.ans_a, data.ans_b, data.ans_c];
        } else if (data.ans === 2) {
          answers = [data.ans_a, data.ans_b];
        }
        this.setState({
          currentQ: {
            question: data.question,
            answers,
            last_for: data.last_for
          }
        });
      } else {
        this.setState({ currentQ: null });
      }
    });
    }
  }

  handleBuyInPress = () => {
    console.log("buy in button pressed..");
    const newNextEvent = { ...this.state.nextEvent };
    const { changeUserTickets } = this.props;
    const uid = this.props.user.uid;
    // console.log("uid", uid, "user", user);
    newNextEvent.boughtIn = true;
    db
      .changeUsersTickets(uid, -1)
      .then(res => {
        console.log(res.data.tickets);
        this.setState({ nextEvent: newNextEvent });
      })
      .then(res => changeUserTickets())
      .catch(console.log);
  };

  enterLobby = () => {
    this.setState({lobby: true})
  }

  render() {
    const { nextEvent, lobby } = this.state;
    const {
      hunchSwellSmall,
      hunchHeight,
      smallCoordinates,
      user,
      openDrawer
    } = this.props;
    return (
      <View style={styles.loginContainer}>
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
        {!lobby ? <View style={styles.userArea}>
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
            <View style={{ flex: 2 }}> 
            
            </View>
          </View> : <Lobby />
        }
      </View>
    );
  }
}
