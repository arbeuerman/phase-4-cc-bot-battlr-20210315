import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

//constants
const botsUrl = 'http://localhost:6001/bots';
const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

class BotsPage extends Component {
  state = {
    bots: [],
    army: []
  }

  //get all bots from database 
  componentDidMount() {
    fetch(botsUrl)
    .then(res => res.json())
    .then(bots => this.setState({bots}))
    .catch(err => console.error(err))
  }

  addBotsToArmy = (bot) => {
    if(!this.state.army.includes(bot))
    {
      this.setState({army: [...this.state.army, bot]})
    }
  }

  removeBotsFromArmy = (botToRemove) => {
    this.setState({army: [...this.state.army].filter(bot => bot !== botToRemove)})
  }

  deleteBot = (botToDelete) => {
    // console.log(botToDelete)
    fetch(`${botsUrl}/${botToDelete.id}`, {
      method: 'DELETE',
      headers
    })
    .then(() => {
      this.setState({
        bots: this.state.bots.filter(bot => bot !== botToDelete),
        army: this.state.army.filter(bot => bot !== botToDelete)
      })
    })
    .catch(err => console.error(err))

  }

  render() {
    return <div>
        <YourBotArmy army={this.state.army} removeBotFromArmy={this.removeBotsFromArmy} deleteBot={this.deleteBot} />
        <BotCollection bots={this.state.bots} addBotToArmy={this.addBotsToArmy} deleteBot={this.deleteBot}/>
      </div>;
  }
}

export default BotsPage;
