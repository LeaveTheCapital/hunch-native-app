import React, { Component } from "react";
import { View, ScrollView, Text, Animated, Modal, TouchableHighlight, Dimensions } from "react-native";
import SvgImage from "react-native-remote-svg";
import { styles } from "./StyleSheet.js";

export default class Question extends Component {
  state = {
    brainHeight: new Animated.Value(70),
    modalVisible: true,
    chosen: null
  };
  componentDidMount() {
    const { sendAnswer } = this.props;
    Animated.timing(this.state.brainHeight, {
      toValue: 0,
      duration: 12000
    }).start(() => {
      sendAnswer();
      this.setState({ modalVisible: false });
    });
  }

  handleAnswerPress = (ans) => {
    const { takeNoteOfUserAnswer } = this.props;
    takeNoteOfUserAnswer(ans);
    this.setState({ chosen: ans })
  }
  render() {
    const { brainHeight, modalVisible, chosen } = this.state;
    const { currentQ, sendAnswer } = this.props;
    const { height, width } = Dimensions.get("screen");
    const containerHeight = height / 2;
    const containerWidth = width / 1.15;
    const questionHeight = containerHeight * 0.95;
    const questionWidth = containerWidth * 0.78;
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          alert("Answer the question!!!");
        }}
      >
        <View style={styles.questionModalOuter}>
          <View style={[styles.questionModalContainer, { width: containerWidth, height: containerHeight }]}>
            <View style={[styles.questionModal, { width: questionWidth, height: questionHeight }]}>
              <ScrollView style={styles.questionScrollView}>
                <Text style={{ fontSize: 25 }}>{`${currentQ.question}`}</Text>
                <TouchableHighlight disabled={chosen ? true : false} onPress={() => this.handleAnswerPress("ans_a")}>
                  <Text style={chosen === 'ans_a' ? [styles.answerText, { backgroundColor: 'orange' }] : styles.answerText}>{`${currentQ.answers[0]}`}</Text>
                </TouchableHighlight>
                <TouchableHighlight disabled={chosen ? true : false} onPress={() => this.handleAnswerPress("ans_b")}>
                  <Text style={chosen === 'ans_b' ? [styles.answerText, { backgroundColor: 'orange' }] : styles.answerText}>{`${currentQ.answers[1]}`}</Text>
                </TouchableHighlight>
                {currentQ.answers_num == 3 && (
                  <TouchableHighlight disabled={chosen ? true : false} onPress={() => this.handleAnswerPress("ans_c")}>
                    <Text style={chosen === 'ans_c' ? [styles.answerText, { backgroundColor: 'orange' }] : styles.answerText}>{`${
                      currentQ.answers[2]
                      }`}</Text>
                  </TouchableHighlight>
                )}
              </ScrollView>
            </View>
            <View style={styles.questionBrainView}>
              <Animated.Image
                style={{ width: brainHeight, height: brainHeight }}
                source={{
                  uri:
                    "http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png"
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
