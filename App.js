import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  YellowBox
} from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { authDB, auth, db } from "./firebase";
import axios from "axios";
import Drawer from "react-native-drawer";
import Hunch from "./Hunch.js";
import Login from "./Login.js";
import Home from "./Home.js";
import ControlPanel from "./ControlPanel.js";
import { styles } from "./StyleSheet.js";

YellowBox.ignoreWarnings(["Setting"]);

const A = {
  Line: Animated.createAnimatedComponent(Line),
  Circle: Animated.createAnimatedComponent(Circle),
  Path: Animated.createAnimatedComponent(Path),
  Hunch: Animated.createAnimatedComponent(Hunch)
};

export default class App extends React.Component {
  state = {
    textAnim: new Animated.Value(0),
    pinkAnim: new Animated.Value(0),
    user: null,
    hunchHeight: 30,
    initialCoordinates: "10, 40"
  };

  componentDidMount = () => {
    const { height, width } = Dimensions.get("screen");
    this.setState({ hunchHeight: height / 6.7 });
    auth.onAuthStateChanged(user => {
      if (user) {
        Promise.all([user.uid, db.getUserInfo(user.uid)])
          .then(([uid, userDoc]) => {
            if (!userDoc.data.username) {
              this.loginLocally(null, null);
            } else {
              this.loginLocally(userDoc.data, uid);
            }
          })
          .catch(err => console.log("failed to get user info", err));
      } else {
        this.loginLocally(null);
      }
    });

    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 0.1,
      duration: 3000
    }).start();
    Animated.timing(this.state.pinkAnim, {
      toValue: 100,
      delay: 2000,
      duration: 3000
    }).start();
  };

  makeHunchSmallerOrBigger = () => {
    const { hunchHeight } = this.state;
    const { height, width } = Dimensions.get("screen");
    const newHunchHeight =
      hunchHeight >= height / 6.7 ? height / 18 : height / 6.7;
    this.setState({
      hunchHeight: newHunchHeight
    });
  };

  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };

  loginLocally = (user, uid) => {
    if (user) {
      const newUser = { ...user };
      newUser.uid = uid;
      this.setState({ user: newUser, hunchHeight: 30 });
    } else {
      this.setState({ user });
    }
  };

  signOut = () => {
    this.makeHunchSmallerOrBigger();
    authDB.doSignOut();
  };

  changeUserTickets = () => {
    const { user } = this.state;
    db.getUserInfo(user.uid)
      .then(userDoc => {
        const newTickets = userDoc.data.tickets;
        const newUser = { ...this.state.user };
        newUser.tickets = newTickets;
        this.setState({ user: newUser });
      })
      .catch(err =>
        console.log("failed to get user info after ticket update", err)
      );
  };

  render() {
    let { textAnim, pinkAnim, user, hunchHeight } = this.state;
    const { height, width } = Dimensions.get("screen");
    const initialCoordinates = [30, 45];
    const smallCoordinates =
      width < 380 ? [width / 2.3, height / 20] : [width / 2.7, height / 20];

    const pinkSwell = pinkAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgb(199,21,133)", "rgb(255,105,180)"]
    });

    const hunchSwell = textAnim.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 100]
    });

    const hunchSwellSmall = textAnim.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 30]
    });
    if (!user) {
      return (
        <View style={styles.loginContainer}>
          <A.Hunch
            height={hunchHeight >= height / 6.7 ? hunchSwell : hunchHeight}
            svgHeight={
              hunchHeight >= height / 6.7
                ? `${hunchHeight * 1.7}`
                : `${hunchHeight * 2.87}`
            }
            svgWidth="400"
            initialCoordinates={initialCoordinates}
            distance={70}
          />
          <View style={styles.userArea}>
            <Login makeHunchSmallerOrBigger={this.makeHunchSmallerOrBigger} />
          </View>
        </View>
      );
    } else {
      return (
        <Drawer
          type="overlay"
          content={
            <ControlPanel
              closeDrawer={this.closeDrawer}
              signOut={this.signOut}
              user={user}
              changeUserTickets={this.changeUserTickets}
            />
          }
          openDrawerOffset={0.6}
          closedDrawerOffset={-15}
          captureGestures={true}
          styles={drawerStyles}
          tweenHandler={ratio => ({ main: { opacity: (2 - ratio) / 2 } })}
          // tweenHandler={Drawer.tweenPresets.parallax}
          ref={ref => (this._drawer = ref)}
        >
          <Home
            hunchSwellSmall={hunchSwellSmall}
            hunchHeight={hunchHeight}
            smallCoordinates={smallCoordinates}
            user={user}
            openDrawer={this.openDrawer}
            changeUserTickets={this.changeUserTickets}
          />
        </Drawer>
      );
    }
  }
}

const drawerStyles = {
  drawer: {
    paddingLeft: 0,
    backgroundColor: "#BA4D83"
    // shadowColor: "red",
    // shadowOpacity: 0.8,
    // shadowRadius: 5
    // shadowOffset: 10,
  },
  main: {
    backgroundColor: "blue",
    paddingLeft: 3,
    shadowColor: "blue",
    shadowOpacity: 0.8,
    shadowRadius: 5
  }
};
