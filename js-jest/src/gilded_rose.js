class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case "Aged Brie":
          if (this.items[i].quality < 50)
            this.items[i].quality = this.items[i].quality + 1;
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
          if (this.items[i].quality < 50 && this.items[i].sellIn < 11) {
            this.items[i].quality = this.items[i].quality + 1;
          }
          if (this.items[i].quality < 50 && this.items[i].sellIn < 6) {
            this.items[i].quality = this.items[i].quality + 1;
          }
          if (this.items[i].sellIn == 0) {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }

          break;

        case "Sulfuras, Hand of Ragnaros":
          break;

        case "Conjured":
          //before sellIn date has passed
          if (this.items[i].quality !== 0 && this.items[i].sellIn > 0) {
            this.items[i].quality = this.items[i].quality - 2;
          //after
          } else if (this.items[i].quality !== 0 && this.items[i].sellIn <= 0) {
            this.items[i].quality = this.items[i].quality - 4;
          }


        default:
          //before sellIn date has passed
          if (this.items[i].quality !== 0 && this.items[i].sellIn > 0) {
            this.items[i].quality = this.items[i].quality - 1;
          //after
          } else if (this.items[i].quality !== 0 && this.items[i].sellIn <= 0) {
            this.items[i].quality = this.items[i].quality - 2;
          }
      }

      if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
