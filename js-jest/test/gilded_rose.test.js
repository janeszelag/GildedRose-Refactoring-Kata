const {
  Shop,
  Item,
  agedBrieUpdate,
  backstageUpdate,
  conjuredUpdate,
  normalUpdate,
  sellInUpdate,
} = require("../src/gilded_rose");

//tests updateQuality()
describe("Gilded Rose Shop", function () {
  it("an empty shop should remain empty and throw no error during update", function () {
    const gildedRose = new Shop([]);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  });

  it("shop should maintain the number of items after update", function () {
    const gildedRose = new Shop([new Item("foo", 2, 2), new Item("bar", 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(2);
  });

  it("sellIn of items is updated", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("normal items are updated", function () {
    const gildedRose = new Shop([
      new Item("Foo", 2, 2),
      new Item("Coin", 3, 3),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
    expect(items[1].quality).toBe(2);
    expect(items[1].sellIn).toBe(2);
  });

  it("normal item is updated correctly after 2 days", function () {
    const gildedRose = new Shop([new Item("Foo", 1, 4)]);
    const items = gildedRose.updateQuality();
    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(1);
    expect(items2[0].sellIn).toBe(-1);
  });

  it("agedBrie is updated", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("sulfuras is never updated", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1);
  });

  it("backstage passes are updated", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("Conjured item is updated", function () {
    const gildedRose = new Shop([new Item("Conjured", 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test("throws error if sellIn is not a number", () => {
    const gildedRose = new Shop([new Item("Conjured", "cow", 2)]);
    function errTest() {
      gildedRose.updateQuality();
    }
    expect(errTest).toThrowError("not a number");
  });

  test("throws error if quality is not a number", () => {
    const gildedRose = new Shop([new Item("Conjured", 2, "cat")]);
    function errTest() {
      gildedRose.updateQuality();
    }
    expect(errTest).toThrowError("not a number");
  });
});

//tests the agedBrieUpdate function
describe("agedBrieUpdate", function () {
  it("the Quality of Aged Brie increases by 1 by one at the end of each day", function () {
    const brieItem = new Item("Aged Brie", 1, 1);
    const updatedBrie = agedBrieUpdate(brieItem);
    expect(updatedBrie.quality).toBe(2);
  });

  it("Quality of Aged Brie is never over 50", function () {
    const brieItem = new Item("Aged Brie", 1, 50);
    const updatedBrie = agedBrieUpdate(brieItem);
    expect(updatedBrie.quality).toBe(50);
  });
});

//tests the conjuredUpdate function
describe("conjuredUpdate", function () {
  it("Conjured items degrade in Quality twice as fast as normal items", function () {
    const conjuredItem = new Item("Conjured", 2, 2);
    const updatedConjured = conjuredUpdate(conjuredItem);
    expect(updatedConjured.quality).toBe(0);
  });

  it("Conjured items degrade in Quality twice as fast after sellIn date has passed", function () {
    const conjuredItem = new Item("Conjured", 0, 4);
    const updatedConjured = conjuredUpdate(conjuredItem);
    expect(updatedConjured.quality).toBe(0);
  });

  it("Conjured items Quality is never negative", function () {
    const conjuredItem = new Item("Conjured", 0, 0);
    const updatedConjured = conjuredUpdate(conjuredItem);
    expect(updatedConjured.quality).toBe(0);
  });
});

//tests the backstageUpdate function
describe("backstageUpdate", function () {
  it("Quality of backstage passes increases by 2 when there are 10 days or less", function () {
    const backstageItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      0
    );
    const updatedItem = backstageUpdate(backstageItem);
    expect(updatedItem.quality).toBe(2);
  });

  it("Quality of backstage passes increases by 3 when there are 5 days or less", function () {
    const backstageItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      0
    );
    const updatedItem = backstageUpdate(backstageItem);
    expect(updatedItem.quality).toBe(3);
  });

  it("Quality of backstage passes drops to 0 after the concert", function () {
    const backstageItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      8
    );
    const updatedItem = backstageUpdate(backstageItem);
    expect(updatedItem.quality).toBe(0);
  });

  it("Quality of backstage passes is never more than 50", function () {
    const backstageItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      1,
      50
    );
    const updatedItem = backstageUpdate(backstageItem);
    expect(updatedItem.quality).toBe(50);
  });
});

//tests the normalUpdate function
describe("normalUpdate", function () {
  it("Quality of any item is never negative", function () {
    const normalItem = new Item("Foo", 0, 0);
    const updatedNormal = normalUpdate(normalItem);
    expect(updatedNormal.quality).toBe(0);
  });

  it("Quality of a normal item decreases by 1 after one day", function () {
    const normalItem = new Item("Foo", 1, 1);
    const updatedNormal = normalUpdate(normalItem);
    expect(updatedNormal.quality).toBe(0);
  });

  it("once the sell by date has passed, Quality of a normal item degrades twice as fast", function () {
    const normalItem = new Item("Foo", 0, 2);
    const updatedNormal = normalUpdate(normalItem);
    expect(updatedNormal.quality).toBe(0);
  });
});

describe("sellInUpdate", function () {
  it("sellIn of an item decreases by 1 at the end of each day", function () {
    const fooItem = new Item("Foo", 1, 1);
    const updatedFoo = sellInUpdate(fooItem);
    expect(updatedFoo.sellIn).toBe(0);
  });
});
