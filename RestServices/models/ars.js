const db = require('../util/database');

module.exports = class Item {
  constructor(id, item) {
    this.id = id;
    this.item = item;
  }
}