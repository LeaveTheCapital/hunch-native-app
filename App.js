import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import Hunch from './Hunch.js';
import Login from './Login.js';

const A = {
  Line: Animated.createAnimatedComponent(Line),
  Circle: Animated.createAnimatedComponent(Circle),
  Path: Animated.createAnimatedComponent(Path)
};

export default class App extends React.Component {
  state = {
    textAnim: new Animated.Value(0),
    user: 1
  };

  componentDidMount = () => {
    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 0.1
    }).start();
  };

  render() {
    let { textAnim, user } = this.state;
    const hunchHeight = 160;
    const initialCoordinates = '30 50';

    return <View style={styles.container}>
        <Hunch height={hunchHeight} initialCoordinates={initialCoordinates}/>
        <View style={{ flex: 1 }}>
        {user ? <Login /> :
        <Animated.Text style={{ fontSize: textAnim, color: 'powderblue', fontStyle: 'italic' }}>
            WHAT'S {'\n'} YOUR {'\n'} HUNCH
          </Animated.Text>}
          
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
