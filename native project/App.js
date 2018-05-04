import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import Routers from './src/router'
import { Provider } from 'react-redux';
import store from './src/store';
import { Container } from 'native-base';
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcRM1BZhqvyTsBiQHEar_S07T03h_VOL0",
    authDomain: "fir-588c0.firebaseapp.com",
    databaseURL: "https://fir-588c0.firebaseio.com",
    projectId: "fir-588c0",
    storageBucket: "fir-588c0.appspot.com",
    messagingSenderId: "289884235023"
};
firebase.initializeApp(config);


export default class App extends Component {


 render() {
    return (
      <Provider store={store}>
        <Container>
          <Routers />
        </Container>
      </Provider>
    );
  }
}


