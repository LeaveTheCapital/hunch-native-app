import React, { Component } from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  Animated,
  Modal,
  TouchableNativeFeedback
} from "react-native";
=======
import { View, Text, Animated, Modal, TouchableHighlight } from "react-native";
>>>>>>> f926441a2e73709e0f7ccdc26b8460eab6aec6e4
import Svg, { Circle } from "react-native-svg";
import SvgImage from "react-native-remote-svg";
import { db, firestore } from "./firebase";
import Question from "./Question.js";
import { styles } from "./StyleSheet.js";

const A = {
  SvgImage: Animated.createAnimatedComponent(SvgImage)
};

export default class Lobby extends Component {
  state = {
    brainHeight: new Animated.Value(0),
    currentQ: null,
    questions: null
  };
  componentDidMount() {
    Animated.timing(this.state.brainHeight, {
      toValue: 100,
      duration: 3000
    }).start();
    const { user } = this.props;

    const currentQRef = firestore
      .collection("Current_Questions")
      .where("live", "==", "true");
    currentQRef.onSnapshot(snap => {
      const { currentQ, questions } = this.state;
      // console.log("snap", snap);
      if (snap.docs.length) {
        const data = snap.docs[0].data();
        const questionNumber = snap.docs[0].id;
        const newQuestions = questions || {};
        newQuestions[questionNumber] = {};
        newQuestions[questionNumber].question = data.question;
        let answers;
        if (data.answers_num === 3) {
          answers = [data.ans_a, data.ans_b, data.ans_c];
          newQuestions[questionNumber].answers = answers;
          console.log("hello", answers);
        } else if (data.answers_num === 2) {
          answers = [data.ans_a, data.ans_b];
          newQuestions[questionNumber].answers = answers;
        }
        if (currentQ) {
          if (data.question !== currentQ.question)
            this.setState({
              currentQ: {
                question: data.question,
                answers,
                last_for: data.last_for,
                questionNumber,
                answers_num: data.answers_num
              },
              questions: newQuestions
            });
        } else {
          this.setState({
            currentQ: {
              question: data.question,
              answers,
              last_for: data.last_for,
              questionNumber,
              answers_num: data.answers_num
            },
            questions: newQuestions
          });
        }
      } else {
        console.log("snap length is 0");
        this.setState({ currentQ: null });
      }
    });

    const fulfilledQRef = firestore.collection("Fulfilled_Questions");
    fulfilledQRef.onSnapshot(snap => {
      // console.log("snap2", snap);
      const { questions } = this.state;
      if (snap.docs.length) {
        // console.log("data2", snap.docs[0].data());
        const newQuestions = questions ? { ...this.state.questions } : {};
        snap.docs.forEach((doc, i) => {
          const data = doc.data();
          console.log("newQuestions", newQuestions);
          newQuestions[doc.id] = {};
          newQuestions[doc.id].fulfilled = data[data.correct].includes(
            user.uid
          );
          console.log("hiya", newQuestions);
        });
        this.setState({ questions: newQuestions });
      } else {
        console.log("fulfilled q, snap.docs.length is 0");
      }
    });
  }

  handleAnswerPress = ans => {
    const newCurrentQ = { ...this.state.currentQ };
    newCurrentQ.userAnswer = ans;
    console.log("ans", ans, "newCurrentQ", newCurrentQ);
    this.setState({
      currentQ: newCurrentQ
    });
  };

  sendAnswer = () => {
    const { currentQ } = this.state;
    const { nextEvent, user } = this.props;
    console.log(
      "sending answer...",
      nextEvent.id,
      user.uid,
      currentQ.questionNumber,
      currentQ.userAnswer
    );
    db.addUserAnswer(
      nextEvent.id,
      user.uid,
      currentQ.questionNumber,
      currentQ.userAnswer
    )
      .then(console.log)
      .catch(console.log);
  };

  render() {
    let { brainHeight } = this.state;
    const { currentQ, questions } = this.state;
    console.log("rendering Lobby.... questions...", questions);
    const { nextEvent, changeColour } = this.props;
    return (
      <View style={styles.lobbyContainer}>
        <View style={styles.lobbyView}>
          <Text>Lobby</Text>
          {currentQ ? (
            <Question
              currentQ={currentQ}
              handleAnswerPress={this.handleAnswerPress}
              sendAnswer={this.sendAnswer}
            />
          ) : (
            <Text>'no questions yet'</Text>
          )}
        </View>
        <View style={styles.lobbyView}>
          <Svg height="150" width="400">
            {nextEvent &&
              Array.from({ length: nextEvent.questions }, () => "q").map(
                (ele, i) => {
                  let colour = "grey";
<<<<<<< HEAD
                  let fillColour = "darkgrey";
=======
>>>>>>> f926441a2e73709e0f7ccdc26b8460eab6aec6e4
                  if (questions) {
                    if (questions.hasOwnProperty(String(i + 1))) {
                      if (questions[i + 1].fulfilled) {
                        colour = "green";
                      } else if (questions[i + 1].fulfilled === false) {
                        colour = "red";
                      }
                    }
                  }
                  return (
                    <Circle
                      key={i}
                      cx={`${40 + i * 65}`}
<<<<<<< HEAD
                      cy="78"
=======
                      cy="70"
>>>>>>> f926441a2e73709e0f7ccdc26b8460eab6aec6e4
                      r={`${25}`}
                      stroke={colour}
                      strokeWidth="3"
                      fill={colour}
                    />
                  );
                }
              )}
          </Svg>
        </View>
        <View style={styles.lobbyView}>
          <Animated.Image
            style={{ width: brainHeight, height: brainHeight }}
            source={{
              uri:
                "http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png"
            }}
          />
        </View>
        <View style={styles.lobbyView}>
          <A.SvgImage
            style={{
              width: brainHeight,
              height: brainHeight,
              borderRadius: 25
            }}
            source={require("./svg/brain.svg")}
          />
        </View>
        <TouchableHighlight onPress={changeColour}>
          <View
            style={[
              {
                marginTop: 10,
                backgroundColor: "yellow",
<<<<<<< HEAD
                width: 200,
                borderRadius: 5,
                borderWidth: 15,
                borderColor: "white"
=======
                width: 200
>>>>>>> f926441a2e73709e0f7ccdc26b8460eab6aec6e4
              }
            ]}
          >
            <Text style={{ fontSize: 30 }}>Press Me to change colour</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
