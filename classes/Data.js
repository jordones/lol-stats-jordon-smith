class Data {
  constructor(id, name, imageurl) {
    this.id = id;
    this.name = name;
    this.imageurl = imageurl;
  }

  static findNameById(id) {
    throw "Unimplemented Method";
  }

  static findImageurlById(id) {
    throw "Unimplemented Method";
  }
}

module.exports = Data;
