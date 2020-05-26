const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  // tests for the standard requirements

  it("name of item doesn't change", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("quality of an item is never negative", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toBe(-1);
  });

  it("quality of an item decreases by 1 at the end of each day", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("sellIn of an item decreases by 1 at the end of each day", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("the Quality of an item is never more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("sulfuras never decreases in Quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("sulfuras never has to be sold", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
  });

  it("once the sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("foo", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("Quality of backstage passes increases by 2 when there are 10 days or less", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("Quality of backstage passes increases by 3 when there are 5 days or less ", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("Quality of backstage passes drops to 0 after the concert", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  //new "conjured" feature test

  it("Conjured items degrade in Quality twice as fast as normal items", function () {
    const gildedRose = new Shop([
      new Item("Conjured", 2, 2),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

});
