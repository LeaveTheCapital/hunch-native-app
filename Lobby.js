import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Modal,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import SvgImage from "react-native-remote-svg";
import { db, firestore } from "./firebase";
import moment from "moment";
import Question from "./Question.js";
import QuestionInfo from "./QuestionInfo.js";
import { styles } from "./StyleSheet.js";

const A = {
  SvgImage: Animated.createAnimatedComponent(SvgImage)
};

export default class Lobby extends Component {
  state = {
    brainHeight: new Animated.Value(0),
    currentQ: null,
    questions: null,
    infoQuestion: null
  };
  componentDidMount() {
    Animated.timing(this.state.brainHeight, {
      toValue: 100,
      duration: 3000
    }).start();
    const { user } = this.props;

    const currentQRef = firestore
      .collection("Current_Questions")
      .where("live", "==", true);
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
          if (data.question !== currentQ.question) {
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
          const aAnswerers = data.ans_a.length;
          const bAnswerers = data.ans_b.length;
          let cAnswerers;
          if (data.hasOwnProperty("ans_c")) {
            cAnswerers = data.ans_c.length;
          }
          console.log("newQuestions", newQuestions);
          newQuestions[doc.id] = questions
            ? questions.hasOwnProperty(doc.id)
              ? { ...questions[doc.id] }
              : {}
            : {};
          newQuestions[doc.id].fulfilled = data[data.correct].includes(
            user.uid
          );
          newQuestions[doc.id].aAnswerers = aAnswerers;
          newQuestions[doc.id].bAnswerers = bAnswerers;
          cAnswerers ? newQuestions[doc.id].cAnswerers = cAnswerers : null;
          console.log("fulfilled questions update:", newQuestions);
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

  handleInfoPress = questionNumber => {
    console.log("infoPress", questionNumber);
    this.setState({
      infoQuestion: questionNumber
    });
  };

  closeInfo = () => {
    console.log("closing info..");
    this.setState({
      infoQuestion: null
    });
  };

  render() {
    let { brainHeight } = this.state;
    const { currentQ, questions, infoQuestion } = this.state;
    console.log("rendering Lobby.... questions...", questions);
    const { nextEvent, changeColour, colour } = this.props;
    const timeUntilEvent = moment(nextEvent.date).fromNow();
    return (
      <View style={styles.lobbyContainer}>
        <View style={styles.lobbyView}>
          <Text style={styles.lobbyTitle}>{nextEvent.name}</Text>
          {!questions && (
            <Text>No questions yet... Event starts {timeUntilEvent}</Text>
          )}
          {currentQ ? (
            <Question
              currentQ={currentQ}
              handleAnswerPress={this.handleAnswerPress}
              sendAnswer={this.sendAnswer}
            />
          ) : (
              <Text />
            )}
          {infoQuestion && (
            <QuestionInfo
              question={questions[infoQuestion]}
              closeInfo={this.closeInfo}
            />
          )}
        </View>
        <View style={styles.lobbyView}>
          <Svg height="150" width="400">
            {nextEvent &&
              Array.from({ length: nextEvent.questions }, () => "q").map(
                (ele, i) => {
                  let colour = "grey";
                  let strokeColour = "darkgrey";
                  if (questions) {
                    if (questions.hasOwnProperty(String(i + 1))) {
                      if (questions[i + 1].fulfilled) {
                        colour = "green";
                        strokeColour = "darkgreen";
                      } else if (questions[i + 1].fulfilled === false) {
                        colour = "red";
                        strokeColour = "darkred";
                      }
                    }
                  }

                  return (
                    <TouchableWithoutFeedback
                      key={i}
                      onPress={() => this.handleInfoPress(i + 1)}
                    // disabled={!questions[i + 1] ? true : false}
                    >
                      <Circle
                        key={i * 20}
                        cx={`${40 + i * 65}`}
                        cy="78"
                        r={`${25}`}
                        stroke={strokeColour}
                        strokeWidth="3"
                        fill={colour}
                      />
                    </TouchableWithoutFeedback>
                  );
                }
              )}
              {nextEvent &&
              Array.from({ length: nextEvent.questions }, () => "q").map(
                (ele, i) => {
                  return (
                      <SvgText key={i} fill={colour} stroke={colour}fontSize='20' fontWeight="bold" x={`${35 + i * 65}`} y='83' textAnchor='middle'>
                        Q{`${i+1}`}
                      </SvgText>
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
        <TouchableNativeFeedback onPress={changeColour}>
          <View
            style={[
              {
                marginTop: 10,
                backgroundColor: "yellow",
                width: 200,
                borderRadius: 25,
                borderWidth: 3,
                borderColor: "white"
              }
            ]}
          >
            <Text style={{ fontSize: 30, textAlign: "center", padding: 5 }}>
              Press Me to change colour
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
