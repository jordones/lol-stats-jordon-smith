const Data = require("./Data.js");
const _ = require("lodash");
const SpellJson = require("../dragontail/summoner.json");

// Clean up the Json data for easier use
const SpellData = _.mapValues(SpellJson.data, "key");
const ParsedSpellData = _.transform(
  SpellData,
  function(result, value, key) {
    result[value] = key;
  },
  {}
);

class Spell extends Data {
  constructor(id) {
    super(id, Spell.findNameById(id), Spell.findImageurlById(id));
  }

  // Utility method to retrieve a Spells name from the parsed JSON
  static findNameById(id) {
    return ParsedSpellData[id];
  }

  // Utility method to build a Spells image url from the parsed JSON
  static findImageurlById(id) {
    return "/img/spell/" + ParsedSpellData[id] + ".png";
  }
}

module.exports = Spell;
