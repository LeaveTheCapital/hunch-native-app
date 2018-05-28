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
    pathAnim: new Animated.Value(0),
    textAnim: new Animated.Value(0)
  };

  componentDidMount = () => {
    Animated.timing(this.state.pathAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 3000
    }).start();
    
    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 0.2
    }).start();
  };

  render() {
    let { pathAnim, textAnim } = this.state;
    const pathSwell = pathAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["0", "2"]
    });

    return <View style={styles.container}>
        <Svg height="200" width="400">
          <A.Path d={`M30 30 v40 a2.5,2.5 0 0,0 5,0 v-17.5 a2.5,2.5 0 1,1 5,0 v17.5 a2.5,2.5 0 0,0 5,0 v-40 a2.5,2.5 0 0,0 -5,0 v13 a2.5,2.5 0 1,1 -5,0 v-13 a2.5,2.5 0 0,0 -5,0`} fill="yellow" stroke="black" strokeWidth={pathSwell} />
        </Svg>
        <View style={{ flex: 1 }}>
          <Animated.Text style={{ fontSize: textAnim }}>
            HUNCH
          </Animated.Text>
        </View>
      </View>;
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
