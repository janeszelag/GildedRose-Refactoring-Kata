// const agedBrie = (quality) => {
//     return ++quality
//   }

// console.log(agedBrie(2))

// const backstageUpdate = (quality, sellIn) => {

//     if (quality < 50 && sellIn < 11) {
//       ++quality;
//     }
//     if (quality < 50 && sellIn < 6) {
//       ++quality;
//     }
//     if (sellIn === 0) {
//       quality = 0;
//     }
//     return quality;
//   };

//   console.log(backstageUpdate(1,10))

class Item {
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }

  const normalItem = new Item("Foo", 0, 2);
  console.log(normalItem)
 
  const normalUpdate = (item) => {

    if (item.quality !== 0) {
      return {
        ...item, quality: (item.sellIn > 0) ? --item.quality : item.quality - 2
      }
  
    }
    return item;
    
  };

  const what = normalUpdate(normalItem);
  console.log(normalItem)
  console.log(what)