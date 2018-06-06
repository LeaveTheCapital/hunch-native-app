import React, { Component } from "react";
import { View, Text, Animated, Modal, TouchableHighlight } from "react-native";
import SvgImage from "react-native-remote-svg";
import { styles } from "./StyleSheet.js";

export default class Question extends Component {
  state = {
    brainHeight: new Animated.Value(100),
    modalVisible: true
  };
  componentDidMount() {
    const { sendAnswer } = this.props;
    Animated.timing(this.state.brainHeight, {
      toValue: 0,
      duration: 10000
    }).start(() => {
      sendAnswer();
      this.setState({ modalVisible: false });
    });
  }
  render() {
    const { brainHeight, modalVisible } = this.state;
    const { currentQ, handleAnswerPress, sendAnswer } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.questionModalOuter}>
          <View style={styles.questionModal}>
            <Text style={{ fontSize: 25 }}>{`${currentQ.question}`}</Text>
            <TouchableHighlight onPress={() => handleAnswerPress("ans_a")}>
              <Text style={styles.answerText}>{`${currentQ.answers[0]}`}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleAnswerPress("ans_b")}>
              <Text style={styles.answerText}>{`${currentQ.answers[1]}`}</Text>
            </TouchableHighlight>
            {currentQ.answers_num == 3 && (
              <TouchableHighlight onPress={() => handleAnswerPress("ans_c")}>
                <Text style={styles.answerText}>{`${
                  currentQ.answers[2]
                  }`}</Text>
              </TouchableHighlight>
            )}
          </View>
          <View style={styles.questionBrainView}>
            <Animated.Image
              style={{ width: 100, height: brainHeight }}
              source={{
                uri:
                  "http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png"
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
