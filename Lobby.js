import React, { Component } from "react";
import { View, Text, Animated, Modal, TouchableHighlight } from "react-native";
import SvgImage from 'react-native-remote-svg';
import { db, firestore } from "./firebase";
import {styles} from './StyleSheet.js'

const A = {
  SvgImage: Animated.createAnimatedComponent(SvgImage)
}

export default class Lobby extends Component {
  state = {
    brainHeight: new Animated.Value(0),
    currentQ: null
  }
  componentDidMount() {
    Animated.timing(this.state.brainHeight, {
      toValue: 100,
      duration: 3000
    }).start()
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentQ} = this.state;
    
      const currentQRef = firestore
      .collection("Current_Questions")
      .where("live", "==", "true");
    currentQRef.onSnapshot(snap => {
      // console.log("snap", snap);
      if (snap.docs.length) {
        const data = snap.docs[0].data();
        // console.log("data", data);
        let answers;
        if (data.ans === 3) {
          answers = [data.ans_a, data.ans_b, data.ans_c];
        } else if (data.ans === 2) {
          answers = [data.ans_a, data.ans_b];
        }
        if(currentQ) {
          if (data.question !== currentQ.question)
          this.setState({
            currentQ: {
              question: data.question,
              answers,
              last_for: data.last_for
            }
          });
        } else {
          this.setState({
            currentQ: {
              question: data.question,
              answers,
              last_for: data.last_for
            }
          });
        }
      } else {
        this.setState({ currentQ: null });
      }
    });
  
  }

  handleAnswerPress = () => {
    const newCurrentQ = {...this.state.currentQ}
    newCurrentQ.live = false;
    this.setState({
      currentQ: newCurrentQ
    })
  }

  render() {
    let { brainHeight } = this.state;
    const { currentQ } = this.state;
    return (<View>
      <View>
      <Text>Lobby</Text>
      {currentQ ? <Modal animationType="slide" visible={currentQ.live} transparent={true} onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.questionModalOuter}>
          <View style={styles.questionModal}>
            <Text style={styles.questionTitle}>{`${currentQ.question}`}</Text>
            <TouchableHighlight onPress={this.handleAnswerPress}>
            <Text>{`${currentQ.answers[0]}`}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handleAnswerPress}>            
            <Text>{`${currentQ.answers[1]}`}</Text>
            </TouchableHighlight>            
          </View>
          </View>
            </Modal> : <Text>'no questions yet'</Text>}
      </View>
      <Animated.Image style={{width: 100, height: brainHeight }} source={{uri: 'http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png'}} />
      <A.SvgImage style={{width: 100, height: brainHeight, backgroundColor: 'cornflowerblue'}} source={require('./svg/brain.svg')} />
    </View>);
  }
}
// require('./svg/brain.svg')