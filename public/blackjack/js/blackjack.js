import { Deck } from "./deck.js";
import { Pile } from "./pile.js";

export class Blackjack {
  constructor() {
    this.deck = new Deck();
    this.playerHand = new Pile();
    this.houseHand = new Pile();
  }

  dealInitialCards() {
    let aux = this.deck.drawCard();
    aux.visible = false;
    this.houseHand.addCard(aux);

    this.dealCardPlayer();

    this.dealCardHouse();

    this.dealCardPlayer();
  }

  dealCardPlayer() {
    let card = this.deck.drawCard();
    card.visible = true;
    this.playerHand.addCard(card);
  }

  dealCardHouse() {
    let card = this.deck.drawCard();
    card.visible = true;
    this.houseHand.addCard(card);
  }
}
