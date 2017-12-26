import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

var config = require('./config')

class App extends Component {
  constructor (props) {
    super(props);

    // Initialize Firebase
    firebase.initializeApp(config.firebase);
  }

  render() {
    return (
      <Builder />
    );
  }
}

class Stat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.startingValue
    };
  }

  getPointCost(currentPoints, oldValue, newValue) {
    if(newValue < this.props.startingValue || newValue > this.props.maxValue) {
      return 0;
    }
    
    if(oldValue < newValue) {
      if(newValue <= 13){
        return 1;
      } else {
        return 2;
      }
    } else if(oldValue > newValue) {
      if(newValue >= 13){
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }

  addToAttributeScore() {
    const currentValue = this.state.value;
    const maxValue = this.props.maxValue;
    const currentPoints = this.props.currentPoints;

    var pointCost = this.getPointCost(currentPoints, currentValue, currentValue + 1);

    if((pointCost && pointCost > 0) && (currentPoints >= pointCost) && (currentValue < maxValue)) {
      var newValue = (currentValue + 1);
      this.props.test(true, pointCost);

      this.setState({
        value: newValue
      });
    }
  }

  removeFromAttributeScore() {
    const currentValue = this.state.value;
    const startingPoints = this.props.startingPoints;
    const startingValue = this.props.startingValue;
    const currentPoints = this.props.currentPoints;

    var pointCost = this.getPointCost(currentPoints, currentValue, currentValue - 1);

    if((currentPoints < startingPoints) && (currentValue > startingValue)  && (pointCost && pointCost > 0)) {
      var newValue = (currentValue - 1);
      this.props.test(false, pointCost);

      this.setState({
        value: newValue
      });
    }
  }

  render() {
    const value = this.state.value;
    const statName = this.props.statName;

    return (
      <div>
        <label>{statName}: {value}</label>
        &nbsp;
        <button onClick={() => this.addToAttributeScore()}>+</button>
        <button onClick={() => this.removeFromAttributeScore()}>-</button>
      </div>
    );
  }
}

class Builder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPoints: 27
    };

    this.updateCurrentPoints = this.updateCurrentPoints.bind(this);
  }

  updateCurrentPoints(decrease, pointCost) {
    var newPoints;

    if(decrease) {
      newPoints = (this.state.currentPoints - pointCost);
    } else {
      newPoints = (this.state.currentPoints + pointCost);
    }

    this.setState({
      currentPoints: newPoints
    });
  }

  renderStat(key, name) {
    const currentPoints = this.state.currentPoints;
    const startingPoints = 27;
    const startingValue = 8;
    const maxValue = 15;

    return (
      <Stat
        statKey={key}
        statName={name}
        startingValue={startingValue}
        maxValue={maxValue}
        startingPoints={startingPoints}
        currentPoints={currentPoints}
        test={this.updateCurrentPoints}
        increaseCurrentPoints={this.updateCurrentPoints}
        decreaseCurrentPoints={this.updateCurrentPoints}
      />
    );
  }

  render() {
    const currentPoints = this.state.currentPoints;

    return (
      <div>
        <label>Points remaining: {currentPoints}</label>
        {this.renderStat("STR", "Strength")}
        {this.renderStat("DEX", "Dexterity")}
        {this.renderStat("CON", "Constitution")}
        {this.renderStat("INT", "Intelligence")}
        {this.renderStat("WIS", "Wisdom")}
        {this.renderStat("CHA", "Charisma")}
      </div>
    );
  }
}

export default App;
