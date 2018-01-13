import React, { Component } from 'react';
import Constants from '../constants.js';

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

export default Stat;
