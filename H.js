import React from "react";
import { Animated, Easing } from "react-native";
import { Path } from "react-native-svg";

const A = {
  Path: Animated.createAnimatedComponent(Path)
};

export default class H extends React.Component {
  state = {
    pathAnim: new Animated.Value(0),
    color: "orange"
  };

  componentDidMount = () => {
    Animated.timing(this.state.pathAnim, {
      toValue: 1000,
      easing: Easing.elastic(15),
      duration: 3000
    }).start(() => this.setState({ color: "blue" }));
  };

  render() {
    let { pathAnim } = this.state;
    const { height, initialCoordinates, fill, stroke } = this.props;
    const pathSwell = pathAnim.interpolate({
      inputRange: [0, 1000],
      outputRange: ["0", `${height / 50}`]
    });

    return (
      <A.Path
        d={`M${initialCoordinates} v${height} a${height * 0.0625},${height *
          0.0625} 0 0,0 ${height * 0.125},0 v${height * -0.4375} a${height *
          0.0625},${height * 0.0625} 0 1,1 ${height * 0.125},0 v${height *
          0.4375} a${height * 0.0625},${height * 0.0625} 0 0,0 ${height *
          0.125},0 v${-height} a${height * 0.0625},${height *
          0.0625} 0 0,0 -${height * 0.125},0 v${height * 0.325} a${height *
          0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 v${height *
          -0.325} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height *
          0.125},0`}
        fill={fill}
        stroke={this.state.color}
        strokeWidth={pathSwell}
      />
    );
  }
}
