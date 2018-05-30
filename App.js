import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import Hunch from "./Hunch.js";
import Login from "./Login.js";

const A = {
  Line: Animated.createAnimatedComponent(Line),
  Circle: Animated.createAnimatedComponent(Circle),
  Path: Animated.createAnimatedComponent(Path),
  Hunch: Animated.createAnimatedComponent(Hunch)
};

export default class App extends React.Component {
  state = {
    textAnim: new Animated.Value(0),
    pinkAnim: new Animated.Value(0),
    user: {email: 'hiya "user"'},
    hunchHeight: 100,
    initialCoordinates: "10, 40"
  };

  componentDidMount = () => {
    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 0.1
    }).start();
    Animated.timing(this.state.pinkAnim, {
      toValue: 100,
      delay: 2000,
      duration: 3000
    }).start();
  };

  loginLocally = user => {
    console.log("user logging in...", user);
    this.setState({ user, hunchHeight: 30 });
  };

  render() {
    let { textAnim, pinkAnim, user, hunchHeight } = this.state;
    const initialCoordinates = [30,40];

    const pinkSwell = pinkAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgb(199,21,133)", "rgb(255,105,180)"]
    });

    const hunchSwell = textAnim.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 100]
    });

    const hunchSwellSmall = textAnim.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 30]
    });
    if (!user) {
      return (
        <View style={styles.container}>
          
              <A.Hunch
                height={hunchSwell}
                initialCoordinates={initialCoordinates}
                distance={70}
              />
            <View style={styles.userArea}>
              <Login loginLocally={this.loginLocally} />
            </View>
          
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
              <A.Hunch
                height={hunchSwellSmall}
                initialCoordinates={initialCoordinates}
                distance={20}
              />
            <View style={styles.userArea}>
              <Animated.Text
                style={{
                  fontSize: textAnim,
                  color: "powderblue",
                  fontStyle: "italic",
                  backgroundColor: pinkSwell
                }}
              >
                {user.email ? `${user.email}\n` : ""}WHAT'S {"\n"} YOUR {"\n"}{" "}
                HUNCH?
              </Animated.Text>
            </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff69b4",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  userArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
