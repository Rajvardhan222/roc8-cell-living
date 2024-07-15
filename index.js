let genRandomCell = () => {
  let row = 30;
  let col = 30;
  let randomCell = [];
  for (let i = 0; i < row; i++) {
    randomCell[i] = [];

    for (let j = 0; j < col; j++) {
      randomCell[i][j] = Math.random() > 0.9 ? 1 : 0;
    }
  }

  return randomCell;
};
let isStart = false;
let genRandomCellInit = () => {
  let row = 30;
  let col = 30;
  let randomCell = [];
  for (let i = 0; i < row; i++) {
    randomCell[i] = [];

    for (let j = 0; j < col; j++) {
      randomCell[i][j] = 0;
    }
  }

  return randomCell;
};

let cellGrid = genRandomCellInit();

const grids = document.getElementsByClassName("grid")[0];

const renderGrid = (grid) => {
  grids.innerHTML = ""; // Clear previous cells
  grid.forEach((row) => {
    row.forEach((value) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = value === 1 ? "green" : "grey";
      grids.appendChild(cell);
    });
  });
};
renderGrid(cellGrid);

let myNeighbours = (arr, row, col) => {
  const neighBourDirections = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let neighBourCount = 0;
  neighBourDirections.forEach(([neighBourRow, neighBourCol]) => {
    // console.log(neighBourRow, neighBourCol);
    const neighBourRowIdx = row + neighBourRow;
    const neighBourColIdx = col + neighBourCol;

    if (
      neighBourRowIdx > 0 &&
      neighBourRowIdx < 30 &&
      neighBourColIdx > 0 &&
      neighBourColIdx < 30
    ) {
      // console.log(neighBourRowIdx);  // 1
      // console.log(arr[neighBourRowIdx][neighBourColIdx]);
      neighBourCount += arr[neighBourRowIdx][neighBourColIdx];
    }
  });
  return neighBourCount;
};

let generateNextgeneration = (grid) => {
  let row = 30;
  let col = 30;

  let nextGeneration = JSON.parse(JSON.stringify(cellGrid));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let neighboursCount = myNeighbours(grid, i, j);
      //   console.log(`the neighbour of cell ${i} ${j} has ${neighboursCount}`);
      if (neighboursCount === 3) {
        nextGeneration[i][j] = 1;
      } else if (
        grid[i][j] === 1 &&
        (neighboursCount === 2 || neighboursCount === 3)
      ) {
        nextGeneration[i][j] = 1;
      } else if (neighboursCount < 2 || neighboursCount > 3) {
        nextGeneration[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      cellGrid[i][j] = nextGeneration[i][j];
    }
  }
  renderGrid(cellGrid);
  return nextGeneration;
};

let btn = document.getElementsByClassName("btn")[0];

btn.addEventListener("click", () => {
  cellGrid = generateNextgeneration(cellGrid);
});
let start = document.getElementsByClassName("start")[0];
start.addEventListener("click", () => {
  if (isStart == false) {
    let genRandomCell = () => {
      let row = 30;
      let col = 30;
      let randomCell = [];
      for (let i = 0; i < row; i++) {
        randomCell[i] = [];

        for (let j = 0; j < col; j++) {
          randomCell[i][j] = Math.random() > 0.9 ? 1 : 0;
        }
      }

      return randomCell;
    };

    let temp = genRandomCell();

    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        cellGrid[i][j] = temp[i][j];
      }
    }

    renderGrid(cellGrid);
    isStart = true;
  }
});

let stop = document.getElementsByClassName("stop")[0];
stop.addEventListener("click", () => {
  let genRandomCell = () => {
    let row = 30;
    let col = 30;
    let randomCell = [];
    for (let i = 0; i < row; i++) {
      randomCell[i] = [];

      for (let j = 0; j < col; j++) {
        randomCell[i][j] = 0;
      }
    }

    return randomCell;
  };

  let temp = genRandomCell();

  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {
      cellGrid[i][j] = temp[i][j];
    }
  }

  renderGrid(cellGrid);
});
