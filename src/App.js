import React, { Component } from 'react';
import firebase from 'firebase';
import Constants from './constants.js'
import './App.css';

var config = require('./config')

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      character: {
        stats: [
          {
            key: 'STR',
            name: 'Strength',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          },
          {
            key: 'DEX',
            name: 'Dexterity',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          },
          {
            key: 'CON',
            name: 'Constitution',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          },
          {
            key: 'INT',
            name: 'Intelligence',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          },
          {
            key: 'WIS',
            name: 'Wisdom',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          },
          {
            key: 'CHA',
            name: 'Charisma',
            displayValue: Constants.startingValue,
            pointBuyValue: Constants.startingValue
          }
        ]
      }
    };

    this.modifyAttribute = this.modifyAttribute.bind(this);

    // Initialize Firebase
    firebase.initializeApp(config.firebase);
  }

  modifyAttribute(key, changeValue) {
    let character = Object.assign({}, this.state.character);
    var index = character.stats.findIndex(obj => obj.key === key);

    var stat = character.stats[index];
    stat.pointBuyValue = (stat.pointBuyValue + changeValue);
    stat.displayValue = (stat.displayValue + changeValue);

    this.setState({character: character});
  }

  render() {
    const displayStats = this.state.character.stats.map((data, index) => {
      return (
        <td key={index}>
          <div>
            <label>{data.name}: </label><input value={data.displayValue} readOnly />
          </div>
          <div>
            <button disabled={true}>+</button>
            <button disabled={true}>-</button>
          </div>
        </td>
      );
    });

    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                {displayStats}
              </tr>
            </tbody>
          </table>
        </div>
        &nbsp;
        <PointBuy character={this.state.character} modifyAttribute={this.modifyAttribute}/>
      </div>
    );
  }
}

class Stat extends Component {
  getPointCost(newValue) {
    const oldValue = this.props.value;

    if(newValue >= Constants.startingValue && newValue <= Constants.maxValue) {
      if(oldValue < newValue) {
        return (newValue <= 13 ? 1 : 2);
      } else if(oldValue > newValue) {
        return (newValue >= 13 ? 2 : 1);
      }
    }
    return 0;
  }

  addToAttributeScore() {
    const currentValue = this.props.value;
    const currentPoints = this.props.currentPoints;
    const maxValue = Constants.maxValue;

    var pointCost = this.getPointCost(currentValue + 1);

    if((pointCost > 0) && (currentPoints >= pointCost) && (currentValue < maxValue)) {
      this.props.updateCurrentPoints((pointCost * -1));
      this.props.modifyAttribute(this.props.statKey, 1);
    }
  }

  removeFromAttributeScore() {
    const currentValue = this.props.value;
    const currentPoints = this.props.currentPoints;
    const startingPoints = Constants.startingPoints;
    const startingValue = Constants.startingValue;

    var pointCost = this.getPointCost(currentValue - 1);

    if((currentPoints < startingPoints) && (currentValue > startingValue) && (pointCost > 0)) {
      this.props.updateCurrentPoints(pointCost);
      this.props.modifyAttribute(this.props.statKey, -1);
    }
  }

  disableAddToScore() {
    const value = this.props.value;
    const currentPoints = this.props.currentPoints;
    const maxValue = Constants.maxValue;

    if((value >= 13 && currentPoints < 2) || (currentPoints <= 0) || (value >= maxValue)) {
      return "disabled";
    }
    return "";
  }

  disableRemoveFromScore() {
    const value = this.props.value;
    const startingValue = Constants.startingValue;
    
    if(value <= startingValue) {
      return "disabled";
    }
    return "";
  }

  render() {
    const value = this.props.value;
    const statName = this.props.statName;

    return (
      <div>
        <label>{statName}: {value}</label>
        &nbsp;
        <button disabled={this.disableAddToScore()} onClick={() => this.addToAttributeScore()}>+</button>
        <button disabled={this.disableRemoveFromScore()} onClick={() => this.removeFromAttributeScore()}>-</button>
      </div>
    );
  }
}

class PointBuy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPoints: Constants.startingPoints
    };

    this.updateCurrentPoints = this.updateCurrentPoints.bind(this);
  }

  updateCurrentPoints(pointCost) {
    var newPoints = (this.state.currentPoints + pointCost);

    this.setState({
      currentPoints: newPoints
    });
  }

  renderStat(key) {
    const currentPoints = this.state.currentPoints;

    var index = this.props.character.stats.findIndex(obj => obj.key === key);
    var stat = this.props.character.stats[index];

    return (
      <Stat
        key={stat.key}
        value={stat.pointBuyValue}
        statKey={stat.key}
        statName={stat.name}
        currentPoints={currentPoints}
        updateCurrentPoints={this.updateCurrentPoints}
        modifyAttribute={this.props.modifyAttribute}
      />
    );
  }

  render() {
    const currentPoints = this.state.currentPoints;

    const pointBuyStats = this.props.character.stats.map((stat) => this.renderStat(stat.key));

    return (
      <div>
        <label>Points remaining: {currentPoints}</label>
        {pointBuyStats}
      </div>
    );
  }
}

export default App;
