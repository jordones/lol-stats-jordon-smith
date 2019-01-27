const Data = require("./Data.js");
const _ = require("lodash");
const ChampionJson = require("../dragontail/champion.json");

// Clean up the Json data for easier use
const ChampionData = _.mapValues(ChampionJson.data, "key");
const ParsedChampionData = _.transform(
  ChampionData,
  function(result, value, key) {
    result[value] = key;
  },
  {}
);

class Champion extends Data {
  constructor(id) {
    super(id, Champion.findNameById(id), Champion.findImageurlById(id));
  }

  // Utility method to retrieve a Champions name from the parsed JSON
  static findNameById(id) {
    return ParsedChampionData[id];
  }

  // Utility method to build a Champions image url from the parsed JSON
  static findImageurlById(id) {
    return "/img/champion/" + ParsedChampionData[id] + ".png";
  }
}

module.exports = Champion;
