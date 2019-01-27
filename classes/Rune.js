const Data = require("./Data.js");
const _ = require("lodash");
const RuneJson = require("../dragontail/runesReforged.json");

// Clean up the Json data for easier use

class Rune extends Data {
  constructor(id, perkId) {
    super(
      perkId,
      Rune.findNameById(id, perkId),
      Rune.findImageurlById(id, perkId)
    );
  }

  // Utility method to retrieve a Runes name from the parsed JSON
  static findNameById(id, perkId = undefined) {
    // Retrieve the matching object ID from RuneJson
    const runeId = _.findIndex(RuneJson, function(o) {
      return o.id == id;
    });

    if (perkId === undefined) {
      return RuneJson[runeId].name;
    } else {
      return Rune.findPrimaryRuneName(Rune.findPrimaryRune(runeId, perkId));
    }
  }

  // Utility method to build a Runes image url from the parsed JSON
  static findImageurlById(id, perkId = undefined) {
    // Retrieve the matching object ID from RuneJson
    const runeId = _.findIndex(RuneJson, function(o) {
      return o.id == id;
    });

    if (perkId === undefined) {
      return "img/" + RuneJson[runeId].icon;
    } else {
      return (
        "img/" + Rune.findPrimaryRuneIcon(Rune.findPrimaryRune(runeId, perkId))
      );
    }
  }

  static findPrimaryRune(id, perkId) {
    // Indexes for the "slot" object and "rune" object
    var runeIndex = -1;
    var slotIndex = -1;
    // slots has an array of ~4 rune objects inside, find which one contains our perk id
    for (var i = 0; i < RuneJson[id].slots.length; i++) {
      // search the array for our perk id
      runeIndex = _.findIndex(RuneJson[id].slots[i].runes, function(o) {
        // set which rune in the array holds the perk id
        // this function will return and store the index of the rune in "runeIndex"
        if (o.id == perkId) {
          // If we find the rune in this slot, store i as slotIndex for later access
          slotIndex = i;
        }
        return o.id == perkId;
      });

      if (runeIndex != -1) {
        break;
      }
    }
    return RuneJson[id].slots[slotIndex].runes[runeIndex];
  }

  static findPrimaryRuneName(rune) {
    return rune.name;
  }

  static findPrimaryRuneIcon(rune) {
    return rune.icon;
  }
}

module.exports = Rune;
