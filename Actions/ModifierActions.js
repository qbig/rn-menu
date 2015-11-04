var alt = require('../alt')

class ModifierActions {
  constructor() {
    this.generateActions(
      'modifiersUpdated'
    );
  }
}

module.exports = alt.createActions(ModifierActions);
