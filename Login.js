import React, { Component } from "react";
import { View, StyleSheet, Button, Keyboard } from "react-native";
import { authDB, auth, db } from "./firebase";
import axios from "axios";
import { styles } from "./StyleSheet.js";

import t from "tcomb-form-native"; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  terms: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      width: 300
    }
  },
  controlLabel: {
    normal: {
      color: "mediumvioletred",
      fontSize: 18,
      marginBottom: 4,
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
    terms: {
      label: "Agree to Terms"
    }
  },
  stylesheet: formStyles
};

export default class Login extends Component {
  state = {
    keyboardVisible: false
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

  handleSubmit = () => {
    const { loginLocally } = this.props;
    const { username, email, password } = this._form.getValue();
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
    const { keyboardVisible } = this.state;
    return (
      <View
        style={
          !keyboardVisible
            ? styles.formContainer
            : [styles.formContainer, { marginTop: 0 }]
        }
      >
        <Form ref={c => (this._form = c)} type={User} options={options} />
        <Button
          title="Login / Sign Up"
          onPress={this.handleSubmit}
          style={styles.submitButton}
        />
      </View>
    );
  }
}
