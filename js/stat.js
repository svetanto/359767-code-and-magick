'use strict';

window.renderStatistics = function (ctx, names, times) {
  var shiftFromLeft = 130;
  var shiftFromTop = 10;
  var fullCircle = 2 * Math.PI;

  // Облако
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'blue';

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetY = 10;
  ctx.shadowOffsetX = 10;

  ctx.beginPath();
  ctx.arc(shiftFromLeft + 210, shiftFromTop + 110, 110, 0, fullCircle);
  ctx.arc(shiftFromLeft + 310, shiftFromTop + 130, 110, 0, fullCircle);
  ctx.arc(shiftFromLeft + 110, shiftFromTop + 130, 110, 0, fullCircle);
  ctx.arc(shiftFromLeft + 310, shiftFromTop + 160, 110, 0, fullCircle);
  ctx.arc(shiftFromLeft + 110, shiftFromTop + 160, 110, 0, fullCircle);
  ctx.rect(shiftFromLeft, shiftFromTop + 130, 420, 30);
  ctx.rect(shiftFromLeft + 110, shiftFromTop + 160, 200, 110);
  ctx.closePath();
  ctx.fill();

  // Текст
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', shiftFromLeft + 133, shiftFromTop + 48);
  ctx.fillText('Список результатов (мс):', shiftFromLeft + 110, shiftFromTop + 70);

  // Гистограмма
  var histogramHeight = 140;
  var step = histogramHeight / (getMaxValue(times) - 0);

  var barWidth = 40;
  var indent = 70;
  var initialX = shiftFromLeft + 90;
  var initialY = shiftFromTop + 240;

  for (var i = 0; i < times.length; i++) {
    (names[i] === 'Вы') ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() * 0.8 + 0.2) + ')';
    ctx.fillRect(initialX + indent * i, initialY - times[i] * step, barWidth, times[i] * step);
    ctx.fillStyle = 'black';
    ctx.fillText(times[i].toFixed(0), initialX + indent * i, initialY - times[i] * step - 5);
    ctx.fillText(names[i], initialX + indent * i, initialY + 20);
  }

};

// Нахождение наибольшего элемента массива
function getMaxValue(array) {
  var max = -1;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
