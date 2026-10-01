import { Card } from "./card.js";

export class Deck {
  static NUM_SUITS = 4;
  static NUM_RANKS = 13;
  static MAX_CARDS = 52;

  constructor() {
    this.deck = this.createDeck();
    this.shuffle();
  }

  createDeck() {
    const auxDeck = [];
    for (let suit = 0; suit < Deck.NUM_SUITS; suit++) {
      for (let rank = 1; rank <= Deck.NUM_RANKS; rank++) {
        auxDeck.push(new Card(suit, rank));
      }
    }
    return auxDeck;
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  getDeck() {
    return this.deck;
  }

  drawCard() {
    return this.deck.pop();
  }
}
