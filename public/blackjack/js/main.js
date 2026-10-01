import { Blackjack } from "./blackjack.js";

let game;

window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("new-game-button")
    .addEventListener("click", startNewGame);
  document
    .getElementById("draw-card-button")
    .addEventListener("click", drawCardPlayer);
  document.getElementById("stand-button").addEventListener("click", stand);
});

function startNewGame() {
  document.getElementById("house-score").textContent = "?";
  document.getElementById("new-game-button").style.display = "none";
  document.getElementById("play-buttons").style.display = "block";
  document.querySelectorAll("#play-buttons").forEach((btn) => {
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
  });
  // Clear previous cards
  document.getElementById("house-pile").innerHTML = "";
  document.getElementById("player-pile").innerHTML = "";

  // Create a new game and deal
  game = new Blackjack();
  game.dealInitialCards();

  // Render cards
  renderPile(game.houseHand, "house-pile");
  renderPile(game.playerHand, "player-pile");
  updatePoints("player");
  // checkBlackJack();
}

function drawCardPlayer() {
  game.dealCardPlayer();
  renderPile(game.playerHand, "player-pile");
  updatePoints("player");
  checkPlayer();
}

// async function checkBlackJack() {
//   sleep(800);
//   let playerFirstScore = game.playerHand.getTotalValue()[1];

//   if (playerFirstScore === 21) stand();

//   let houseFirstScore = game.houseHand.getTotalValue()[1];
//   if (playerFirstScore === 21 && houseFirstScore === 21) {
//     alert("DOUBLE BLACKJACK! TIE!");
//   } else if (playerFirstScore === 21 || houseFirstScore === 21)
//     playerFirstScore > houseFirstScore
//       ? alert("BLACKJACK!!! CONGRATULATIONS YOU WON")
//       : alert("House's Blackjack, you lost!");
// }

async function checkPlayer() {
  await sleep(500);
  const playerScore = getBestValue(game.playerHand); // pass the pile
  if (playerScore > 25) {
    alert("💥 OOPS... BUSTED");
    gameOver();
  }
}

function updatePoints(containerId) {
  if (containerId === "player") {
    let playerScore = game.playerHand.getTotalValue();
    document.getElementById("player-score").textContent =
      playerScore[0] !== playerScore[1] && playerScore[1] <= 25
        ? `${playerScore[0]} | ${playerScore[1]}`
        : `${playerScore[0]}`;
  } else {
    let houseScore = game.houseHand.getTotalValue();
    document.getElementById("house-score").textContent =
      houseScore[0] !== houseScore[1] && houseScore[1] <= 25
        ? `${houseScore[0]} | ${houseScore[1]}`
        : `${houseScore[0]}`;
  }
}

function gameOver() {
  document.getElementById("play-buttons").style.display = "none";
  document.getElementById("new-game-button").style.display = "block";
  document.querySelectorAll("#play-buttons").forEach((btn) => {
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
  });
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function stand() {
  // Get the hidden card element before re-rendering
  const hiddenCard = document.getElementById("dealer-hidden-card");

  // Reveal dealer’s hidden card logically
  game.houseHand.pileOfCards[0].visible = true;

  // 🔄 Add the flip animation
  if (hiddenCard) {
    hiddenCard.classList.add("flipping");
    await new Promise((res) => setTimeout(res, 600)); // wait for animation to finish
  }

  // Re-render the pile with the card now face-up
  renderPile(game.houseHand, "house-pile");
  updatePoints("house");

  document.querySelectorAll("#play-buttons").forEach((btn) => {
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.6";
  });
  game.houseHand.pileOfCards[0].visible = true;
  renderPile(game.houseHand, "house-pile");
  updatePoints("house");

  let houseScore = getBestValue(game.houseHand);
  let playerScore = getBestValue(game.playerHand);

  while (houseScore < 20) {
    await sleep(800);
    game.dealCardHouse();
    renderPile(game.houseHand, "house-pile");
    updatePoints("house");
    houseScore = getBestValue(game.houseHand);
  }

  await sleep(500); // let the final card render before alert

  if (houseScore > 25) {
    alert("Dealer busted! You win!");
  } else if (houseScore > playerScore) {
    alert("Dealer wins!");
  } else if (houseScore < playerScore) {
    alert("You win!");
  } else {
    alert("It's a tie!");
  }
  gameOver();
}
function getBestValue(pile) {
  const [minVal, maxVal] = pile.getTotalValue();
  return maxVal <= 25 ? maxVal : minVal;
}

function renderPile(pile, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  pile.pileOfCards.forEach((card, index) => {
    const img = document.createElement("img");

    if (containerId === "house-pile" && index === 0 && !card.visible) {
      img.src = "images/BalatroDeck/DeckBack.png";
      img.id = "dealer-hidden-card";
    } else {
      img.src = `images/BalatroDeck/${card.fileName}.png`;
    }

    img.classList.add("card");
    container.appendChild(img);

    // ⏳ animate the card after it's in the DOM
    requestAnimationFrame(() => {
      img.classList.add("show");
    });
  });
}
