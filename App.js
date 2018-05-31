import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { authDB, auth, db } from "./firebase";
import axios from "axios";
import Drawer from "react-native-drawer";
import Hunch from "./Hunch.js";
import Login from "./Login.js";
import Home from "./Home.js";
import ControlPanel from "./ControlPanel.js";

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
    user: { username: "henry231" },
    hunchHeight: 100,
    initialCoordinates: "10, 40"
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      console.log("authstatechange", user);
      if (user) {
        axios
          .get(
            `https://us-central1-test-database-92434.cloudfunctions.net/getUserInfo?uid=${
              user.uid
            }`
          )
          .then(userDoc => {
            console.log("logginLocally", userDoc);
            if (!userDoc.data.username) {
              this.loginLocally(null);
            } else {
              this.loginLocally(userDoc.data);
            }
          })
          .catch(console.log);
      } else {
        this.loginLocally(null);
      }
    });

    Animated.spring(this.state.textAnim, {
      toValue: 80,
      velocity: 0.1
    }).start();
    Animated.timing(this.state.pinkAnim, {
      toValue: 100,
      delay: 2000,
      duration: 3000
    }).start();
  };

  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };

  loginLocally = user => {
    if (user) {
      const newUser = { ...user };
      console.log("user logging in...", user.username);
      this.setState({ user: newUser, hunchHeight: 30 });
    } else {
      this.setState({ user });
    }
  };

  signOut = () => {
    const { user } = this.state;
    console.log("signing out..");
  };

  render() {
    let { textAnim, pinkAnim, user, hunchHeight } = this.state;
    const initialCoordinates = [30, 40];
    const smallCoordinates = [10, 40];

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
        <View style={styles.container}>
          <A.Hunch
            height={hunchSwell}
            initialCoordinates={initialCoordinates}
            distance={70}
          />
          <View style={styles.userArea}>
            <Login loginLocally={this.loginLocally} />
          </View>
        </View>
      );
    } else {
      return (
        <Drawer
          type="displace"
          content={
            <ControlPanel
              closeDrawer={this.closeDrawer}
              signOut={this.signOut}
            />
          }
          openDrawerOffset={130}
          styles={drawerStyles}
          tweenHandler={Drawer.tweenPresets.parallax}
          ref={ref => (this._drawer = ref)}
        >
          <Home
            styles={styles}
            hunchSwellSmall={hunchSwellSmall}
            smallCoordinates={smallCoordinates}
            user={user}
            openDrawer={this.openDrawer}
          />
        </Drawer>
      );
    }
  }
}

const drawerStyles = {
  drawer: {
    backgroundColor: "cornflowerblue",
    shadowColor: "seagreen",
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: { paddingLeft: 3 }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff69b4",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  userArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
