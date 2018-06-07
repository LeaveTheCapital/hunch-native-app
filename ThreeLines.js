import React from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class ThreeLines extends React.Component {

  render() {
    const { height, width } = this.props;
    const initialX = width < 380 ? 55 : 5;

    return (
      <Svg height="100" width="100" >
        <Path
          d={`M${initialX} 30 h${width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,${width / 120} h${-width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,-${width / 120}`}
          fill='cornflowerblue'
          stroke='mediumvioletred'
          strokeWidth='1'
        />
        <Path
          d={`M${initialX} 37 h${width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,${width / 120} h${-width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,-${width / 120}`}
          fill='cornflowerblue'
          stroke='mediumvioletred'
          strokeWidth='1'
        />
        <Path
          d={`M${initialX} 44 h${width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,${width / 120} h${-width / 13} a${width * 0.15},${width *
            0.15} 0 0,1 0,-${width / 120}`}
          fill='cornflowerblue'
          stroke='mediumvioletred'
          strokeWidth='1'
        />
      </Svg>
    );
  }
}
