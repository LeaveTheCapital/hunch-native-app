import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { authDB, auth, db } from "./firebase";
import axios from "axios";

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
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: "mediumvioletred",
      fontSize: 18,
      marginBottom: 7,
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
  handleSubmit = () => {
    const { loginLocally } = this.props;
    const { username, email, password } = this._form.getValue();
    if (username && email && password) {
      authDB
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {})
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
    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={User} options={options} />
        <Button
          title="Login / Sign Up"
          onPress={this.handleSubmit}
          style={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 30,
    marginRight: 30,
    padding: 2,
    backgroundColor: "hotpink"
  },
  button: {
    backgroundColor: "cornflowerblue",
    borderColor: "orange",
    borderWidth: 7
  }
});
