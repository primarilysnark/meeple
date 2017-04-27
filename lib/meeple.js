import Token from './token';

export default class Meeple extends Token {
  constructor(name, behavior, options) {
    super(name, options);

    this.behavior = behavior;
  }

  act(stage) {
    this.behavior.bind(this, stage)();
  }
}
