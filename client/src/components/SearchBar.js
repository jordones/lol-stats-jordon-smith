import React from "react";

class SearchBar extends React.Component {
  state = { summonerName: "" };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.summonerName);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="ui fluid input">
            <input
              type="text"
              placeholder="enter summoner name"
              value={this.state.summonerName}
              onChange={e => this.setState({ summonerName: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
