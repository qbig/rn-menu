// every thing about Modifiers

// Menu info, categories, items

var alt = require('../alt')
var ModifierActions = require('../Actions/ModifierActions');

class ModifierStore {
  constructor() {
    this.bindListeners({
      handleModifiersUpdate: ModifierActions.modifiersUpdated
    });
    this.modifiers = [];
  }

  handleModifiersUpdate(data) {
    this.modifiers = data;
    console.log(data);
    console.log("ModifierStore : handleModifiersUpdate");
  }
}

module.exports = alt.createStore(ModifierStore, 'ModifierStore');
