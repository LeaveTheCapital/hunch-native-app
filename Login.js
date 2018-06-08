import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Keyboard, Dimensions, TouchableWithoutFeedback } from "react-native";
import { authDB, auth, db } from "./firebase";
import axios from "axios";
import { styles } from "./StyleSheet.js";

import t from "tcomb-form-native"; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  // username: t.maybe(t.String),
  password: t.String,
  // terms: t.Boolean
});

const registerUser = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  // terms: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      // was 10
      width: 290
    }
  },
  controlLabel: {
    normal: {
      color: "mediumvioletred",
      fontSize: 18,
      marginBottom: 0,
      // was 4
      fontWeight: "600"
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const options = {
  fields: {
    email: {
      error: "invalid email password"
    },
    password: {
      error: "password strength too low"
    },
    // terms: {
    //   label: "Agree to Terms"
    // }
  },
  stylesheet: formStyles
};

export default class Login extends Component {
  state = {
    keyboardVisible: false,
    signInMode: true,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getInitialState = () => {
    return {
      value: {
        email: 'p@p.com',
        password: 'password123',
        username: 'peter'
      }
    };
  }

  onChange = (value) => {
    this.setState({ value });
  }

  _keyboardDidShow = () => {
    const { makeHunchSmallerOrBigger } = this.props;
    makeHunchSmallerOrBigger();
    this.setState({ keyboardVisible: true });
  };

  _keyboardDidHide = () => {
    const { makeHunchSmallerOrBigger } = this.props;
    makeHunchSmallerOrBigger();
    this.setState({ keyboardVisible: false });
  };

  toggleSignInMode = () => {
    const { signInMode } = this.state;
    this.setState({ signInMode: !signInMode })
  }

  handleSubmit = () => {
    const { signInMode } = this.state;
    const { loginLocally } = this.props;
    const value = this._form.getValue();
    const { username, email, password } = value;
    if (username && email && password) {
      authDB
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          // console.log('authUser', authUser);
          const user = {
            username,
            email,
            uid: authUser.user.uid,
            creation_time: authUser.user.metadata.a
          };
          db.addUser(user);
        })
        .catch(err => console.log);
    } else if (email && password && !username) {
      authDB
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log("signed in");
        })
        .catch(console.log);
    }
  };

  render() {
    const { keyboardVisible, signInMode } = this.state;
    const { height, width } = Dimensions.get("screen");
    return (
      <View
        style={
          !keyboardVisible
            ? styles.formContainer
            : [styles.formContainer, { marginTop: 0 }]
        }
      >
        <Form ref={c => (this._form = c)} type={signInMode ? User : registerUser} options={options} value={this.state.value}
          onChange={this.onChange} />
        <Button
          title={signInMode ? "Sign In" : "Register"}
          onPress={this.handleSubmit}
          style={styles.submitButton}
        />
        {signInMode ? (<View style={{ paddingTop: 3 }}>
          <Text style={{ textAlign: 'center' }}
          >Don't have an account?
          <TouchableWithoutFeedback onPress={this.toggleSignInMode}><Text style={{ color: 'blue' }}>{' '}Register</Text></TouchableWithoutFeedback></Text>
        </View>) : (<View style={{ paddingTop: 3, textAlign: 'center' }}>
          <Text style={{ textAlign: 'center' }}
          >Already have an account?
          <TouchableWithoutFeedback onPress={this.toggleSignInMode}><Text style={{ color: 'blue' }}>{' '}Sign in</Text></TouchableWithoutFeedback></Text>
        </View>)}
      </View>
    );
  }
}
