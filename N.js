import React from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Path } from "react-native-svg";

const A = {
  Path: Animated.createAnimatedComponent(Path)
};

export default class N extends React.Component {
  state = {
    pathAnim: new Animated.Value(0),
  };

  componentDidMount = () => {
    Animated.timing(this.state.pathAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 3000
    }).start();
  };

  render() {
    let { pathAnim } = this.state;
    const { height, initialCoordinates, fill, stroke  } = this.props;
    const pathSwell = pathAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["0", "2"]
    });

    return (<A.Path d={`M${initialCoordinates} 
    v${height} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 ${height*0.125},0 
    v${height*-0.875} 
    a${height * 0.0625},${height * 0.0625} 0 1,1 ${height*0.125},0 
    v${height*0.4375} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 ${height*0.125},0 
    v${-height} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 -${height*0.125},0 
    v${height*0.325} 
    a${height * 0.0625},${height * 0.0625} 0 1,1 -${height*0.125},0 
    v${height*-0.325} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 -${height*0.125},0`} fill={fill} stroke={stroke} strokeWidth={pathSwell} />)
  }
}