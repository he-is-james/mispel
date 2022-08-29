class Player {
  constructor(name) {
    this._name = name;
    this._score = 0;
    this._attempts = {}; // ex: {'restarant': 2, 'rstanrt': 3, 'restaurnt': 1}
  }
  
  get name() {
    return this._name;
  }

  get score() {
    return this._score;
  }

  get attempts() {
    return this._attempts;
  }

  set name(name) {
    this._name = name;
  }

  set score(score) {
    this._score = score;
  }

  set attempts(attempts) {
    this._attempts = attempts;
  }
  
  updateScore(updateCallback) {
    this.score = updateCallback(this.score);
  }

  updateAttempts(updateCallback) {
    this.attempts = updateCallback(this.attempts);
  }
}

export default Player;
