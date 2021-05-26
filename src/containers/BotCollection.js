import React, { Component } from "react";
import BotCard from "../components/BotCard";
import BotSpecs from "../components/BotSpecs";

class BotCollection extends Component {

  state = {
    displayOneBot: false,
    botToDisplay: {}
  }

  displayBot = (botToDisplay) => {
    this.setState({displayOneBot: true, botToDisplay})
  }

  displayAllBots = () => {
    this.setState({displayOneBot: false, botToDisplay: {}})
  }

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {
          this.state.displayOneBot ? 
          <BotSpecs 
            bot={this.state.botToDisplay}
            addBotToArmy={this.props.addBotToArmy} 
            showAllBots={this.displayAllBots} 
          />
          :
          this.props.bots.map(bot => 
            <BotCard 
              key={bot.id} 
              bot={bot} 
              deleteBot={this.props.deleteBot}
              handleBot={this.displayBot}
            />)
            
            }
        </div>
      </div>
    );
  }
}

export default BotCollection;
