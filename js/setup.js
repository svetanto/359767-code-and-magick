'use strict';

(function () {
  var numberOfWizards = 4;

  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizards = getRandomWizards(numberOfWizards);
  var userDialog = document.querySelector('.setup');
  var userDialogDefaultCoords = {
    x: userDialog.style.top,
    y: userDialog.style.left
  };
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
    window.isEnterPressed(evt, openUserDialog);
  });

  userDialogClose.addEventListener('click', closeUserDialog);

  userDialogClose.addEventListener('keydown', function (evt) {
    window.isEnterPressed(evt, closeUserDialog);
  });

  function openUserDialog() {
    userDialog.style.top = userDialogDefaultCoords.x;
    userDialog.style.left = userDialogDefaultCoords.y;
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onUserDialogEscPress);
  }

  function closeUserDialog() {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
  }

  function onUserDialogEscPress(evt) {
    window.isEscPressed(evt, closeUserDialog);
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
    var colorValue = inputValues[window.generateRandomInteger(0, inputValues.length - 1)];
    changingFeature.style[param] = colorValue;
    inputField.value = colorValue;
  }

  // Перетаскивание предметов
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style = 'outline: 2px dashed red;';
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (!evt.target.hasChildNodes()) {
      evt.target.appendChild(draggedItem.cloneNode(true));
    }
    evt.preventDefault();
    artifactsElement.style = 'outline: none;';
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });


  function getRandomWizards(wizardsQuantity) {

    var shuffledFirstNames = window.shuffleArray(FIRST_NAMES);
    var shuffledSecondNames = window.shuffleArray(SECOND_NAMES);
    var shuffledCoatColors = window.shuffleArray(COAT_COLORS);
    var shuffledEyesColors = window.shuffleArray(EYES_COLORS);

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
})();
