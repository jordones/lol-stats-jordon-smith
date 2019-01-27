import React from "react";
import Meta from "./summoner/meta";
import Champion from "./summoner/champion";
import Item from "./summoner/item";
import Spell from "./summoner/spell";
import Stats from "./summoner/stats";
import Score from "./summoner/score";

class MatchHistory extends React.Component {
  state = {};

  renderContent() {
    if (this.props.matches != null) {
      console.log(this.props.matches);
      return this.props.matches.map(match => {
        console.log(match.player.champion.name);
        return (
          <div className="ui horizontal segments">
            <Meta player={match.player} meta={match.meta} />
            <Champion champion={match.player.champion} />
            <Spell spell={match.player.spell} rune={match.player.rune} />
            <Item item={match.item} />
            <Stats stats={match.stats} />
            <Score stats={match.stats} />
          </div>
        );
      });
    }
    return null;
  }
  render() {
    return this.renderContent();
  }
}

export default MatchHistory;
