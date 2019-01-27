import React from "react";
import SearchBar from "./SearchBar";
import MatchHistory from "./MatchHistory";

class App extends React.Component {
  state = {
    matches: null,
    loader: false
  };

  onSearchSubmit = async term => {
    // e.preventDefault();
    this.setState({ loader: true });
    const response = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ summonerName: term })
    });
    const body = await response.text();
    this.setState({ matches: JSON.parse(body), loader: false });
  };

  // Render content to the screen
  render() {
    if (this.state.loader) {
      return (
        <div className="ui container" style={{ paddingTop: "10px" }}>
          <div className="ui medium header centered">league stats</div>
          <SearchBar onSubmit={this.onSearchSubmit} />
          <div className="ui segment">Loading</div>
        </div>
      );
    } else {
      console.log("good UI");

      return (
        <div className="ui container" style={{ paddingTop: "10px" }}>
          <div className="ui medium header centered">league stats</div>
          <SearchBar onSubmit={this.onSearchSubmit} />
          <MatchHistory matches={this.state.matches} />
        </div>
      );
    }
  }
}

export default App;
