class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const agedBrieUpdate = (quality) => {
  if (quality < 50) {
    return ++quality;
  }
  return quality;
};

const backstageUpdate = (quality, sellIn) => {
  if (quality < 50) {
    quality = quality + 1;
  }
  if (quality < 50 && sellIn < 11) {
    quality = quality + 1;
  }
  if (quality < 50 && sellIn < 6) {
    quality = quality + 1;
  }
  if (sellIn === 0) {
    quality = 0;
  }
  return quality;
};

const conjuredUpdate = (quality, sellIn) => {
  if (quality !== 0 && sellIn > 0) {
    quality = quality - 2;
  } else if (quality !== 0 && sellIn <= 0) {
    quality = quality - 4;
  }
  return quality;
};

const normalUpdate = (quality, sellIn) => {
  if (quality !== 0 && sellIn > 0) {
    quality = quality - 1;
  } else if (quality !== 0 && sellIn <= 0) {
    quality = quality - 2;
  }
  return quality;
};

const sellInUpdate = (sellIn) => {
 
  return --sellIn
  
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (true) {
        case /aged brie/.test(item.name.toLowerCase()):
          item.quality = agedBrieUpdate(item.quality);
          break;

        case /backstage pass/.test(item.name.toLowerCase()):
          item.quality = backstageUpdate(item.quality, item.sellIn);
          break;

        case /sulfuras/.test(item.name.toLowerCase()):
          return;

        case /conjured/.test(item.name.toLowerCase()):
          item.quality = conjuredUpdate(item.quality, item.sellIn);
          break;

        default:
          item.quality = normalUpdate(item.quality, item.sellIn);
      }

       item.sellIn = sellInUpdate(item.sellIn)

      
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  agedBrieUpdate,
  backstageUpdate,
  conjuredUpdate,
  normalUpdate
};
