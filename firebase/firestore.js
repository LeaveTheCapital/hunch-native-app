import axios from "axios";
import {addUserUrl} from '../config'

export const addUser = user => {
 return axios.post(
   addUserUrl,
   user
 );
};

export const sendFCMTokenToServer = fcmToken => {
 return axios.post("cloud function string", fcmToken);
};