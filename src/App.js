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
        race: "",
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
        ],
        customStatsChosen: 0,
        customStatsAvalilable: 0,
        chosenStats: [],
        excludedStats: []
      }
    };

    this.modifyAttribute = this.modifyAttribute.bind(this);
    this.changeRace = this.changeRace.bind(this);
    this.modifyAttributeDisplay = this.modifyAttributeDisplay.bind(this);

    // Initialize Firebase
    firebase.initializeApp(config.firebase);
  }

  modifyAttribute(key, changeValue) {
    //get the character state
    let character = Object.assign({}, this.state.character);

    //get the index of the stat to modify
    const index = character.stats.findIndex(obj => obj.key === key);

    //update the stats display and point buy values
    let stat = character.stats[index];
    stat.pointBuyValue = (stat.pointBuyValue + changeValue);
    stat.displayValue = (stat.displayValue + changeValue);

    //update the character state
    this.setState({character: character});
  }

  changeRace(event) {
    //get the character state
    let character = Object.assign({}, this.state.character);

    //update the race
    character.race = event.target.value;

    //reset ability scores to point buy value when race changes
    character.stats.map((stat) => {
      stat.displayValue = stat.pointBuyValue;
      return stat;
    });
    
    //reset custom scores when race changes
    character.customStatsAvalilable = 0;
    character.customStatsChosen = 0;
    character.chosenStats = [];
    character.excludedStats = [];

    //grab stat mods from the selected option
    const selectedIndex = event.target.selectedIndex;
    const statModsJSON = event.target.options[selectedIndex].getAttribute('statmods');
    const statMods = JSON.parse(statModsJSON);
    const customStatsJSON = event.target.options[selectedIndex].getAttribute('customstats');
    const customStats = JSON.parse(customStatsJSON);

    //if there are any stat mods update the display values to reflect them
    if(statMods) {
      statMods.map((stat) => {
        const index = character.stats.findIndex(obj => obj.key === stat.stat);
        let characterStat = character.stats[index];
        characterStat.displayValue = (characterStat.displayValue + stat.mod);
        return characterStat;
      });
    }

    //if there are any custom stat options update display to allow them to be chosen
    if(customStats) {
      if(customStats.number > character.customStatsChosen) {
        //add any stats a race gets already to the exclusion list
        if(customStats.exclusions) {
          character.excludedStats.push(customStats.exclusions);
        }

        //update the custom stats available
        character.customStatsAvalilable = customStats.number;
      }
    }
    
    //update the character state
    this.setState({character: character});
  }

  disableCustomAdd(key) {
    //if the character has stats to assign for their race
    //AND they haven't already assigned an increase to this stat
    //AND their race doesn't already give a bonus to that stat
    //let them assign an attribute point
    if((this.state.character.customStatsAvalilable > this.state.character.customStatsChosen)
      && (!this.state.character.chosenStats.find(obj => obj === key))
      && (!this.state.character.excludedStats.find(obj => obj === key))) {
      return "";
    }
    return "disabled";
  }

  disableCustomRemove(key) {
    //if the character has stats to assign for their race
    //AND they have already assigned an increase to this stat
    //AND their race doesn't already give a bonus to that stat
    //let them remove the attribute point assigned
    if((this.state.character.customStatsAvalilable > 0 && this.state.character.customStatsChosen > 0)
      && (this.state.character.chosenStats.find(obj => obj === key))
      && (!this.state.character.excludedStats.find(obj => obj === key))) {
      return "";
    }
    return "disabled";
  }

  modifyAttributeDisplay(index, value) {
    //get the character state and stat to modify
    let character = Object.assign({}, this.state.character);
    let stat = character.stats[index];

    //update custom stat chosen
    character.customStatsChosen = (character.customStatsChosen + value);

    //if adding, add the stat to the chosenStats list, otherwise remove it
    if(value > 0) {
      character.chosenStats.push(stat.key);
    } else {
      const chosenStatIndex = character.chosenStats.findIndex(obj => obj === stat.key);
      character.chosenStats.splice(chosenStatIndex, 1);
    }

    //update the stats display and point buy values
    stat.displayValue = (stat.displayValue + value);

    //update the character state
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
            <button disabled={this.disableCustomAdd(data.key)} onClick={() => this.modifyAttributeDisplay(index, 1)}>+</button>
            <button disabled={this.disableCustomRemove(data.key)} onClick={() => this.modifyAttributeDisplay(index, -1)}>-</button>
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
        <PointBuy stats={this.state.character.stats} modifyAttribute={this.modifyAttribute}/>
        &nbsp;
        <RaceSelector race={this.state.character.race} changeRace={this.changeRace} />
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

    const pointCost = this.getPointCost(currentValue + 1);

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

    const pointCost = this.getPointCost(currentValue - 1);

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
    return (
      <div>
        <label>{this.props.statName}: {this.props.value}</label>
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
    const newPoints = (this.state.currentPoints + pointCost);

    this.setState({
      currentPoints: newPoints
    });
  }

  renderStat(key) {
    const index = this.props.stats.findIndex(obj => obj.key === key);
    const stat = this.props.stats[index];

    return (
      <Stat
        key={stat.key}
        value={stat.pointBuyValue}
        statKey={stat.key}
        statName={stat.name}
        currentPoints={this.state.currentPoints}
        updateCurrentPoints={this.updateCurrentPoints}
        modifyAttribute={this.props.modifyAttribute}
      />
    );
  }

  render() {
    const pointBuyStats = this.props.stats.map((stat) => this.renderStat(stat.key));

    return (
      <div>
        <label>Points remaining: {this.state.currentPoints}</label>
        {pointBuyStats}
      </div>
    );
  }
}

class RaceSelector extends Component {
  getRaceOptions(race) {
    //if the race is a group (Dwarves, Elves, etc) build the option group for the race group
    if(race.raceGroup) {
      const subrace = race.subraces.map((race) => this.getRaceOptions(race));
     
      return (
        <optgroup key={race.raceGroup} label={race.raceGroup}>
          {subrace};
        </optgroup>
      );
    } else { //if the race is a singular choice (Half-Elves, Half-Orcs, etc) build the option for the race
      return (
        <option
          key={race.raceKey}
          value={race.raceKey}
          statmods={JSON.stringify(race.statMods)}
          customstats={JSON.stringify(race.customStats)}>
          {race.race}
        </option>
      );
    }
  }

  render() {
    //build the race options and option groups
    const races = Constants.races.map((race) => this.getRaceOptions(race));

    return (
      <div>
        <select onChange={this.props.changeRace} value={this.props.race}>
          <option value="">Select a race</option>
          {races}
        </select>
      </div>
    );
  }
}

export default App;
