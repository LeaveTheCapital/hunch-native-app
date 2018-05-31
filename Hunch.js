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
    const { height, distance, initialCoordinates } = this.props;

    return (
      <Svg height="165" width="400">
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
          initialCoordinates={`${initialCoordinates[0] +
            distance} ${initialCoordinates[1] * 1.2}`}
        />
        <N
          fill="mediumvioletred"
          stroke="black"
          height={height}
          initialCoordinates={`${initialCoordinates[0] +
            distance * 2} ${initialCoordinates[1] * 1.2}`}
        />
        <C
          fill="whitesmoke"
          stroke="black"
          height={height}
          initialCoordinates={`${initialCoordinates[0] +
            distance * 3} ${initialCoordinates[1] * 1.25}`}
        />
        <H
          fill="cornflowerblue"
          stroke="black"
          height={height}
          initialCoordinates={`${initialCoordinates[0] +
            distance * 4} ${initialCoordinates[1] * 1.2}`}
        />
      </Svg>
    );
  }
}
9940076670395700;
