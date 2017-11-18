'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'white';


  var startAngle = 15*Math.PI/7;
  var endAngle = 13*Math.PI/2;
  var counterClockwise = true;//направление дуги. По умолчанию false

  //ширина и цвет круга
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'blue';

  //начало пути, рисуем круг с нашими параметрами и обводим
  ctx.beginPath();
  ctx.arc(50, 50, 50, startAngle, endAngle, counterClockwise);
  ctx.stroke();
  ctx.closePath();
  ctx.fill = 'white';

};
