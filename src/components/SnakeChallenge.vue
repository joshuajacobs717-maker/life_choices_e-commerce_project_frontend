<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

const BOARD_SIZE = 20;
const GAME_TICK_MS = 110;
const TARGET_APPLES = 50;

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_TO_DIRECTION = {
  ArrowUp: DIRECTIONS.up,
  ArrowDown: DIRECTIONS.down,
  ArrowLeft: DIRECTIONS.left,
  ArrowRight: DIRECTIONS.right,
  w: DIRECTIONS.up,
  s: DIRECTIONS.down,
  a: DIRECTIONS.left,
  d: DIRECTIONS.right,
};

const store = useStore();

const snake = ref([]);
const apple = ref({ x: 0, y: 0 });
const direction = ref(DIRECTIONS.right);
const pendingDirection = ref(DIRECTIONS.right);
const runApples = ref(0);
const isGameOver = ref(false);
const isRunning = ref(false);

let gameIntervalId = null;

const totalApples = computed(() => store.getters.snakeApples);
const discountUnlocked = computed(() => store.getters.snakeDiscountUnlocked);
const applesRemaining = computed(() =>
  Math.max(TARGET_APPLES - totalApples.value, 0),
);
const rewardProgress = computed(() =>
  Math.min((totalApples.value / TARGET_APPLES) * 100, 100),
);

const snakeMap = computed(() => {
  const map = new Map();
  snake.value.forEach((segment, index) => {
    map.set(`${segment.x},${segment.y}`, index === 0 ? "head" : "body");
  });
  return map;
});

function randomPoint() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
}

function isOpposite(nextDirection, currentDirection) {
  return (
    nextDirection.x === -currentDirection.x &&
    nextDirection.y === -currentDirection.y
  );
}

function placeApple() {
  let nextApple = randomPoint();
  while (
    snake.value.some(
      (segment) => segment.x === nextApple.x && segment.y === nextApple.y,
    )
  ) {
    nextApple = randomPoint();
  }
  apple.value = nextApple;
}

function resetGame() {
  snake.value = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ];
  direction.value = DIRECTIONS.right;
  pendingDirection.value = DIRECTIONS.right;
  runApples.value = 0;
  isGameOver.value = false;
  placeApple();
}

function endGame() {
  stopGame();
  runApples.value = 0;
  store.commit("RESET_SNAKE_PROGRESS");
  isGameOver.value = true;
}

function gameTick() {
  direction.value = pendingDirection.value;

  const nextHead = {
    x: snake.value[0].x + direction.value.x,
    y: snake.value[0].y + direction.value.y,
  };

  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= BOARD_SIZE ||
    nextHead.y < 0 ||
    nextHead.y >= BOARD_SIZE;

  const ateApple = nextHead.x === apple.value.x && nextHead.y === apple.value.y;
  const collisionBody = ateApple ? snake.value : snake.value.slice(0, -1);

  const hitSelf = collisionBody.some(
    (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
  );

  if (hitWall || hitSelf) {
    endGame();
    return;
  }

  snake.value = [nextHead, ...snake.value];

  if (ateApple) {
    runApples.value += 1;
    store.commit("ADD_SNAKE_APPLE");
    placeApple();
    return;
  }

  snake.value.pop();
}

function startGame() {
  if (isRunning.value) return;
  if (isGameOver.value) resetGame();

  gameIntervalId = setInterval(gameTick, GAME_TICK_MS);
  isRunning.value = true;
}

function stopGame() {
  if (gameIntervalId) {
    clearInterval(gameIntervalId);
    gameIntervalId = null;
  }
  isRunning.value = false;
}

function restartGame() {
  stopGame();
  resetGame();
  startGame();
}

function queueDirection(nextDirection) {
  if (isOpposite(nextDirection, direction.value)) return;
  pendingDirection.value = nextDirection;
}

function handleDirectionInput(directionKey) {
  queueDirection(DIRECTIONS[directionKey]);
  if (!isRunning.value && !isGameOver.value) startGame();
}

function handleKeydown(event) {
  const sourceTag = event.target?.tagName;
  if (sourceTag === "INPUT" || sourceTag === "TEXTAREA") return;

  if (event.code === "Space") {
    event.preventDefault();
    if (isRunning.value) {
      stopGame();
    } else if (isGameOver.value) {
      restartGame();
    } else {
      startGame();
    }
    return;
  }

  const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const nextDirection = KEY_TO_DIRECTION[normalizedKey];

  if (!nextDirection) return;

  event.preventDefault();
  queueDirection(nextDirection);

  if (!isRunning.value && !isGameOver.value) startGame();
}

function cellClass(index) {
  const x = index % BOARD_SIZE;
  const y = Math.floor(index / BOARD_SIZE);

  if (apple.value.x === x && apple.value.y === y) return "cell apple";

  const segmentType = snakeMap.value.get(`${x},${y}`);
  if (segmentType === "head") return "cell snake-head";
  if (segmentType === "body") return "cell snake-body";

  return "cell";
}

onMounted(() => {
  resetGame();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  stopGame();
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <section class="snake-challenge">
    <div class="header">
      <h2>Snake Discount Challenge</h2>
      <p>Eat 50 apples to unlock 5% off any product.</p>
    </div>

    <div class="challenge-body">
      <div class="board-panel">
        <div class="board" role="application" aria-label="Snake game board">
          <div
            v-for="index in BOARD_SIZE * BOARD_SIZE"
            :key="index"
            :class="cellClass(index - 1)"
          ></div>
        </div>

        <div class="run-stats">
          <p><strong>Run apples:</strong> {{ runApples }}</p>
          <p v-if="isRunning">Running</p>
          <p v-else-if="isGameOver" class="game-over">
            Game over. Press restart to play again.
          </p>
          <p v-else>Press start, then use arrow keys or WASD.</p>
        </div>

        <div class="actions">
          <button class="btn primary" @click="startGame" :disabled="isRunning">
            Start
          </button>
          <button class="btn" @click="stopGame" :disabled="!isRunning">
            Pause
          </button>
          <button class="btn" @click="restartGame">Restart</button>
        </div>
      </div>

      <aside class="reward-panel">
        <h3>Reward Progress</h3>
        <p><strong>Total apples:</strong> {{ totalApples }}</p>

        <div class="progress-track" role="presentation">
          <div class="progress-fill" :style="{ width: `${rewardProgress}%` }"></div>
        </div>

        <p v-if="discountUnlocked" class="reward-ready">
          5% OFF unlocked. Discount is active for any product.
        </p>
        <p v-else>
          Eat {{ applesRemaining }} more apples to unlock your 5% discount.
        </p>

        <div class="controls">
          <button class="control-btn" @click="handleDirectionInput('up')">
            Up
          </button>
          <div class="control-row">
            <button class="control-btn" @click="handleDirectionInput('left')">
              Left
            </button>
            <button class="control-btn" @click="handleDirectionInput('down')">
              Down
            </button>
            <button class="control-btn" @click="handleDirectionInput('right')">
              Right
            </button>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.snake-challenge {
  padding: 2.5rem 1.25rem;
  background: #f7f7f7;
}

.header {
  max-width: 940px;
  margin: 0 auto 1.25rem;
}

.header h2 {
  margin: 0;
  font-size: 1.9rem;
  color: #101010;
}

.header p {
  margin: 0.5rem 0 0;
  color: #4e4e4e;
}

.challenge-body {
  max-width: 940px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 1rem;
}

.board-panel,
.reward-panel {
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 1rem;
}

.board {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  aspect-ratio: 1 / 1;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  overflow: hidden;
  background: #f2f2f2;
}

.cell {
  background: #f2f2f2;
  border: 1px solid #e8e8e8;
}

.cell.snake-head,
.snake-head {
  background: #168c3e;
}

.cell.snake-body,
.snake-body {
  background: #1fb14c;
}

.cell.apple,
.apple {
  background: #d92828;
  border-radius: 4px;
}

.run-stats {
  margin-top: 0.8rem;
  color: #282828;
}

.run-stats p {
  margin: 0.25rem 0;
}

.game-over {
  color: #b72525;
}

.actions {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid #1e1e1e;
  background: #ffffff;
  color: #1e1e1e;
  border-radius: 8px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.primary {
  background: #1e1e1e;
  color: #ffffff;
}

.reward-panel h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #141414;
}

.progress-track {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #ececec;
  overflow: hidden;
  margin: 0.75rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1f8e44, #2ab657);
  transition: width 0.2s ease;
}

.reward-ready {
  color: #176f35;
  font-weight: 700;
}

.controls {
  margin-top: 1rem;
}

.control-row { 
  display: flex;
  gap: 0.35rem;
  margin-top: 0.35rem;
}

.control-btn {
  border: 1px solid #111111;
  background: #ffffff;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

@media (max-width: 860px) {
  .challenge-body {
    grid-template-columns: 1fr;
  }

  .board {
    max-width: 100%;
  }
}
</style>
