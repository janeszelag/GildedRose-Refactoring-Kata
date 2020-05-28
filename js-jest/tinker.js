// const agedBrie = (quality) => {
//     return ++quality
//   }

// console.log(agedBrie(2))

const backstageUpdate = (quality, sellIn) => {

    if (quality < 50 && sellIn < 11) {
      ++quality;
    }
    if (quality < 50 && sellIn < 6) {
      ++quality;
    }
    if (sellIn === 0) {
      quality = 0;
    }
    return quality;
  };

  console.log(backstageUpdate(1,10))