import React, { Component } from "react";
import { View, Text, Animated, Modal, TouchableHighlight } from "react-native";
import SvgImage from 'react-native-remote-svg';
import { styles } from './StyleSheet.js'

export default class Question extends Component {
    state = {
        brainHeight: new Animated.Value(100),
      }
    componentDidMount() {
        Animated.timing(this.state.brainHeight, {
          toValue: 0,
          duration: 10000
        }).start()
      }
    render() {
        const {brainHeight} = this.state;
        const {currentQ, handleAnswerPress} = this.props;     
        return (<Modal animationType="slide" 
        visible={currentQ.live} 
        transparent={true} 
        onRequestClose={() => {alert('Modal has been closed.');}}>
                    <View style={styles.questionModalOuter}>
                        <View style={styles.questionModal}>
                            <Text style={{fontSize: 25}}>{`${currentQ.question}`}</Text>
                            <TouchableHighlight onPress={handleAnswerPress}>
                            <Text style={styles.answerText} >{`${currentQ.answers[0]}`}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.handleAnswerPress}>            
                            <Text style={styles.answerText}>{`${currentQ.answers[1]}`}</Text>
                            </TouchableHighlight>
                            <View>
                                <Animated.Image style={{width: 100, height: brainHeight }} source={{uri: 'http://pluspng.com/img-png/brain-png-red-brain-image-2540-2400.png'}} />            
                            </View>
                        </View>
                    </View>
                </Modal>)

    }
}