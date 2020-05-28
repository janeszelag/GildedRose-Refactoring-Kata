const {
  Shop,
  Item,
  agedBrieUpdate,
  backstageUpdate,
} = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("name of item doesn't change", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should have zero items in shop", function () {
    const gildedRose = new Shop([]);
    expect(gildedRose.items.length).toBe(0);
  });

  //quality and sellIn requirements for normal items
  it("Quality of any item is never negative", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toBe(-1);
  });

  it("Quality of a normal item decreases by 1 at the end of each day", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("sellIn of a normal item decreases by 1 at the end of each day", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("once the sell by date has passed, Quality of a normal item degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("foo", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  //aged brie requirements
  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("the Quality of a special item is never more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  //sulfuras tests
  it("sulfuras never decreases/increases in Quality", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it("sulfuras never has to be sold", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
  });

  //backstage pass tests
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

  it("Quality of backstage passes is never more than 50", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  //new "conjured" feature tests
  it("Conjured items degrade in Quality twice as fast as normal items", function () {
    const gildedRose = new Shop([new Item("Conjured", 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Conjured items degrade in Quality twice as fast after sellIn date has passed", function () {
    const gildedRose = new Shop([new Item("Conjured", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Conjured items Quality is never negative", function () {
    const gildedRose = new Shop([new Item("Conjured", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("agedBrieUpdate", function () {

  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const brieItem = new Item("Aged Brie", 1, 1);
    const updatedBrie = agedBrieUpdate(brieItem)
    expect(updatedBrie.quality).toBe(2);
  });

  it("does not increment value over 50", function () {
    const brieItem = new Item("Aged Brie", 1, 50);
    const updatedBrie = agedBrieUpdate(brieItem)
    expect(updatedBrie.quality).toBe(50);
  });
});


//test for if its 48 does it still add up to 50 