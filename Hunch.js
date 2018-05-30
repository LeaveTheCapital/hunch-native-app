import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import H from "./H.js";
import U from "./U.js";
import N from "./N.js";
import C from "./C.js";

const A = {
  Line: Animated.createAnimatedComponent(Line),
  Circle: Animated.createAnimatedComponent(Circle),
  Path: Animated.createAnimatedComponent(Path)
};

export default class Hunch extends React.Component {
  render() {
    const { height, initialCoordinates } = this.props;

    return (
      <Svg height="280" width="400">
        <H
          fill="yellow"
          stroke="black"
          height={height}
          initialCoordinates={initialCoordinates}
        />
        <U
          fill="red"
          stroke="black"
          height={height}
          initialCoordinates="100 50"
        />
        <N
          fill="mediumvioletred"
          stroke="black"
          height={height}
          initialCoordinates="170 50"
        />
        <C
          fill="whitesmoke"
          stroke="black"
          height={height}
          initialCoordinates="240 70"
        />
        <H
          fill="cornflowerblue"
          stroke="black"
          height={height}
          initialCoordinates="310 50"
        />
      </Svg>
    );
  }
}
9940076670395700;
