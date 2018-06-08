import React, { Component } from "react";
import { View, ScrollView, Text, Modal } from "react-native";
import { styles } from "./StyleSheet.js";

export default class QuestionInfo extends Component {
  state = {
    modalVisible: true
  };

  render() {
    const { modalVisible } = this.state;
    const { question, closeInfo } = this.props;
    console.log('question in QuestionInfo', question)
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
            <ScrollView style={styles.questionScrollView}>

              <Text style={{ fontSize: 25 }}>{`${question.question}`}</Text>
              <Text style={styles.answerText}>{`A: ${question.answers[0]}`}</Text>
              <Text style={styles.answerText}>{`B: ${question.answers[1]}`}</Text>
              {question.answers_num == 3 && <Text style={styles.answerText}>{`C: ${question.answers[2]}`}</Text>}
              {question.hasOwnProperty('aAnswerers') && <Text style={question.correct === 'ans_a' ? styles.correctAnswerText : styles.incorrectAnswerText}>{`A ${
                question.aAnswerers
                }`}</Text>}
              {question.hasOwnProperty('bAnswerers') && <Text style={question.correct === 'ans_b' ? styles.correctAnswerText : styles.incorrectAnswerText}>{`B ${question.bAnswerers}`}</Text>}
              {question.hasOwnProperty('cAnswerers') && (
                <Text style={question.correct === 'ans_c' ? styles.correctAnswerText : styles.incorrectAnswerText}>{`C ${question.cAnswerers}`}</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
