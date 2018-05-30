import React from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Path } from "react-native-svg";

const A = {
  Path: Animated.createAnimatedComponent(Path)
};

export default class N extends React.Component {
  state = {
    pathAnim: new Animated.Value(0),
    color: "yellow"
  };

  componentDidMount = () => {
    Animated.timing(this.state.pathAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 1000
    }).start(() => {
      this.setState(
        { color: "cornflowerblue", pathAnim: new Animated.Value(0) },
        () => {
          Animated.timing(this.state.pathAnim, {
            toValue: 1000,
            easing: Easing.elastic(25),
            duration: 1000
          }).start();
        }
      );
    });
  };

  render() {
    let { pathAnim } = this.state;
    const { height, initialCoordinates, fill, stroke } = this.props;
    const pathSwell = pathAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["0", "2"]
    });

    return (
      <A.Path
        d={`M${initialCoordinates} 
    v${height} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 
    v${height * -0.57} 
    a${height * 0.00625},${height * 0.00625} 0 1,1 ${height * 0.0125},0 
    l${height * 0.1275} ${height * 0.53} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 
    v${-height} 
    a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 
    v${height * 0.57} 
    a${height * 0.00625},${height * 0.00625} 0 1,1 -${height * 0.0125},0 
    l${height * -0.1275} ${height * -0.53}  
    a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0`}
        fill={fill}
        stroke={this.state.color}
        strokeWidth={pathSwell}
      />
    );
  }
}
