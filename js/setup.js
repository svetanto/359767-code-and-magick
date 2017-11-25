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

FIRST_NAMES = shuffleArray(FIRST_NAMES);
SECOND_NAMES = shuffleArray(SECOND_NAMES);
COAT_COLORS = shuffleArray(COAT_COLORS);
EYES_COLORS = shuffleArray(EYES_COLORS);

var wizards = [];
wizards.length = numberOfWizards;

for (var i = 0; i < wizards.length; i++) {
  wizards[i] =
    {
      name: FIRST_NAMES[i] + ' ' + SECOND_NAMES[i],
      coatColor: COAT_COLORS[i],
      eyesColor: EYES_COLORS[i]
    };
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

function renderWizard(wizard) {
  var randomWizard = similarWizardTemplate.cloneNode(true);
  randomWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  randomWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  randomWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return randomWizard;
}

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
