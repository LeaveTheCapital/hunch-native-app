import React, { Component } from "react";
import { View, ScrollView, Text, Modal } from "react-native";
import { styles } from "./StyleSheet.js";

export default class ResultSplash extends Component {
  state = {
    modalVisible: true,
    winner: null
  };

  componentDidMount = () => {
    const { allMarks, topMark, winners, totalUsers, user } = this.props;
    if (winners.includes(user.uid)) {
      this.setState({ winner: true })
    }
  };


  render() {
    const { modalVisible, winner } = this.state;
    const { allMarks, topMark, winners, totalUsers, user, closeResultSplash } = this.props;
    const prizePool = totalUsers * 0.98;
    return (
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ modalVisible: false }, () => closeResultSplash());
        }}
      >
        <View style={[styles.questionInfoModalOuter, { backgroundColor: winner ? 'green' : 'red' }]}>
          <View style={[styles.questionInfoModal,]}>
            <ScrollView style={styles.questionScrollView}>
              {winner ? <Text style={{ fontSize: 25 }}>{`CoNgRaTs YoU wOn!!!!!!1 `}</Text>
                : <Text style={{ fontSize: 25 }}>{`UnLuCkY yOu LoSt!!!!1 😞`}</Text>}
              {winner ? <Text style={{ fontSize: 18 }}>You won a £{parseFloat(Math.round(prizePool / winners.length * 100) / 100).toFixed(2)} share of the {winners.length === 1 ? 'entire' : 'total'} £{parseFloat(Math.round(prizePool * 100) / 100).toFixed(2)} prize pool!! Click on your profile to redeem your funds
              <Text style={{ fontSize: 68, textAlign: 'center', paddingTop: 10 }}>{'\n'}🎉</Text>
              </Text>
                : <Text style={{ fontSize: 18 }}>{winners.length} {winners.length === 1 ? 'person' : 'people'} won £{parseFloat(Math.round(prizePool / winners.length * 100) / 100).toFixed(2)} {winners.length === 1 ? '' : 'each'}. Better luck next time <Text style={{ fontSize: 68, textAlign: 'center', paddingTop: 10 }}>{'\n'}😤</Text></Text>}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
