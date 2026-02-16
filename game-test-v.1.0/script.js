const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bowX = 100, bowY = canvas.height / 2;
let arrowFlying = false;
let arrowX = bowX + 50;
let arrowY = bowY;
let targetX = canvas.width - 200;
let targetY = canvas.height / 2;
let score = 0;

function drawBow() {
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "brown";
  ctx.arc(bowX, bowY, 50, Math.PI / 2, -Math.PI / 2);
  ctx.stroke();
}

function drawArrow() {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "gray";
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 60, arrowY);
  ctx.stroke();
}

function drawTarget() {
  ctx.beginPath();
  ctx.arc(targetX, targetY, 60, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(targetX, targetY, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(targetX, targetY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
}

function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 50, 50);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBow();
  drawTarget();
  drawArrow();
  drawScore();

  if (arrowFlying) {
    arrowX += 20;
    if (arrowX > targetX - 60 && Math.abs(arrowY - targetY) < 40) {
      score += 10;
      resetArrow();
    } else if (arrowX > canvas.width) {
      resetArrow();
    }
  }

  requestAnimationFrame(update);
}

function resetArrow() {
  arrowFlying = false;
  arrowX = bowX + 50;
  arrowY = bowY;
}

window.addEventListener("click", () => {
  if (!arrowFlying) arrowFlying = true;
});

update();