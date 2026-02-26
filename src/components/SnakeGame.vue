<script setup>
import { ref, computed, onBeforeUnmount, watch } from "vue";

/**
 * SnakeGame.vue
 * - Eat 50 apples => unlock 10% discount
 * - Slightly slower snake
 * - Countdown 3..1 before starting
 * - Controls panel styled black text (white background)
 * - Score resets on crash
 * - Start + Reset buttons
 * - Victory screen
 * - 24 hour cooldown after victory (stored in localStorage)
 * - Emits: "discount-unlocked" with { discountPercent: 10, apples: 50 }
 * - Prevents page scrolling on arrow keys while playing/countdown
 */

const emit = defineEmits(["discount-unlocked"]);

const GRID_SIZE = 20; // 20x20 cells
const CELL = 18; // px
const TARGET_APPLES = 50;
const DISCOUNT_PERCENT = 10;

// ✅ Slightly slower than before (was 90)
const TICK_MS = 105;

const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const LS_KEY_LAST_WIN = "snake_last_win_at";
const LS_KEY_DISCOUNT = "snake_discount_unlocked";

const canvasRef = ref(null);

// game state
const status = ref("idle"); // idle | countdown | playing | crashed | won
const score = ref(0);
const applesEaten = ref(0);
const countdown = ref(0);

// snake data
let snake = [];
let dir = { x: 1, y: 0 };
let nextDir = { x: 1, y: 0 };
let apple = { x: 10, y: 10 };

let tickTimer = null;
let countdownTimer = null;

function nowMs() {
  return Date.now();
}

const lastWinAt = ref(Number(localStorage.getItem(LS_KEY_LAST_WIN) || 0));

const cooldownRemainingMs = computed(() => {
  if (!lastWinAt.value) return 0;
  const diff = COOLDOWN_MS - (nowMs() - lastWinAt.value);
  return Math.max(0, diff);
});

const canPlay = computed(() => cooldownRemainingMs.value === 0);

const cooldownText = computed(() => {
  const ms = cooldownRemainingMs.value;
  if (ms <= 0) return "";
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} remaining`;
});

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function cellKey(x, y) {
  return `${x},${y}`;
}

function placeApple() {
  const occupied = new Set(snake.map((s) => cellKey(s.x, s.y)));

  for (let i = 0; i < 500; i++) {
    const x = randInt(GRID_SIZE);
    const y = randInt(GRID_SIZE);
    if (!occupied.has(cellKey(x, y))) {
      apple = { x, y };
      return;
    }
  }

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!occupied.has(cellKey(x, y))) {
        apple = { x, y };
        return;
      }
    }
  }
}

function resetState() {
  score.value = 0;
  applesEaten.value = 0;
  status.value = "idle";
  countdown.value = 0;

  snake = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  placeApple();
  draw();
}

function stopLoop() {
  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
}

function stopCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  countdown.value = 0;
}

function crash() {
  stopLoop();
  stopCountdown();
  status.value = "crashed";
  score.value = 0;
  applesEaten.value = 0;
  draw();
}

function win() {
  stopLoop();
  stopCountdown();
  status.value = "won";
  lastWinAt.value = nowMs();
  localStorage.setItem(LS_KEY_LAST_WIN, String(lastWinAt.value));
  localStorage.setItem(LS_KEY_DISCOUNT, "true");

  emit("discount-unlocked", {
    discountPercent: DISCOUNT_PERCENT,
    apples: TARGET_APPLES,
  });

  draw();
}

function beginGame() {
  status.value = "playing";

  snake = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score.value = 0;
  applesEaten.value = 0;
  placeApple();
  draw();

  stopLoop();
  tickTimer = setInterval(tick, TICK_MS);
}

function start() {
  if (!canPlay.value) return;
  if (status.value === "won") return;
  if (status.value === "playing") return;
  if (status.value === "countdown") return;

  // ✅ 3..2..1 countdown before starting
  stopCountdown();
  stopLoop();

  status.value = "countdown";
  countdown.value = 3;
  draw();

  countdownTimer = setInterval(() => {
    countdown.value -= 1;

    if (countdown.value <= 0) {
      stopCountdown();
      beginGame();
      return;
    }

    draw();
  }, 1000);
}

function reset() {
  stopLoop();
  stopCountdown();
  resetState();
}

function setDirection(x, y) {
  if (x === -dir.x && y === -dir.y) return;
  nextDir = { x, y };
}

function tick() {
  if (status.value !== "playing") return;

  dir = nextDir;

  const head = snake[0];
  const newHead = { x: head.x + dir.x, y: head.y + dir.y };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y >= GRID_SIZE
  ) {
    crash();
    return;
  }

  const bodySet = new Set(snake.map((s) => cellKey(s.x, s.y)));
  if (bodySet.has(cellKey(newHead.x, newHead.y))) {
    crash();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === apple.x && newHead.y === apple.y) {
    applesEaten.value += 1;
    score.value += 1;

    if (applesEaten.value >= TARGET_APPLES) {
      win();
      return;
    }

    placeApple();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // grid
  ctx.globalAlpha = 1;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
    }
  }

  // apple
  ctx.fillRect(apple.x * CELL + 3, apple.y * CELL + 3, CELL - 6, CELL - 6);

  // snake
  snake.forEach((s, i) => {
    const pad = i === 0 ? 2 : 4;
    ctx.fillRect(
      s.x * CELL + pad,
      s.y * CELL + pad,
      CELL - pad * 2,
      CELL - pad * 2
    );
  });

  if (status.value === "countdown") {
    overlay(ctx, String(countdown.value), "Get ready...");
  }
  if (status.value === "crashed") {
    overlay(ctx, "Crashed!", "Your score reset. Press Start to try again.");
  }
  if (status.value === "won") {
    overlay(
      ctx,
      "Victory!",
      `You unlocked ${DISCOUNT_PERCENT}% off. Come back in 24 hours.`
    );
  }
  if (status.value === "idle" && !canPlay.value) {
    overlay(ctx, "Locked", `Come back later: ${cooldownText.value}`);
  }
}

function overlay(ctx, title, subtitle) {
  const w = GRID_SIZE * CELL;
  const h = GRID_SIZE * CELL;

  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  ctx.font = "bold 38px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, w / 2, h / 2 - 12);

  ctx.font = "14px sans-serif";
  ctx.fillText(subtitle, w / 2, h / 2 + 22);
  ctx.restore();
}

/* ✅ keyboard controls: stop page scrolling while playing/countdown */
function onKeydown(e) {
  const isArrow =
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight";

  if (!isArrow) return;

  if (status.value === "playing" || status.value === "countdown") {
    e.preventDefault();
  }

  if (e.key === "ArrowUp") setDirection(0, -1);
  if (e.key === "ArrowDown") setDirection(0, 1);
  if (e.key === "ArrowLeft") setDirection(-1, 0);
  if (e.key === "ArrowRight") setDirection(1, 0);
}

window.addEventListener("keydown", onKeydown, { passive: false });

// keep cooldown timer ticking for the UI
let cooldownUiTimer = setInterval(() => {
  if (!canPlay.value) draw();
}, 1000);

onBeforeUnmount(() => {
  stopLoop();
  stopCountdown();
  window.removeEventListener("keydown", onKeydown);
  clearInterval(cooldownUiTimer);
});

watch(
  () => status.value,
  () => draw()
);

// init
resetState();
</script>

<template>
  <section class="snake-wrap">
    <header class="top">
      <div class="title">
        <h2>Snake Discount Challenge</h2>
        <p>
          Eat <strong>{{ TARGET_APPLES }} apples</strong> to unlock
          <strong>{{ DISCOUNT_PERCENT }}% off</strong>.
        </p>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="label">Apples</span>
          <span class="value">{{ applesEaten }} / {{ TARGET_APPLES }}</span>
        </div>
        <div class="stat">
          <span class="label">Score</span>
          <span class="value">{{ score }}</span>
        </div>
        <div class="stat" v-if="!canPlay">
          <span class="label">Cooldown</span>
          <span class="value">{{ cooldownText }}</span>
        </div>
      </div>
    </header>

    <div class="game">
      <canvas
        ref="canvasRef"
        class="board"
        :width="GRID_SIZE * CELL"
        :height="GRID_SIZE * CELL"
        aria-label="Snake game board"
      />

      <div class="controls">
        <button
          class="btn"
          @click="start"
          :disabled="!canPlay || status === 'playing' || status === 'countdown'"
        >
          Start
        </button>
        <button class="btn" @click="reset">Reset</button>

        <div class="hint">
          Use <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> to move.
        </div>

        <div class="note" v-if="status === 'won'">
          Discount unlocked.
          <code>snake_discount_unlocked</code>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.snake-wrap {
  padding: 24px;
  display: grid;
  gap: 16px;
}

/* top bar */
.top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.title h2 {
  margin: 0;
  font-size: 1.6rem;
}

.title p {
  margin: 6px 0 0 0;
  color: #555;
}

.stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 120px;
  background: #fff;
}

.label {
  display: block;
  font-size: 0.75rem;
  color: #666;
}

.value {
  display: block;
  font-weight: 700;
  font-size: 1.05rem;
  color: #111;
}

/* layout */
.game {
  display: grid;
  grid-template-columns: auto 260px;
  gap: 16px;
  align-items: start;
}

.board {
  border: 2px solid #111;
  border-radius: 14px;
  width: fit-content;
  height: fit-content;
  background: #fff;
}

/* ✅ Controls panel: white background, black text */
.controls {
  display: grid;
  gap: 10px;
  align-content: start;
  background: #c8c8c8;
  border: none;
  border-radius: 14px;
  padding: 12px;
  color: #111;
}

.btn {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  font-size: 0.9rem;
  color: #111;
}

kbd {
  border: 1px solid #111;
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 1px 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", monospace;
  background: #fff;
  color: #111;
}

.note {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #111;
}

code {
  background: #f3f3f3;
  padding: 2px 6px;
  border-radius: 6px;
  color: #111;
}
</style>