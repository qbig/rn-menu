var assign = require('../Lib/assignDefined');
var Modifier = require('./Modifier');
var Model = function(productInfo, modifierDict) {
  this.data = {};
  this.setAttributes(productInfo);
  init(modifierDict);
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    uuid: options.uuid,
    price: options.price,
    availModifiers: options.avail_modifiers,
  });
};

Model.prototype.init = function(modifierDict) {
  this.quantity = 1;
  var modifiersForItem = availModifiers.map(function(uuid){
    return modifierDict.find(function(elem, index ,array){
      elem.uuid === uuid;
    });
  });
  this.radioMods = modifiersForItem
    .filter(function(elem){
      return elem.type === "radio"
    }).map(function(elem){
      return new Modifier(elem)
    });
  this.boolMods = modifiersForItem
    .filter(function(elem){
      return elem.type === "boolean"
    }).map(function(elem){
      return new Modifier(elem)
    });
};

Model.prototype.Cost = function() {
  return this.quantity * this.getCostForSingleItem();
}

Model.prototype.incre = function() {
  this.quantity += 1;
}

Model.prototype.decre = function() {
  if (this.quantity > 1) {
      this.quantity -= 1;
  }
}

Model.prototype.getCostForSingleItem = function() {
  return this.radioMods.concat(this.boolMods)
    .reduce(function(prev, cur){
      return prev + cur.getCost()
    }, 0) + this.price;
}

Model.prototype.getJSON = function() {
  return {
    product_uuid: this.uuid,
    qty: this.quantity,
    modifiers: this.radioMods.concat(this.boolMods).map(function(elem){
      return elem.getAnswerJSON()
    })
  };
};

Model.prototype.getNextIncompleteModName = function() {
  var incompleteMods = this.radioMods.filter(function(elem){
    return elem.isSelected;
  });
  if (!incompleteMods) {
    return '';
  } else {
    return incompleteMods[0].name;
  }
}

Model.prototype.isCompleted = function() {
  return this.getNextIncompleteModName() === '';
}

module.exports = Model;


/*
Product info
{
        "uuid": 167,
        "upc": "102",
        "name": "鸡丝 Shredded Chicken",
        "receipt_name": "鸡丝 Shredded C",
        "description": "鸡丝 Shredded Chicken",
        "images": [
          {
            "uuid": "adbe6c03-b98a-4735-8a85-e560f517b920",
            "url": "https://sphere-store-images.storage.googleapis.com/adbe6c03-b98a-4735-8a85-e560f517b920",
            "priority": 1
          }
        ],
        "price": 480,
        "avail_modifiers": [
          "type_of_hor_fun_/_noodle",
          "takeaway",
          "add_hor_fun",
          "add_noodles",
          "add_veg",
          "add_meat_($2)",
          "sauce_separate",
          "soup_separate"
        ],
        "unit": "item",
        "unit_multiplier": 0,
        "unit_name": null,
        "priority": 1
      },
*/
