var assign = require('../Lib/assignDefined');

var BOOLEAN = "boolean";
var RADIO = "radio"
var Model = function(options) {
  this.data = {};
  this.setAttributes(options);
  this.init();
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  var newOptionsArr = [];
  options.radio_options.forEach(function(opt) {
    newOptionsArr.push({...opt})
  });
  assign(this.data, {
    uuid: options.uuid,
    name: options.name,
    description: options.description,
    price: options.price,
    type: options.type,
    required: options.required,
    radioOptions: newOptionsArr,
  });
};

Model.prototype.init = function() {
  this.isSelected = false;
  this.selectedRadioOptionName = '';
  this.cost = 0;
  if (this.data.type === BOOLEAN) {}

  if (this.data.type === RADIO) {
    this.data.radioOptions.forEach(function(option){
      option.isSelected = false;
    });
  }
}

Model.prototype.select = function(name) {
  if (this.data.type === BOOLEAN) {
    // name arg is not required for bool mod
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.selectedRadioOptionName = this.data.name;
      this.cost = this.data.price;
    } else {
      this.selectedRadioOptionName = '';
      this.cost = 0
    }
  }

  if (this.data.type === RADIO) {
    this.isSelected = true;
    this.selectedRadioOptionName = name;
    this.data.radioOptions.forEach(function(option) {
      if (option.name === name) {
        option.isSelected = true;
        this.cost = option.price
      } else {
        option.isSelected = false;
        this.cost = 0
      }
    });
  }
}

Model.prototype.getAnswer = function() {
  return this.selectedRadioOptionName;
}

Model.prototype.getCost = function() {
  return this.isSelected ? this.cost : 0;
}

Model.prototype.getAnswerJSON = function() {
  if (this.data.type === BOOLEAN) {
    return {
      uuid: this.data.uuid,
      is_selected: this.isSelected
    };
  }
  if (this.data.type === RADIO) {
    return {
      uuid: this.data.uuid,
      selected_radio_option_name: this.selectedRadioOptionName
    }
  }
}

module.exports = Model;

/*
  {
    "uuid": "takeaway",
    "name": "打包 Takeaway",
    "description": "Takeaway",
    "photos": null,
    "price": 0,
    "type": "boolean",
    "required": false,
    "radio_options": []
  },
  {
    "uuid": "type_of_set_meal_drink",
    "name": "饮料 Set Meal Drink",
    "description": "饮料选择 Choose a Set Meal Drink",
    "photos": null,
    "price": 0,
    "type": "radio",
    "required": true,
    "radio_options": [
      {
        "name": "罗汉果 LuoHanGuo(Hot)",
        "price": 0
      },
      {
        "name": "罗汉果 LuoHanGuo(Cold)",
        "price": 0
      },
      {
        "name": "意米水 Barley (Hot)",
        "price": 0
      },
      {
        "name": "意米水 Barley (Cold)",
        "price": 0
      }
    ]
  },
*/
