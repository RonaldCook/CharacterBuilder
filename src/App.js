import React, { Component } from 'react';
import firebase from 'firebase';
import FirebaseConfig from './config';
import './App.css';

import Character from './Components/Character.js';

class App extends Component {
  constructor (props) {
    super(props);

    // Initialize Firebase
    firebase.initializeApp(FirebaseConfig);
  }

  render() {
    return (
      <div>
        <Character />
      </div>
    );
  }
}

export default App;
