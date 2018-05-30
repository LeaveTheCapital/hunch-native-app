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
    user: 1
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

  render() {
    let { textAnim, pinkAnim, user } = this.state;
    const hunchHeight = 160;
    const initialCoordinates = "30 50";

    const pinkSwell = pinkAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgb(199,21,133)", "rgb(255,105,180)"]
    });

    const hunchSwell = textAnim.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 100]
    });

    return (
      <View style={styles.container}>
        <A.Hunch height={hunchSwell} initialCoordinates={initialCoordinates} />
        <View style={{ flex: 1 }}>
          {!user ? (
            <Login />
          ) : (
            <Animated.Text
              style={{
                fontSize: textAnim,
                color: "powderblue",
                fontStyle: "italic",
                backgroundColor: pinkSwell
              }}
            >
              WHAT'S {"\n"} YOUR {"\n"} HUNCH?
            </Animated.Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff69b4",
    alignItems: "center",
    justifyContent: "center"
  }
});
