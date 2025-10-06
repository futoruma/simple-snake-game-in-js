const TIME_BETWEEN_MOVES = 300;

const ROWS = 12;
const COLS = 12;

const generateGrid = (rows, cols) => {
  const grid = document.getElementById("grid");

  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "sand";
      cell.id = `${r * cols + c}`;

      row.appendChild(cell);
    }

    grid.appendChild(row);
  }
};

generateGrid(ROWS, COLS);

const snakeIdxs = [COLS * (ROWS - 1)];
const startCell = document.getElementById(`${snakeIdxs[0]}`);
startCell.className = "snake";

let appleIdx;

const generateApple = () => {
  while (true) {
    const randomIdx = Math.floor(Math.random() * ROWS * COLS);

    if (!snakeIdxs.includes(randomIdx)) {
      appleIdx = randomIdx;
      const apple = document.getElementById(`${appleIdx}`);
      apple.className = "apple";

      break;
    }
  }
};

generateApple();

let dirRow = 0;
let dirCol = 1;

document.addEventListener("keydown", (event) => {
  switch(event.key) {
    case "ArrowLeft":
      dirRow = 0;
      dirCol = -1;
      break;
    case "ArrowUp":
      dirRow = -1;
      dirCol = 0;
      break;
    case "ArrowRight":
      dirRow = 0;
      dirCol = 1;
      break;
    case "ArrowDown":
      dirRow = 1;
      dirCol = 0;
      break;
  }
});

setInterval(() => {
  const headIdx = snakeIdxs[snakeIdxs.length - 1];
  const curRow = Math.floor(headIdx / COLS);
  const curCol = headIdx % COLS;

  let nextIdx;
  if (dirCol === -1 && curCol === 0) {
    nextIdx = (curRow + 1) * COLS - 1;
  } else if (dirRow === -1 && curRow === 0) {
    nextIdx = (ROWS - 1) * COLS + curCol;
  } else if (dirCol === 1 && curCol === (COLS - 1)) {
    nextIdx = curRow * COLS;
  } else if (dirRow === 1 && curRow === (ROWS - 1)) {
    nextIdx = curCol;
  } else {
    nextIdx = headIdx + (dirRow * COLS) + dirCol;
  }

  if (snakeIdxs.includes(nextIdx)) {
    while (snakeIdxs.length > 0) {
      const curIdx = snakeIdxs.pop();
      const curCell = document.getElementById(`${curIdx}`);
      curCell.className = "sand";
    }

    snakeIdxs.push(headIdx);
  }

  if (headIdx === appleIdx) {
    generateApple();
  } else {
    const tailIdx = snakeIdxs.shift();
    const tailCell = document.getElementById(`${tailIdx}`);
    tailCell.className = "sand";
  }

  snakeIdxs.push(nextIdx);
  const nextCell = document.getElementById(`${nextIdx}`);
  nextCell.className = "snake";

}, TIME_BETWEEN_MOVES);
