import React, { Component } from 'react';
import Constants from '../constants.js';

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
          customstats={JSON.stringify(race.customStats)}
          traits={race.traits}
          proficiencies={race.proficiencies}
          languages={race.languages}>
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

export default RaceSelector;
