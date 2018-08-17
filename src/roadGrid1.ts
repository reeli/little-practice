(() => {
  const input = {
    mazeSize: "3 3",
    road: "0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1",
  };

  const mazeSize: string[] = input.mazeSize.split(" ");
  const mazeWidth = Number(mazeSize[0]) * 2 + 1;
  const mazeHeight = Number(mazeSize[1]) * 2 + 1;

  const mazeWidthArr = new Array(mazeWidth).fill(1);
  const mazeHeightArr = new Array(mazeHeight).fill(1);

  // x=1,3,5
  // x=0,1,2

  const generateMazeWithWall = () => {
    return mazeWidthArr.map((_: any, x: number) => {
      if (x % 2 === 0) {
        return `[W]`;
      } else {
        console.log(x, "y");
        return `[R]`;
      }
    });
  };

  const generateWall = () => {
    return mazeWidthArr.map(() => {
      return `[W]`;
    });
  };

  const repeatRow = () => {
    return mazeHeightArr.map((_: any, y: number) => {
      if (y % 2 === 0) {
        return generateWall();
      }
      return generateMazeWithWall();
    });
  };

  repeatRow();

  console.log(repeatRow(), "--------");

  const roadMap = input.road.split(";");

  const arr = roadMap.map((item) => {
    return item.split(" ");
  });
  // const arr1 = flatMap(arr).map((item) => {
  //   return item.split(",").map((item) => {
  //     return Number(item);
  //   });
  // });

  const splitItemByComma = (value: string) => {
    return value.split(",").map((item) => {
      return Number(item) * 2 + 1;
    });
  };

  const transformItem = (item: string[]) => {
    const item1 = splitItemByComma(item[0]);
    const item2 = splitItemByComma(item[1]);
    return [item1, item2];
  };

  const a = arr.map((item) => {
    return transformItem(item);
  });

  console.log(a, "=======");
  console.log(repeatRow(), "=======");

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
})();
