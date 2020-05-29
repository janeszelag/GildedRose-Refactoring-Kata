class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const agedBrieUpdate = (item) => {
  item.quality = item.quality < 50 ? ++item.quality : 50;
  return item;
};

const backstageUpdate = (item) => {
  if (item.sellIn === 0) {
    item.quality = 0;
  } else if (item.sellIn < 6) {
    item.quality = item.quality < 47 ? item.quality + 3 : 50;
  } else if (item.sellIn < 11) {
    item.quality = item.quality < 48 ? item.quality + 2 : 50;
  } else {
    item.quality = item.quality < 50 ? ++item.quality : 50;
  }
  return item;
};

const conjuredUpdate = (item) => {
  if (item.quality !== 0) {
    item.quality = item.sellIn > 0 ? item.quality - 2 : item.quality - 4;
  }
  return item;
};

const normalUpdate = (item) => {
  if (item.quality !== 0) {
    item.quality = item.sellIn > 0 ? --item.quality : item.quality - 2;
  }
  return item;
};

const sellInUpdate = (item) => {
  if (!/sulfuras/.test(item.name.toLowerCase())) {
    --item.sellIn;
  }
  return item;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    let newItems = this.items.map((item) => {
      if (
        (typeof item.quality !== "number") |
        (typeof item.sellIn !== "number")
      ) {
        throw `quality or sellIn of ${item} is not a number!`;
      }

      switch (true) {
        case /aged brie/.test(item.name.toLowerCase()):
          agedBrieUpdate(item);
          break;

        case /backstage pass/.test(item.name.toLowerCase()):
          backstageUpdate(item);
          break;

        case /sulfuras/.test(item.name.toLowerCase()):
          break;

        case /conjured/.test(item.name.toLowerCase()):
          conjuredUpdate(item);
          break;

        default:
          normalUpdate(item);
      }
      sellInUpdate(item);
      return item;
    });
    this.items = newItems;
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  agedBrieUpdate,
  backstageUpdate,
  conjuredUpdate,
  normalUpdate,
  sellInUpdate,
};
