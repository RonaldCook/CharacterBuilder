import React, { Component } from 'react';
import Constants from '../constants.js';

import Stat from './Stat.js';
  
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

export default PointBuy;
