var assign = require('../Lib/assignDefined');
var deepAssign = require('deep-assign');
var Modifier = require('./Modifier');
var Model = function(productInfo, modifierDict) {
  this.data = {};
  this.setAttributes(productInfo);
  this.init(modifierDict);
};

// static --> array of OrderItem s
Model.makeItemsFromJson = function(items, GroupsItemsStore, modifierDict) {
  return items
  .filter(function(item){
      return item['status'] != "voided"
  })
  .map(function(item){
    var uuid = item["product_uuid"];
    var quantity = item["qty"];
    var comment = item["notes"];
    var modifiers = item["modifiers"]; //this.currentItem.boolMods[index].select(name);
    var itemObj = new Model(GroupsItemsStore.getProd(uuid), modifierDict);
    itemObj.quantity = quantity;
    itemObj.comment = comment;

    modifiers.filter(function(mod){
      return mod["selected_radio_option_name"]
    }).forEach(function(mod, index){
        var modUuid = mod['uuid'];
        var foundRadioMod = itemObj.radioMods.find(function(radioMod, indexFound){
          return radioMod.data.uuid == modUuid && indexFound >= index
        });
        if (foundRadioMod == undefined) {
          throw new Error("cannot find radio modifier with uuid:" + modUuid);
        }
        foundRadioMod.select(mod["selected_radio_option_name"]);
    });

    modifiers.filter(function(mod){
      return mod["is_selected"]
    }).forEach(function(mod, index){
      var modUuid = mod['uuid'];
      var foundBoolMod = itemObj.boolMods.find(function(boolMod, indexFound){
        return boolMod.data.uuid == modUuid && indexFound >= index
      });
      if (foundBoolMod == undefined) {
        throw new Error("cannot find bool modifier with uuid:" + modUuid);
      }
      foundBoolMod.select();
    });

    return itemObj;
  });
}

Model.makeUnsentItemsFromCache = function(itemsJson, GroupsItemsStore, modifierDict) {
  return itemsJson.map(function(item){
    var uuid = item.data.uuid;
    var {quantity, comment} = item;
    var itemObj = new Model(GroupsItemsStore.getProd(uuid), modifierDict);
    itemObj.quantity = quantity;
    itemObj.comment = comment;
    item.radioMods.forEach(function(ansRadioMod, index){
      if(ansRadioMod.isSelected) {
        var foundRadioMod = itemObj.radioMods.find(function(radioMod, indexFound){
          return radioMod.data.uuid == ansRadioMod.data.uuid && indexFound >= index
        });
        if (foundRadioMod == undefined) {
          throw new Error("cannot find radio modifier with uuid:" + ansRadioMod.data.uuid);
        }
        foundRadioMod.select(ansRadioMod.selectedRadioOptionName);
      }
    })

    item.boolMods.forEach(function(ansBoolMod, index){
      if (ansBoolMod.isSelected) {
        var foundBoolMod = itemObj.boolMods.find(function(boolMod, indexFound){
          return boolMod.data.uuid == ansBoolMod.data.uuid && indexFound >= index
        });
        if (foundBoolMod == undefined) {
          throw new Error("cannot find bool modifier with uuid:" + ansBoolMod.data.uuid);
        }
        foundBoolMod.select();
      }
    })
    return itemObj;
  });
}

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    name: options.name,
    uuid: options.uuid,
    price: options.price,
    availModifiers: options.avail_modifiers,
    images: options.images
  });
};

Model.prototype.getClone = function() {
  var result = Object.create(this);
  return deepAssign(result, this);
}

Model.prototype.init = function(modifierDict) {
  this.quantity = 1;
  this.comment = "";
  console.log(this.data.availModifiers)
  var modifiersForItem = this.data.availModifiers.map(function(uuid){
    return modifierDict.find(function(elem, index ,array){
      return elem.uuid === uuid;
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

Model.prototype.getModsStr = function() {
  return this.radioMods.concat(this.boolMods).reduce(function(prev, cur){
    if (prev ==="") {
      return cur.selectedRadioOptionName
    } else {
      if (cur.selectedRadioOptionName !== "") {
        return prev + ",\n" + cur.selectedRadioOptionName
      } else {
        return prev
      }
    }
  },"");
}

Model.prototype.getModsStrWithComment = function () {
  var modsStr = this.getModsStr();
  console.log(modsStr)
  console.log("comment:" + this.comment)
  if (modsStr === "" ){
    return this.comment
  } else {
    if (! this.comment) {
      return modsStr
    } else {
      return modsStr + ",\n" + this.comment
    }
  }
}

Model.prototype.getCost = function() {
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
    }, 0) + this.data.price;
}

Model.prototype.getJSON = function() {
  return {
    product_uuid: this.data.uuid,
    qty: this.quantity,
    modifiers: this.radioMods.concat(this.boolMods).map(function(elem){
      return elem.getAnswerJSON()
    }),
    notes: this.comment
  };
};

Model.prototype.getNextIncompleteModName = function() {
  var incompleteMods = this.radioMods.filter(function(elem){
    return !elem.isSelected;
  });
  if (incompleteMods.length == 0) {
    return '';
  } else {
    return incompleteMods[0].data.name;
  }
}

Model.prototype.isCompleted = function() {
  return this.getNextIncompleteModName() === '';
}

module.exports = Model;


/*
JSON for existing order
{
  "id": 140,
  "product_uuid": 167,
  "qty": 1,
  "subtotal": 980,
  "item_subtotal": 980,
  "item_adjustment": 0,
  "adjustment": 0,
  "item_adj_amt": 0,
  "item_adj_type": "value",
  "item_adj_entry_type": "discount",
  "modifiers": [
    {
      "uuid": "type_of_hor_fun_/_noodle",
      "selected_radio_option_name": "河粉汤 Hor Fun Soup",
      "price": 0
    },
    {
      "uuid": "takeaway",
      "is_selected": true,
      "price": 0
    },
    {
      "uuid": "add_hor_fun",
      "is_selected": true,
      "price": 100
    },
    {
      "uuid": "add_noodles",
      "is_selected": true,
      "price": 100
    },
    {
      "uuid": "add_veg",
      "is_selected": true,
      "price": 100
    },
    {
      "uuid": "add_meat_($2)",
      "is_selected": true,
      "price": 200
    },
    {
      "uuid": "soup_separate",
      "is_selected": true,
      "price": 0
    },
    {
      "uuid": "sauce_separate",
      "is_selected": true,
      "price": 0
    }
  ],
  "notes": null,
  "status": "placed",
  "updatedAt": "2015-11-12T10:44:28.000Z",
  "createdAt": "2015-11-12T10:44:28.000Z",
  "unit_gram_amount": 0,
  "staff_id": 29,
  "deletedAt": null,
  "adjustments": []
}

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
