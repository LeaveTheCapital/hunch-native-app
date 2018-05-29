import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { authDB, auth, db } from './firebase';

import t from 'tcomb-form-native'; // 0.6.9

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
    },
  },
  controlLabel: {
    normal: {
      color: 'mediumvioletred',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    email: {
      error: 'invalid email password'
    },
    password: {
      error: 'password strength too low'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
  stylesheet: formStyles,
};


export default class Login extends Component {
  state = {
    user: null
  }
  
  componentDidMount() {
    auth.onAuthStateChanged(user=>{
      console.log('authstatechange', user);
      this.setState({ user });
    })
  }
  
  handleSubmit = () => {
    const { username, email, password } = this._form.getValue();
    // console.log('value: ', value);
    if (username && email && password) {
      authDB.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('authUser', authUser);
        const user = {
          username, email,
          uid: authUser.user.uid,
          creation_time: authUser.user.metadata.a
        };
        db.addUser(user).then(res => {
          console.log('res data', res.data);
          if(res.data.err) {
            console.log('firestore err', res.data.err)
          } else {
            console.log('docRef', res.data.docRef);
          }
        })
      })
      .catch(err=>console.log)
    }
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Sign Up"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'hotpink',
  },
});