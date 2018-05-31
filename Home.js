import React, { Component } from "react";
import { View, Animated, TouchableNativeFeedback } from "react-native";
import axios from "axios";
import Hunch from "./Hunch.js";
import Event from "./Event.js";

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
    nextEvent: null
  };

  componentDidMount() {
    axios
      .get(
        "https://us-central1-test-database-92434.cloudfunctions.net/getNextEvent"
      )
      .then(event => {
        console.log(event.data);
        this.setState({
          nextEvent: event.data
        });
      })
      .catch(console.log);
  }

  render() {
    const { nextEvent } = this.state;
    const {
      styles,
      hunchSwellSmall,
      hunchHeight,
      smallCoordinates,
      user,
      openDrawer
    } = this.props;
    return (
      <View style={styles.container}>
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
        <View style={styles.userArea}>
          <Animated.Text style={userAreaStyle}>
            {`${user.username}\n WHAT'S ${"\n"} YOUR ${"\n "}`}
            HUNCH?
          </Animated.Text>
          <Event nextEvent={nextEvent} />
          <View style={{ flex: 2 }} />
        </View>
      </View>
    );
  }
}
