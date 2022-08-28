class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.attempts = {}; // ex: {'restarant': 2, 'rstanrt': 3, 'restaurnt': 1}
  }
  
  get name() {
    return this.name;
  }

  get score() {
    return this.score;
  }

  get attempts() {
    return this.attempts;
  }

  updateScore(updateCallback) {
    this.score = updateCallback(this.score);
  }

  updateAttempts(updateCallback) {
    this.attempts = updateCallback(this.attempts);
  }
}

export default Player;
