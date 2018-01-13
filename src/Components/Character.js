import React, { Component } from 'react';
import Constants from '../constants.js';

import RaceSelector from './RaceSelector.js';
import PointBuy from './PointBuy.js';

class Character extends Component {
  constructor (props) {
    super(props);

    this.state = {
      character: {
        name: "",
        race: "",
        raceFeaturesAndTraits: [],
        raceProficiencies: [],
        raceLanguages: [],
        classFeaturesAndTraits:[],
        classProficiencies: [],
        classLanguages: [],
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

    this.updateName = this.updateName.bind(this);
    this.modifyAttribute = this.modifyAttribute.bind(this);
    this.changeRace = this.changeRace.bind(this);
    this.modifyAttributeDisplay = this.modifyAttributeDisplay.bind(this);
  }

  updateName(event) {
    //get the character state
    let character = Object.assign({}, this.state.character);

    //update character name
    character.name = event.target.value;

    //update the character state
    this.setState({character: character});
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
    
    //reset racial characteristics when race changes
    character.customStatsAvalilable = 0;
    character.customStatsChosen = 0;
    character.chosenStats = [];
    character.excludedStats = [];
    character.raceFeaturesAndTraits = [];
    character.raceProficiencies = [];
    character.raceLanguages = [];

    //grab stat mods from the selected option
    const selectedIndex = event.target.selectedIndex;
    const statModsJSON = event.target.options[selectedIndex].getAttribute('statmods');
    const statMods = JSON.parse(statModsJSON);
    const customStatsJSON = event.target.options[selectedIndex].getAttribute('customstats');
    const customStats = JSON.parse(customStatsJSON);

    //update features and proficiencies
    const traits = event.target.options[selectedIndex].getAttribute('traits');
    const proficiencies = event.target.options[selectedIndex].getAttribute('proficiencies')
    const languages = event.target.options[selectedIndex].getAttribute('languages')
    if(traits) {
      character.raceFeaturesAndTraits = traits.split(',')
    }
    if(proficiencies) {
      character.raceProficiencies = proficiencies.split(',');
    }
    if(languages) {
      character.raceLanguages = languages.split(',');
    }

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

  getListItems(item, index) {
    return (
      <li key={index}>
        {item}
      </li>
    );
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

    const featsAndTraits = this.state.character.raceFeaturesAndTraits.map((trait, index) => this.getListItems(trait, index));
    const proficiencies = this.state.character.raceProficiencies.map((proficiency, index) => this.getListItems(proficiency, index));
    const languages = this.state.character.raceLanguages.map((language, index) => this.getListItems(language, index))

    return (
      <div>
        <div>
          <label>Character name:</label>
          <input onChange={this.updateName} value={this.state.character.name} />
        </div>
        &nbsp;
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
        <div>
          <label>Languages:</label>
          <ul>
            {languages}
          </ul>
        </div>
        <div>
          <label>Proficiencies:</label>
          <ul>
            {proficiencies}
          </ul>
        </div>
        <div>
          <label>Feats and Traits:</label>
          <ul>
            {featsAndTraits}
          </ul>
        </div>
        <PointBuy stats={this.state.character.stats} modifyAttribute={this.modifyAttribute}/>
        &nbsp;
        <RaceSelector race={this.state.character.race} changeRace={this.changeRace} />
      </div>
    );
  }
}

export default Character;
