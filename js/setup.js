'use strict';

var numberOfWizards = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = getRandomWizards(numberOfWizards);
var userDialog = document.querySelector('.setup');
var similarElement = userDialog.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

drawRandomWizards(similarListElement);

similarElement.classList.remove('hidden');

// Открытие-закрытие сетапа кликом и с клавиатуры ------------------------------
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');

userDialogOpen.addEventListener('click', openUserDialog);

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

userDialogClose.addEventListener('click', closeUserDialog);

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

function openUserDialog() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
}

function closeUserDialog() {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
}

function onUserDialogEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserDialog();
  }
}

// Работа с формой -------------------------------------------------------------

// Ввод имени волшебника
var userNameInput = userDialog.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  evt.preventDefault();
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
// Костыль для Edge
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Изменение цвета мантии персонажа по нажатию
var wizardCoat = userDialog.querySelector('.wizard-coat');
var inputWizardCoatColor = userDialog.querySelector('input[name="coat-color"]');

wizardCoat.addEventListener('click', function (e) {
  e.preventDefault();
  changeWizardFeatureColor(COAT_COLORS, wizardCoat, 'fill', inputWizardCoatColor);
});

// Изменение цвета глаз персонажа по нажатию
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var inputWizardEyesColor = userDialog.querySelector('input[name="eyes-color"]');

wizardEyes.addEventListener('click', function (e) {
  e.preventDefault();
  changeWizardFeatureColor(EYES_COLORS, wizardEyes, 'fill', inputWizardEyesColor);
});

// Изменение цвета фаерболов по нажатию
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var inputWizardFireballColor = userDialog.querySelector('input[name="fireball-color"]');

wizardFireball.addEventListener('click', function (e) {
  e.preventDefault();
  changeWizardFeatureColor(FIREBALL_COLORS, wizardFireball, 'background', inputWizardFireballColor);
});

function changeWizardFeatureColor(inputValues, changingFeature, param, inputField) {
  var colorValue = inputValues[generateRandomInteger(0, inputValues.length - 1)];
  changingFeature.style[param] = colorValue;
  inputField.value = colorValue;
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

function drawRandomWizards(similarList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarList.appendChild(fragment);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

function generateRandomInteger(fromNumber, toNumber) {
  return Math.round(Math.random() * (toNumber - fromNumber) + fromNumber);
}
