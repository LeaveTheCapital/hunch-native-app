import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { Path } from "react-native-svg";
import extractBrush from "react-native-svg/lib/extract/extractBrush";

const A = {
  Path: Animated.createAnimatedComponent(Path)
};

export default class C extends React.Component {
  state = {
    pathAnim: new Animated.Value(0),
    redAnim: new Animated.Value(0),
    color: "orange"
  };

  componentDidMount = () => {
    Animated.timing(this.state.redAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 3000,
      useNativeDriver: false
    }).start();
    Animated.timing(this.state.pathAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 3000
    }).start(() => this.setState({ color: "yellow" }));
  };

  render() {
    let { pathAnim, redAnim } = this.state;
    const { height, initialCoordinates, fill, stroke } = this.props;
    const pathSwell = pathAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["0", `${height / 50}`]
    });

    const redSwell = redAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["rgb(100,121,100)", "rgb(199,21,133)"]
    });

    return (
      <A.Path
        d={`M${initialCoordinates} 
    v${height * 0.75} 
    a${height * 0.1875},${height * 0.1875} 0 0,0 ${height * 0.375},0
    a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 
    a${height * 0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 
    v${-height * 0.75} 
    a${height * 0.0625},${height * 0.0625} 0 1,1 ${height * 0.125},0
    
    a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0     
    
    a${height * 0.1875},${height * 0.1875} 0 0,0 -${height * 0.375},0    
    
    `}
        fill={redSwell.__getAnimatedValue()}
        stroke={this.state.color}
        strokeWidth={pathSwell}
      />
    );
  }
}
