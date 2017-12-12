'use strict';

(function () {

  window.colorizeElement = function (changingElement, colorOptions, changeColorFunction, inputField) {
    var chosenColor = colorOptions[window.generateRandomInteger(0, colorOptions.length - 1)];
    changeColorFunction(changingElement, chosenColor);
    inputField.value = chosenColor;
  };

})();
