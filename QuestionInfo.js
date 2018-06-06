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
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ modalVisible: false }, () => closeInfo());
        }}
      >
        <View style={styles.questionInfoModalOuter}>
          <View style={styles.questionInfoModal}>
            <Text style={{ fontSize: 25 }}>{`${question.question}`}</Text>
            <Text style={styles.answerText}>{`A: ${question.answers[0]}`}</Text>
            <Text style={styles.answerText}>{`B: ${question.answers[1]}`}</Text>
            <Text style={styles.answerText}>{`People who answered A: ${
              question.aAnswerers
              }`}</Text>
            <Text style={styles.answerText}>{`People who answered B: ${question.bAnswerers}`}</Text>
            {/* {question.hasOwnProperty(cAnswerers) && (
              <Text style={styles.answerText}>{`people who answered C: ${question.cAnswerers}`}</Text>
            )} */}
          </View>
        </View>
      </Modal>
    );
  }
}
