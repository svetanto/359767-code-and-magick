'use strict';

var numberOfWizards = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

function shuffleArray(array) {
  for (var i = array.length - 1; i; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

function getRandomWizards(wizardsQuantity) {

  var shuffledFirstNames = shuffleArray(FIRST_NAMES);
  var shuffledSecondNames = shuffleArray(SECOND_NAMES);
  var shuffledCoatColors = shuffleArray(COAT_COLORS);
  var shuffledEyesColors = shuffleArray(EYES_COLORS);

  var arrWizards = [];

  for (var i = 0; i < wizardsQuantity; i++) {
    arrWizards.push(
        {
          name: shuffledFirstNames[i] + ' ' + shuffledSecondNames[i],
          coatColor: shuffledCoatColors[i],
          eyesColor: shuffledEyesColors[i]
        });
  }
  return arrWizards;
}

function renderWizard(wizard) {
  var randomWizard = similarWizardTemplate.cloneNode(true);
  randomWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  randomWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  randomWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return randomWizard;
}

function drawRandomWizards(similarListElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

var wizards = getRandomWizards(numberOfWizards);
var userDialog = document.querySelector('.setup');
var similarElement = userDialog.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

drawRandomWizards(similarListElement);

userDialog.classList.remove('hidden');
similarElement.classList.remove('hidden');
