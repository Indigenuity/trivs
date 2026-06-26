function initTopBar() {
  const powerDot = document.querySelector("[data-power-dot]");
  const powerText = document.querySelector("[data-power-text]");
  const pointsText = document.querySelector("[data-points-text]");
  const powerSeconds = Number(document.body.dataset.powerSeconds || "30");
  const points = document.body.dataset.points || "100 points";

  if (pointsText) {
    pointsText.textContent = points;
  }

  if (!powerDot || !powerText || !Number.isFinite(powerSeconds) || powerSeconds <= 0) {
    return;
  }

  let remaining = powerSeconds;
  powerDot.classList.add("active");
  powerText.textContent = `Power active (${remaining}s)`;

  const timer = setInterval(() => {
    remaining -= 1;

    if (remaining > 0) {
      powerText.textContent = `Power active (${remaining}s)`;
      return;
    }

    clearInterval(timer);
    powerDot.classList.remove("active");
    powerDot.classList.add("expired");
    powerText.textContent = "Power expired";
  }, 1000);
}

function initDelayedText() {
  const delayed = document.querySelector("[data-delayed-text]");
  if (!delayed) return;
  const delayMs = Number(delayed.dataset.delayMs || "10000");
  setTimeout(() => {
    delayed.classList.remove("hidden");
  }, delayMs);
}

function initRevealFlow() {
  const revealBtn = document.querySelector("[data-reveal-btn]");
  if (!revealBtn) return;
  revealBtn.addEventListener("click", () => {
    const answerTarget = revealBtn.dataset.answerTarget;
    const answerEl = answerTarget ? document.querySelector(answerTarget) : null;
    if (answerEl) {
      answerEl.classList.remove("hidden");
    }

    const nextLink = document.querySelector("[data-next-link]");
    if (nextLink) {
      nextLink.classList.add("visible");
    }

    revealBtn.disabled = true;
    revealBtn.textContent = "Answer Revealed";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTopBar();
  initDelayedText();
  initRevealFlow();
});
