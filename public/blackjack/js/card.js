export class Card {
  constructor(suit, rank) {
    this._suit = suit;
    this._rank = rank;
    this._visible = true;
    this._fileName = this.setFileName();
  }

  setFileName() {
    const suits = ["H", "S", "D", "C"];
    return suits[this._suit] + this._rank;
  }

  getValue() {
    if (this.rank < 10) {
      return this.rank;
    } else return 10;
  }

  get fileName() {
    return this._fileName;
  }

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }

  get visible() {
    return this._visible;
  }

  set visible(visible) {
    this._visible = visible;
  }
}
