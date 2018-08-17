import {
  forEach,
  isArray,
  map,
  mergeWith,
} from "lodash";

const input = {
  mazeSize: "3 3",
  road: "0,1 0,2;0,0 1,0;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1",
  R: true,
  T: true,
};

const mazeSize: string[] = input.mazeSize.split(" ");
const mazeWidth = Number(mazeSize[0]) * 2 + 1;
const mazeHeight = Number(mazeSize[1]) * 2 + 1;

const mazeWidthArr = new Array(mazeWidth).fill(1);
const mazeHeightArr = new Array(mazeHeight).fill(1);

// x=1,3,5
// x=0,1,2

const roadMap = input.road.split(";");

const toRealIdx = (idx: string) => {
  const realIdxArr = idx.split(",").map((item) => Number(item) * 2 + 1);
  return realIdxArr.join(",");
};

const generateRoadByKeyValue = (array: string[]) => {
  const pic = {} as any;
  const pic2 = {} as any;
  array.forEach((item: any) => {
    const arr = item.split(" ") as any;
    const key = toRealIdx(arr[0]) as any;
    const value = toRealIdx(arr[1]) as any;

    if (!pic[key]) {
      pic[key] = [].concat(value);
    } else {
      pic[key] = [].concat(pic[key]).concat(value);
    }

    if (!pic2[value]) {
      pic2[value] = [].concat(key);
    } else {
      pic2[value] = [].concat(pic2[value]).concat(key);
    }
  });

  return mergeWith(pic, pic2, (objValue: any, srcValue: any) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
    return;
  });
};

const relationship = generateRoadByKeyValue(roadMap);

const newRoad = {} as any;

forEach(relationship, (value, key: any) => {
  const keyItem = key.split(",");
  const row1 = Number(keyItem[0]);
  const col1 = Number(keyItem[1]);
  value.forEach((valueStr: any) => {
    const item = valueStr.split(",");
    const row2 = Number(item[0]);
    const col2 = Number(item[1]);
    if (row1 === row2) {
      const col = col1 < col2 ? col1 + 1 : col1 - 1;
      newRoad[`${row1},${col}`] = [].concat(key).concat(valueStr);
    } else {
      const newRow = row1 < row2 ? row1 + 1 : row1 - 1;
      newRoad[`${newRow},${col1}`] = [].concat(key).concat(valueStr);
    }
  });
});

const final = mergeWith(newRoad, relationship, (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return;
});

const shouldGenerateT = (row: number, col: number) => {
  if (!input.T) {
    return false;
  }

  if (col <= 0 || col >= mazeHeight - 1 || row <= 0 || row >= mazeWidth - 1) {
    return false;
  }

  const bottomRightCorner = !final[`${row},${col + 1}`] && !final[`${row + 1},${col}`];
  const bottomLeftCorner = !final[`${row},${col - 1}`] && !final[`${row + 1},${col}`];
  const topRightCorner = !final[`${row},${col + 1}`] && !final[`${row - 1},${col}`];
  const topLeftCorner = !final[`${row},${col - 1}`] && !final[`${row - 1},${col}`];

  return bottomRightCorner || bottomLeftCorner || topRightCorner || topLeftCorner;
};

// console.log(final, "------");

const generateRoad = () => {
  return mazeHeightArr.map((_: any, row: number) => {
    return map(mazeWidthArr, (_: any, col: number) => {
      const roadIdx = row + "," + col;
      if (final[roadIdx]) {
        return input.R ? `[${final[roadIdx].length}]` : "[R]";
      } else {
        return shouldGenerateT(row, col) ? `[T]` : `[W]`;
      }
    });
  });
};

generateRoad();

console.log(generateRoad(), "------");

// const arr = roadMap.map((item) => {
//   return item.split(" ");
// });

// const arr1 = flatMap(arr).map((item) => {
//   return item.split(",").map((item) => {
//     return Number(item);
//   });
// });

// const splitItemByComma = (value: string) => {
//   return value.split(",").map((item) => {
//     return Number(item) * 2 + 1;
//   });
// };
//
// const transformItem = (item: string[]) => {
//   const item1 = splitItemByComma(item[0]);
//   const item2 = splitItemByComma(item[1]);
//   return [item1, item2];
// };
//
// const a = arr.map((item) => {
//   return transformItem(item);
// }) as any;

// const row1 = filter(a, (item: any) => {
//   return item[0][1] === item[1][0];
// });

// console.log(a, "--a--");

// console.log(repeatRow(), arr, "=======");

// const a= arr.filter((item, i: number) => {
//   return item[i][0] === item[i][1] && item[i][1] === item[i][0];
// });

/* 0   1   2   3   4   5   6
  [W] [W] [W] [W] [W] [W] [W] 0
  [W] [R] [W] [R] [R] [R] [W] 1
  [W] [R] [W] [R] [W] [R] [W] 2
  [W] [R] [R] [R] [R] [R] [W] 3
  [W] [W] [W] [R] [W] [R] [W] 4
  [W] [R] [R] [R] [W] [R] [W] 5
  [W] [W] [W] [W] [W] [W] [W] 6 */

// 0,0 0,1 0,2 0,3  i*2+1
// 1,1 1,3 1,5 1,7

// x(+1/-1) y(+1/-1)

// [[00, 01, 02], [01, 11, 21]]
// row1 y=0
// row2 y=1
// row3 y=3

// const mazeGridMap = {
//   0: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 }],
//   1: [{ x: 1, y: 1 }],
//   2: [{ x: 2, y: 2 }],
// };
// 1,4 2,3 2,1 2,5 3,2
