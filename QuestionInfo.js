import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { styles } from "./StyleSheet.js";

export default class QuestionInfo extends Component {
  state = {
    modalVisible: true
  };

  render() {
    const { modalVisible } = this.state;
    const { question, closeInfo } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ modalVisible: false }, () => closeInfo());
        }}
      >
        <View style={styles.questionModalOuter}>
          <View style={styles.questionModal}>
            <Text style={{ fontSize: 25 }}>{`${question.question}`}</Text>
            <Text style={styles.answerText}>{`${question.answers[0]}`}</Text>
            <Text style={styles.answerText}>{`${question.answers[1]}`}</Text>
            <Text style={styles.answerText}>{`People who answered A: ${
              question.aAnswerers
              } people who answered B: ${question.bAnswerers}`}</Text>
            {/* {currentQ.answers_num == 3 && (
              <Text style={styles.answerText}>{`${question.answers[2]}`}</Text>
            )} */}
          </View>
        </View>
      </Modal>
    );
  }
}
