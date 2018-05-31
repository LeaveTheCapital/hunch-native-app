import React, { Component } from "react";
import { View, Animated, TouchableNativeFeedback } from "react-native";
import Hunch from "./Hunch.js";
import Event from "./Event.js";

const A = {
  Hunch: Animated.createAnimatedComponent(Hunch)
};

const userAreaStyles = {
  fontSize: 20,
  color: "powderblue",
  fontStyle: "italic",
  backgroundColor: "hotpink"
};

export default class Home extends Component {
  state = {
    nextEvent: {
      id: "wcg8",
      name: "World Cup Game 8",
      type: "Football",
      date: "2018-06-25 15:00:00",
      img: "https://placeimg.com/640/480/animals",
      description: "Some information about the event",
      live: false,
      start: false,
      complete: false,
      users: []
    }
  };
  render() {
    const { nextEvent } = this.state;
    const {
      styles,
      hunchSwellSmall,
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
              initialCoordinates={smallCoordinates}
              distance={20}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.userArea}>
          <Animated.Text style={userAreaStyles}>
            {`${user.username} WHAT'S ${"\n"} YOUR ${"\n "}`}
            HUNCH?
          </Animated.Text>
          <Event nextEvent={nextEvent} />
        </View>
      </View>
    );
  }
}
