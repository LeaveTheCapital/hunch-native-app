import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

const A = {
  Line: Animated.createAnimatedComponent(Line),
  Circle: Animated.createAnimatedComponent(Circle),
  Path: Animated.createAnimatedComponent(Path)
};

export default class App extends React.Component {
  state = {
    lineAnim: new Animated.Value(0),
    textAnim: new Animated.Value(0)
  };

  componentDidMount = () => {
    Animated.timing(this.state.lineAnim, {
      toValue: 390,
      easing: Easing.elastic(4),
      duration: 2000
    }).start();

    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 1
    }).start();
  };

  render() {
    let { lineAnim, textAnim } = this.state;
    const translatedLineAnim = lineAnim.interpolate({
      inputRange: [0, 390],
      outputRange: ["0", "100"]
    });

    return (
      <View style={styles.container}>
        <Svg height="200" width="400">
          <A.Circle
            cx="80"
            cy="100"
            r={translatedLineAnim}
            stroke="turquoise"
            strokeWidth="3"
            fill={`rgb(${(3 * 50) % 255}, 100, 100)`}
          />
          <A.Line
            x1="190"
            y1="100"
            x2={translatedLineAnim}
            y2={translatedLineAnim}
            stroke="turquoise"
            strokeWidth="2"
          />
        </Svg>
        <View style={{ flex: 1 }}>
          <Animated.Text style={{ fontSize: textAnim }}>HUNCH</Animated.Text>
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
