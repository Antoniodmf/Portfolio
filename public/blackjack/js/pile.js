export class Pile {
  constructor() {
    this._pileOfCards = [];
  }

  get pileOfCards() {
    return this._pileOfCards;
  }

  addCard(card) {
    this.pileOfCards.push(card);
  }

  getTotalValue() {
    let value = 0;
    let valueAce = 0;
    let ace = false;
    for (let card of this.pileOfCards) {
      const cardValue = card.getValue();
      value += cardValue;
      valueAce += cardValue;
      if (card._rank === 1 && !ace) {
        valueAce = valueAce + 10;
        ace = true;
      }
    }
    return [value, valueAce];
  }
}
