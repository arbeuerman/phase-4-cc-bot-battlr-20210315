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

  addBotsToArmy = (botToAdd) => {
    botToAdd.inArmy = true;
    this.setState({bots: this.state.bots.map(bot => bot === botToAdd ? botToAdd : bot)})
  }

  removeBotsFromArmy = (botToRemove) => {
    botToRemove.inArmy = false;
    this.setState({bots: this.state.bots.map(bot => bot === botToRemove ? botToRemove : bot)})
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
      })
    })
    .catch(err => console.error(err))

  }

  render() {
    return <div>
        <YourBotArmy army={this.state.bots.filter(bot => bot.inArmy)} removeBotFromArmy={this.removeBotsFromArmy} deleteBot={this.deleteBot} />
        <BotCollection bots={this.state.bots.filter(bot => !bot.inArmy)} addBotToArmy={this.addBotsToArmy} deleteBot={this.deleteBot}/>
      </div>;
  }
}

export default BotsPage;
