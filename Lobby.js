import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Modal,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Dimensions
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import SvgImage from "react-native-remote-svg";
import { db, firestore } from "./firebase";
import moment from "moment";
import Question from "./Question.js";
import ResultSplash from "./ResultSplash.js";
import QuestionInfo from "./QuestionInfo.js";
import { styles } from "./StyleSheet.js";

const A = {
  SvgImage: Animated.createAnimatedComponent(SvgImage),
  Circle: Animated.createAnimatedComponent(Circle)
};

export default class Lobby extends Component {
  state = {
    brainHeight: new Animated.Value(0),
    strokeAnim: new Animated.Value(0),
    playersAnim: new Animated.Value(0),
    currentQ: null,
    questions: null,
    infoQuestion: null,
    animQuestion: null,
    totalUsers: null
  };
  componentDidMount() {
    const { height, width } = Dimensions.get("screen");
    Animated.timing(this.state.brainHeight, {
      toValue: height / 7.31,
      duration: 3000
    }).start();
    const { user, nextEvent } = this.props;

    const currentQRef = firestore
      .collection("Current_Questions")
      .where("live", "==", true);
    currentQRef.onSnapshot(snap => {
      const { currentQ, questions, strokeAnim } = this.state;
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
        } else if (data.answers_num === 2) {
          answers = [data.ans_a, data.ans_b];
          newQuestions[questionNumber].answers = answers;
        }
        if (currentQ) {
          if (data.question !== currentQ.question) {
            console.log('currentQ first if block');
            Animated.sequence([Animated.timing(strokeAnim, {
              toValue: 35,
              duration: 1500
            }), Animated.timing(strokeAnim, {
              toValue: 0,
              duration: 100
            })]).start(() =>
              this.setState({
                currentQ: {
                  question: data.question,
                  answers,
                  last_for: data.last_for,
                  questionNumber,
                  answers_num: data.answers_num
                },
                questions: newQuestions,
                strokeAnim: new Animated.Value(0)
              })
            );
          }
        } else {
          console.log('currentQ second if block');
          this.setState({ animQuestion: questionNumber }, () => {
            Animated.sequence([Animated.timing(strokeAnim, {
              toValue: 95,
              duration: 1500
            }), Animated.timing(strokeAnim, {
              toValue: 0,
              duration: 100
            })]).start(() =>
              this.setState({
                currentQ: {
                  question: data.question,
                  answers,
                  last_for: data.last_for,
                  questionNumber,
                  answers_num: data.answers_num
                },
                questions: newQuestions,
                animQuestion: null
                // strokeAnim: new Animated.Value(0)
              })
            );

          })
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
          cAnswerers ? (newQuestions[doc.id].cAnswerers = cAnswerers) : null;
          newQuestions.answers_num = data.answers_num;
          newQuestions[doc.id].correct = data.correct;
        });
        this.setState({ questions: newQuestions });
      } else {
        console.log("fulfilled q, snap.docs.length is 0");
      }
    });

    const eventStartRef = firestore
      .collection("Current_Event")
      .where("start", "==", true);
    eventStartRef.onSnapshot(snap => {
      if (snap.docs.length) {
        console.log("Event started!!!");
        const { total_users } = snap.docs[0].data();
        console.log("total_users: ", total_users);
        this.setState({ totalUsers: total_users }, () => {
          Animated.sequence([Animated.spring(this.state.playersAnim, {
            toValue: 39,
            velocity: 0,
            duration: 1500,
            friction: 25,
            delay: 500
          }), Animated.spring(this.state.playersAnim, {
            toValue: 6,
            velocity: 0,
            duration: 1500,
            friction: 25
          })]).start()
        })
      } else {
        console.log("event not started");
      }
    });

    const eventFinishRef = firestore
      .collection("Current_Event")
      .where("complete", "==", true);
    eventFinishRef.onSnapshot(snap => {
      if (snap.docs.length) {
        console.log("Event finished!!!");
        db.getWinnersTally(nextEvent.id).then((res) => {
          const { winners, topMark, allMarks } = res.data;
          console.log('allMarks', allMarks)
          if (winners.includes(user.uid)) {
            console.log(':money_mouth_face:')

          } else {
            console.log(':face_with_symbols_on_mouth:')
          }
          this.setState({ allMarks, winners, topMark })
        }).catch((err) => {
          console.log(err)
        })
      } else {
        console.log("event not finished");
      }
    });
  }

  takeNoteOfUserAnswer = ans => {
    const newCurrentQ = { ...this.state.currentQ };
    newCurrentQ.userAnswer = ans;
    this.setState({
      currentQ: newCurrentQ
    });
  };

  sendAnswer = () => {
    const { currentQ } = this.state;
    const { nextEvent, user } = this.props;
    // console.log(
    //   "sending answer...",
    //   nextEvent.id,
    //   user.uid,
    //   currentQ.questionNumber,
    //   currentQ.userAnswer
    // );
    db.addUserAnswer(
      nextEvent.id,
      user.uid,
      currentQ.questionNumber,
      currentQ.userAnswer
    )
      .then(data => {
        console.log(data.data.msg);
      })
      .catch(data =>
        console.log('data from sendAnswer Catch Block', data)
      );
  };

  handleInfoPress = questionNumber => {
    this.setState({
      infoQuestion: questionNumber
    });
  };

  closeInfo = () => {
    this.setState({
      infoQuestion: null
    });
  };

  closeResultSplash = () => {
    this.setState({
      allMarks: null
    });
  }

  render() {
    let { brainHeight, strokeAnim, allMarks, topMark, winners, totalUsers, playersAnim } = this.state;
    const { currentQ, questions, infoQuestion, animQuestion } = this.state;
    const { nextEvent, changeColour, colour, user } = this.props;
    const { height, width } = Dimensions.get("screen");
    const timeUntilEvent = moment(nextEvent.date).fromNow();
    const strokeSwell = strokeAnim.interpolate({
      inputRange: [0, 3],
      outputRange: ["0", "3"]
    });
    const colourSwell = strokeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['blue', 'orange']
    })
    const playerSwell = playersAnim.interpolate({
      inputRange: [0, 6],
      outputRange: ['0deg', '6deg']
    })
    return (
      <View style={styles.lobbyContainer}>
        <View style={styles.lobbyView}>
          <Text style={styles.lobbyTitle}>{nextEvent.name}</Text>
          <Text style={styles.lobbyBrainText}>Answer before the brain disappears...!</Text>
          {currentQ && <Question
            currentQ={currentQ}
            takeNoteOfUserAnswer={this.takeNoteOfUserAnswer}
            sendAnswer={this.sendAnswer}
          />
          }
          {infoQuestion && (
            <QuestionInfo
              question={questions[infoQuestion]}
              closeInfo={this.closeInfo}
            />
          )}
          {
            allMarks && <ResultSplash allMarks={allMarks} topMark={topMark} winners={winners} totalUsers={totalUsers} user={user} closeResultSplash={this.closeResultSplash} />
          }
        </View>
        <View style={styles.lobbyView}>
          <Svg height="150" width={`${width}`}>
            {nextEvent &&
              Array.from({ length: nextEvent.questions }, () => "q").map(
                (ele, i) => {
                  let colour = "grey";
                  let strokeColour = "grey";
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
                      disabled={questions ? questions.hasOwnProperty([i + 1]) && questions[i + 1].hasOwnProperty('question') ? false : true : true}
                    >
                      <A.Circle
                        key={i * 20}
                        cx={`${width / 10 + i * width / 6.15}`}
                        cy="78"
                        r={`${width / 16}`}
                        stroke={colour}
                        strokeWidth={animQuestion ? animQuestion == `${i + 1}` ? strokeSwell : '0' : '0'}
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
                    <SvgText
                      key={i}
                      fill={colour}
                      stroke={colour}
                      fontSize="20"
                      fontWeight="bold"
                      x={`${width / 11.7 + i * width / 6.15}`}
                      y="84"
                      textAnchor="middle"
                    >
                      Q{`${i + 1}`}
                    </SvgText>
                  );
                }
              )}
          </Svg>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Animated.Image
            style={{ width: brainHeight, height: brainHeight }}
            source={{
              uri:
                "http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png"
            }}
          />
          {totalUsers && <Animated.Text style={{ fontSize: 19, transform: [{ rotate: playerSwell }] }}>Event is live! <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'whitesmoke' }}>
            {totalUsers}
          </Text>
            {' '}brains currently in action</Animated.Text>}
        </View>
        <View style={[styles.lobbyView, { borderRadius: 25 }]}>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#FFF', true)} onPress={changeColour}>

            <View style={[styles.lobbyView]}>
              <A.SvgImage
                style={{
                  width: brainHeight,
                  height: brainHeight,
                  borderRadius: 25
                }}
                source={require("./svg/brain.svg")}
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* <TouchableNativeFeedback onPress={changeColour}>
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
              Press me to change colour
            </Text>
          </View>
        </TouchableNativeFeedback> */}
      </View>
    );
  }
}
