import React from "react";
import Champion from "./summoner/champion";

class MatchHistory extends React.Component {
  state = {};

  renderContent() {
    if (this.props.matches != null) {
      console.log(this.props.matches);
      return this.props.matches.map(match => {
        console.log(match.player.champion.name);
        return <Champion champion={match.player.champion} />;
      });
    }
    return null;
  }
  render() {
    return this.renderContent();
  }
}

export default MatchHistory;
