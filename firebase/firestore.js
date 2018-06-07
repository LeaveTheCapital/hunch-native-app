import axios from "axios";
import {
  addUserUrl,
  getUserInfoUrl,
  getNextEventUrl,
  changeUsersTicketsUrl,
  addUserAnswerUrl,
  getWinnersTallyUrl,
  addUserToEventUrl
} from "../config";

export const addUser = user => {
  return axios.post(addUserUrl, user);
};

export const sendFCMTokenToServer = fcmToken => {
  return axios.post("cloud function string", fcmToken);
};

export const getUserInfo = uid => {
  return axios.get(`${getUserInfoUrl}?uid=${uid}`);
};

export const getNextEvent = () => {
  return axios.get(getNextEventUrl);
};

export const changeUsersTickets = (uid, ticketChange) => {
  return axios.post(changeUsersTicketsUrl, { uid, ticketChange });
};

export const addUserAnswer = (event_id, uid, question, answer) => {
  const answerObj = {
    event_id,
    uid,
    question,
    answer
  };
  return axios.post(addUserAnswerUrl, answerObj);
};

export const getWinnersTally = (event_id) => {
  return axios.get(`${getWinnersTallyUrl}?event=${event_id}`);
}

export const addUserToEvent = (uid, event_id) => {
  return axios.post(addUserToEventUrl, { uid, event: event_id })
}