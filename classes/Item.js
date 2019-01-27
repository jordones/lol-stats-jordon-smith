const Data = require("./Data.js");
const _ = require("lodash");
const ItemJson = require("../dragontail/item.json");

class Item extends Data {
  constructor(id) {
    super(id, Item.findNameById(id), Item.findImageurlById(id));
  }

  // Utility method to retrieve a Items name from the parsed JSON
  static findNameById(id) {
    if (id === 0) return "";
    return ItemJson.data[id].name;
  }

  // Utility method to build a Items image url from the parsed JSON
  static findImageurlById(id) {
    if (id === 0) return "";
    return "img/item/" + ItemJson.data[id].image.full;
  }
}

module.exports = Item;
