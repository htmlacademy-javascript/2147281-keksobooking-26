// Сделал через Math.abs, чтобы не плодить проверки на условия. Переделаю, если //надо
// Функция, возвращающая случайное целое число из переданного диапазона включительно
let randomInt;
let randomFloat;

function getRandomInt (min, max) {
  if (min >= max) {
    return 0;
  }
  min = Math.floor(Math.abs(min));
  max = Math.floor(Math.abs(max));
  randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInt;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomFloat (min, max, decimals) {
  if (min >= max) {
    return 0;
  }
  min = Math.abs(min);
  max = Math.abs(max);
  randomFloat = Math.random() * (max - min + 1) + min;
  return randomFloat.toFixed(decimals);
}

getRandomInt(0, 5);
getRandomFloat(0.5, 1.5);
